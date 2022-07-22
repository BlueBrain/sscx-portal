import sys
import json
import re
from os import listdir, makedirs
from os.path import isdir, join, abspath
from xml.dom import minidom
import coloredlogs, logging


log = logging.getLogger(__name__)
coloredlogs.install(level='DEBUG')


def listdirsonly(path):
  """
  List directories for a given path
  """
  return [dir for dir in listdir(path) if isdir(join(path, dir))]

def find_ancestor(neurite_type, morphology_name, lineage, lineage_type):
  if morphology_name not in lineage:
      # log.warn(f'Can\'t find {morphology_name} in the {lineage_type} lineage')
      return morphology_name
  else:
    return lineage[morphology_name][neurite_type]

def find_exp_morphologies(name, graft_lineage, scale_lineage, clone_lineage):
  scale_axon = find_ancestor('axon', name, clone_lineage, lineage_type='clone')
  scale_dendrite = find_ancestor('dendrite', name, clone_lineage, lineage_type='clone')

  graft_axon = find_ancestor('axon', scale_axon, scale_lineage, lineage_type='scale')
  graft_dendrite = find_ancestor('dendrite', scale_dendrite, scale_lineage, lineage_type='scale')

  exp_axon = find_ancestor('axon', graft_axon, graft_lineage, lineage_type='graft')
  exp_dendrite = find_ancestor('dendrite', graft_dendrite, graft_lineage, lineage_type='graft')

  return [exp_axon, exp_dendrite] if exp_axon != exp_dendrite else [exp_axon]


