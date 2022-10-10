import sys
import logging
import re
import json
from os import listdir
from os.path import isdir, join, abspath, isfile
import coloredlogs, logging


log = logging.getLogger(__name__)
coloredlogs.install(level='DEBUG', fmt='%(levelname)-8s :: %(message)s')

fh = logging.FileHandler('pathway-check.log')
fh.setLevel(logging.ERROR)

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

def pairs(items):
  pair_list = []
  while(items):
    el1 = items.pop(0)
    el2 = items.pop(0)
    pair_list.append((el1, el2))

  return pair_list


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
  * pathway-index file
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
  pathway_index_path = abspath(sys.argv[1])
  pathway_data_path = abspath(sys.argv[2])
  synaptome_renders_path = abspath(sys.argv[3])

  log.info(f'pathway index path:  {pathway_index_path}')
  log.info(f'model factsheets path:  {pathway_data_path}')
  log.info(f'synaptome renders path: {synaptome_renders_path}')

  missing_synaptomes = []

  if not isdir(pathway_data_path):
    log.critical(f'model-data base path doesn\'t seem to be directory: {pathway_data_path}')
    sys.exit(1)

  if not isdir(synaptome_renders_path):
    log.critical(f'synaptome renders base path doesn\'t seem to be directory: {pathway_data_path}')
    sys.exit(1)

  with open(pathway_index_path, 'r') as pathway_index_fp:
    pathways = json.load(pathway_index_fp)

  regions = [
    'S1DZ',
    # 'S1DZO', too small, if included - limits viable pathways for other regions
    'S1FL',
    'S1HL',
    'S1J',
    'S1Sh',
    'S1Tr',
    'S1ULp',
  ]

  for region in regions:
    # log.info(f'reading index for {region} region')
    pathway_data_region_pathways_path = join(pathway_data_path, 'REGION', region, 'Central/Pathways')
    # pathways = listdirsonly(pathway_data_region_pathways_path)
    for pathway in pathways:
      # pathway_match = re.match(r'^(L\d+\_.*)\-(L\d+\_.*)$', pathway)

      pre_mtype = pathway[0]
      post_mtype = pathway[1]

      pathway_name = f'{pre_mtype}-{post_mtype}'

      # checking data: pathway factsheet
      if not isfile(join(pathway_data_region_pathways_path, pathway_name, 'factsheet.json')):
        log.error(f'pathway_factsheet: missing factsheet for {region}, {pathway_name}')
      else:
        log.debug(f'pathway_factsheet: found for {region}, {pathway_name}')

      # checking data: synaptic anatomy images
      for syn_anatomy_img in syn_anatomy_imgs:
        if not isfile(join(pathway_data_region_pathways_path, pathway_name, 'SynapticAnatomy', syn_anatomy_img)):
          log.error(f'pathway_syn_anatomy: missing {syn_anatomy_img} image for {region}, {pathway_name}')
        else:
          log.debug(f'pathway_syn_anatomy: found {syn_anatomy_img} image for {region}, {pathway_name}')

      # checking data: synaptic physiology images
      for syn_physiology_img in syn_physiology_imgs:
        if not isfile(join(pathway_data_region_pathways_path, pathway_name, 'SynapticPhysiology', syn_physiology_img)):
          log.error(f'pathway_syn_physiology: missing {syn_physiology_img} image for {region}, {pathway_name}')
        else:
          log.debug(f'pathway_syn_physiology: found {syn_physiology_img} image for {region}, {pathway_name}')

      synaptome_path = join(synaptome_renders_path, f'{region}_Column', f'{pre_mtype}__{post_mtype}')

      # checking synaptome directory exists
      if not isdir(synaptome_path):
        log.error(f'syn_dir: missing pathway folder for {region}, {pre_mtype}_{post_mtype}')
        missing_synaptomes.append([region, pre_mtype, post_mtype])
        continue
      else:
        log.debug(f'syn_dir: found pathway folder for {region}, {pre_mtype}_{post_mtype}')

      # checking synaptome 3 renders exist
      if not isfile(join(synaptome_path, f'{pre_mtype}_{post_mtype}.png')):
        log.error(f'syn_pair: missing pair render for {region}, {pre_mtype}_{post_mtype}')
      else:
        log.debug(f'syn_pair: found pair render for {region}, {pre_mtype}_{post_mtype}')

      if not isfile(join(synaptome_path, f'pre_{pre_mtype}.png')):
        log.error(f'syn_pre: missing synaptome render for {region}, pre-mtype {pre_mtype}')
      else:
        log.debug(f'syn_pre: found synaptome render for {region}, pre-mtype {pre_mtype}')

      if not isfile(join(synaptome_path, f'post_{post_mtype}.png')):
        log.error(f'syn_post: missing synaptome render for {region}, post-mtype {post_mtype}')
      else:
        log.debug(f'syn_post: found synaptome render for {region}, post-mtype {post_mtype}')

  log.info(json.dumps(missing_synaptomes))


if __name__ == '__main__':
  main()
