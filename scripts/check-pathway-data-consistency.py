import sys
import logging
import re
import json
from os import listdir
from os.path import isdir, join, abspath, isfile
import coloredlogs, logging


log = logging.getLogger(__name__)
coloredlogs.install(level='DEBUG')

fh = logging.FileHandler('pathway-check.log')
fh.setLevel(logging.DEBUG)

log.addHandler(fh)

syn_anatomy_imgs = [
  'afferent_synapse_count.png',
  'axonal_branch_order.png',
  'axonal_path_distance.png',
  'dendritic_branch_order.png',
  'dendritic_path_distance.png',
  'neuronal_convergence.png',
  'neuronal_divergence.png',
  'synapses_per_connection.png',
  'synaptic_convergence.png',
  'synaptic_divergence.png',
]

syn_physiology_imgs = [
  'CV_vs_amplitudes.png',
  'amplitude.png',
  'coefficient_variation.png',
  'decay_time.png',
  'failures_vs_amplitudes.png',
  'onset_latency.png',
  'rise_time.png',
  'transmission_failures.png',
]


def listdirsonly(path):
  """
  List directories for a given path
  """
  return [dir for dir in listdir(path) if isdir(join(path, dir))]


def main():
  """
  Analyse consistency between pathways derived from pathway factsheets
  and synaptome renders, also checks if all synaptome renders are present.

  Script arguments:
  * model-data folder
  * synaptome renders folder

  Expected memodel directory structure:
  REGION/<region>/Central/Pathways/<pre_mtype>-<post_mtype>/

  Expected synaptome renders directory structure:
  <region>_Column/<pre-mtype>__<post-mtype>/
    * <pre-mtype>_<post-mtype>.png
    * pre_<pre-mtype>.png
    * post_<post-mtype>.png
  """
  model_data_path = abspath(sys.argv[1])
  synaptome_renders_path = abspath(sys.argv[2])

  log.info(f'model factsheets path:  {model_data_path}')
  log.info(f'synaptome renders path: {synaptome_renders_path}')

  missing_synaptomes = []

  if not isdir(model_data_path):
    log.critical(f'model-data base path doesn\'t seem to be directory: {model_data_path}')
    sys.exit(1)

  if not isdir(synaptome_renders_path):
    log.critical(f'synaptome renders base path doesn\'t seem to be directory: {model_data_path}')
    sys.exit(1)

  regions = listdirsonly(join(model_data_path, 'REGION'))

  for region in regions:
    log.info(f'reading index for {region} region')
    model_data_region_pathways_path = join(model_data_path, 'REGION', region, 'Central/Pathways')
    pathways = listdirsonly(model_data_region_pathways_path)
    for pathway in pathways:
      pathway_match = re.match(r'^(L\d+\_.*)\-(L\d+\_.*)$', pathway)

      pre_mtype = pathway_match[1]
      post_mtype = pathway_match[2]

      # checking model data: pathway factsheet
      if not isfile(join(model_data_region_pathways_path, pathway, 'factsheet.json')):
        log.error(f'model_factsheet: missing factsheet for {region}, {pathway}')

      # checking model data: synaptic anatomy images
      for syn_anatomy_img in syn_anatomy_imgs:
        if not isfile(join(model_data_region_pathways_path, pathway, 'SynapticAnatomy', syn_anatomy_img)):
          log.error(f'model_syn_anatomy: missing {syn_anatomy_img} image for {region}, {pathway}')

      # checking model data: synaptic physiology images
      for syn_physiology_img in syn_physiology_imgs:
        if not isfile(join(model_data_region_pathways_path, pathway, 'SynapticPhysiology', syn_physiology_img)):
          log.error(f'model_syn_physiology: missing {syn_physiology_img} image for {region}, {pathway}')

      synaptome_path = join(synaptome_renders_path, f'{region}_Column', f'{pre_mtype}__{post_mtype}')

      # checking synaptome directory exists
      if not isdir(synaptome_path):
        log.error(f'syn_dir: missing pathway folder for {region}, {pre_mtype}_{post_mtype}')
        missing_synaptomes.append([region, pre_mtype, post_mtype])
        continue

      # checking synaptome 3 renders exist
      if not isfile(join(synaptome_path, f'{pre_mtype}_{post_mtype}.png')):
        log.error(f'syn_pair: missing pair render for {region}, {pre_mtype}_{post_mtype}')

      if not isfile(join(synaptome_path, f'pre_{pre_mtype}.png')):
        log.error(f'syn_pre: missing synaptome render for {region}, pre-mtype {pre_mtype}')

      if not isfile(join(synaptome_path, f'post_{post_mtype}.png')):
        log.error(f'syn_post: missing synaptome render for {region}, post-mtype {post_mtype}')

  log.info(json.dumps(missing_synaptomes))


if __name__ == '__main__':
  main()
