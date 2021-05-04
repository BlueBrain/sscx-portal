import sys
import re
import json
import logging
from os import listdir, makedirs
from os.path import isfile, isdir, join, abspath
import coloredlogs, logging

log = logging.getLogger(__name__)
coloredlogs.install(level='DEBUG')



def listdirsonly(path):
  """
  List directories for a given path
  """
  return [dir for dir in listdir(path) if isdir(join(path, dir))]


def main():
  """
  Analyse pathway consistency across regions.

  Script arguments:
  * model-data folder

  Expected memodel directory structure:
  <REGION>/<region>/Central/Pathways/<pre_mtype>-<post_mtype>/
  """
  input_path = abspath(sys.argv[1])

  log.info(f'model factsheets path: {input_path}')

  if not isdir(input_path):
    log.critical(f'model-data base path doesn\'t seem to be directory: {input_path}')
    sys.exit(1)

  regions = listdirsonly(join(input_path, 'REGION'))

  pathway_dict = {}
  pathway_set = set()

  for region in regions:
    log.info(f'reading index for {region} region')
    pathways = listdirsonly(join(input_path, 'REGION', region, 'Central/Pathways'))
    pathway_dict[region] = pathways
    for pathway in pathways:
      pathway_set.add(pathway)

  pathways = list(pathway_set)
  pathways.sort()

  region_header = ''.join([f'{region:<8}' for region in regions])
  log.info(f'                     {region_header}')

  for pathway in pathways:
    log.info(f'{pathway:<20} {"       ".join(["v" if pathway in pathway_dict[region] else "X" for region in regions])}')



if __name__ == '__main__':
  main()