def main():
  """
  Create interlinks between exp and model morphologies

  Script arguments:
  * memodel base path
  * morphology release path
  * output path

  Expected memodel directory structure:
  <mtype>/<etype>/<region>/<memodel_name>
  e.g.: L1_DAC/bNAC/S1DZ/L1_DAC_bNAC_1

  Output directory structure:
  ./exp-morph-models/<morphology>.json
  ./memodel-factsheets/<mtype>/<etype>/<region>/<memodel_name>/exp-morphologies.json

  """
  memodel_path = abspath(sys.argv[1])
  morphology_release_path = abspath(sys.argv[2])
  output_path = abspath(sys.argv[3])

  log.info(f'memodel path: {memodel_path}')
  log.info(f'output path:  {output_path}')

  if not isdir(memodel_path):
    log.critical(f'memodel base path doesn\'t seem to be directory: {memodel_path}')
    sys.exit(1)

  if not isdir(output_path):
    try:
      makedirs(output_path)
    except Exception:
      log.critical(f'Can\'t create an output directory ({output_path})')
      sys.exit(1)
  elif len(listdir(output_path)):
    log.critical(f'Output directory isn\'t clean ({output_path})')
    sys.exit(1)

  log.info('Reading memodels')
  memodels = []

  mtypes = listdirsonly(memodel_path)
  if not len(mtypes):
    log.critical('Looks like there are no mtype directories, check provided memodel base path')
    sys.exit(1)
  for mtype in mtypes:
    etypes = listdir(join(memodel_path, mtype))
    if not len(etypes):
      log.warn(f'No etype directories found in ./{mtype}')
    for etype in etypes:
      regions = listdir(join(memodel_path, mtype, etype))
      if not len(regions):
        log.warn(f'No region directories found in ./{mtype}/{etype}')
      for region in regions:
        memodel_names = listdir(join(memodel_path, mtype, etype, region))
        if not len(memodel_names):
          log.warn(f'No memodel directories found in ./{mtype}/{etype}/{region}')
        for memodel_name in memodel_names:
          with open(join(memodel_path, mtype, etype, region, memodel_name, 'cell_info.json')) as cell_info_fp:
            cell_info = json.load(cell_info_fp)
          memodels.append((mtype, etype, region, memodel_name, cell_info['morphology']))

  log.info(f'Found {len(memodels)} memodel directories')

  log.info('About to read lineage files')

  log.info('- graft axons lineage')
  with open(join(morphology_release_path, '07_GraftAxons', 'lineage.json')) as graft_axon_lineage_fp:
    graft_axon_lineage = json.load(graft_axon_lineage_fp)

  log.info('- scale morphology lineage')
  with open(join(morphology_release_path, '08_ScaleMorphologies', 'lineage.json')) as scale_lineage_fp:
    scale_lineage = json.load(scale_lineage_fp)

  log.info('- clone morphology lineage')
  with open(join(morphology_release_path, '09_CloneMorphologies', 'lineage.json')) as clone_lineage_fp:
    clone_lineage = json.load(clone_lineage_fp)

  log.info('- neuronDB.xml')
  neuron_db = minidom.parse(join(morphology_release_path, 'neuronDB.xml'))
  exp_morph_mtype = {}
  for morph in neuron_db.getElementsByTagName('morphology'):
    name_elements = morph.getElementsByTagName('name')
    if len(name_elements) == 0:
      continue

    name = name_elements[0].firstChild.data
    mtype = morph.getElementsByTagName('mtype')[0].firstChild.data
    exp_morph_mtype[name] = mtype

  exp_morph_models = {}

  for memodel in memodels:
    mtype, etype, region, memodel_name, morphology = memodel
    log.info(f'Processing exp morphs for {region:<6} {memodel_name:<24}: {morphology}')
    exp_morphologies = find_exp_morphologies(morphology, graft_axon_lineage, scale_lineage, clone_lineage)

    exp_morph_collection = [
      {
        'morphology': exp_morph,
        'mtype': exp_morph_mtype[exp_morph], # ! some cells were re-classified, mtype might be outdated here
        'layer': 'L23' if (re.match('(L\d+)_.*', exp_morph_mtype[exp_morph])[1] in ['L23', 'L2', 'L3']) else re.match('(L\d+)_.*', exp_morph_mtype[exp_morph])[1],
        'source_neurite_type': 'axon+dendrite' if len(exp_morphologies) == 1 else ['axon', 'dendrite'][idx]
      }
      for idx, exp_morph
      in enumerate(exp_morphologies)
    ]

    # add to the reverse mapping (exp morph -> models)
    for exp_morph_dict in exp_morph_collection:
      exp_morph = exp_morph_dict['morphology']
      exp_morph_model_dict = {
        'source_neurite_type': exp_morph_dict['source_neurite_type'],
        'mtype': mtype,
        'etype': etype,
        'region': region,
        'memodel_name': memodel_name,
        'memodel_morphology': morphology
      }
      if exp_morph not in exp_morph_models:
        exp_morph_models[exp_morph] = [exp_morph_model_dict]
      else:
        exp_morph_models[exp_morph].append(exp_morph_model_dict)

    output_json_path = join(output_path, 'memodel-factsheets', mtype, etype, region, memodel_name)

    if not isdir(output_json_path):
      try:
        makedirs(output_json_path)
      except Exception:
        log.critical(f'Can\'t create an output directory ({output_json_path})')
        sys.exit(1)

    with open(join(output_json_path, 'exp-morphologies.json'), 'w') as exp_morphs_json_fp:
      json.dump(exp_morph_collection, exp_morphs_json_fp)

  exp_morph_models_path = join(output_path, 'exp-morph-models')
  if not isdir(exp_morph_models_path):
      try:
        makedirs(exp_morph_models_path)
      except Exception:
        log.critical(f'Can\'t create an output directory ({exp_morph_models_path})')
        sys.exit(1)

  for exp_morph, model_collection in exp_morph_models.items():
    log.info(f'Processing models for {exp_morph}')
    with open(join(exp_morph_models_path, f'{exp_morph}.json'), 'w') as exp_morph_models_fp:
      json.dump(model_collection, exp_morph_models_fp)


if __name__ == '__main__':
  main()
