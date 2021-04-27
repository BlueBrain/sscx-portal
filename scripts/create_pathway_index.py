import sys
import re
import json
import logging
from os import listdir, makedirs
from os.path import isfile, isdir, join, abspath
import coloredlogs, logging

log = logging.getLogger(__name__)
coloredlogs.install(level='DEBUG')


def main():
  """
  Create pathway index.

  Script arguments:
  * model factsheets base path
  * output path

  Expected memodel directory structure:
  <REGION>/<region>/Central/Pathways/<pre_mtype>-<post_mtype>/

  Output: pathway-index.json with the following structure:
  {
    region: {
      <region>: [pre_mtype_idx, post_mtype_idx][]
    },
    mtypeIdx: string[],
  }

  """
  input_path = abspath(sys.argv[1])
  output_path = abspath(sys.argv[2])

  log.info(f'model factsheets path: {input_path}')
  log.info(f'output path:  {output_path}')

  if not isdir(input_path):
    log.critical(f'model factsheets base path doesn\'t seem to be directory: {input_path}')
    sys.exit(1)

  if not isdir(output_path):
    try:
      makedirs(output_path)
    except Exception:
      log.critical(f'Can\'t create an output directory ({output_path})')
      sys.exit(1)

  regions = listdirsonly(join(input_path, 'REGION'))
  mtypes = set()

  mts = []

  for region in regions:
    log.info(f'reading index for {region} region')
    pathways = listdirsonly(join(input_path, 'REGION', region, 'Central/Pathways'))
    for pathway in pathways:
      pathway_match = re.match(r'^(L\d+\_.*)\-(L\d+\_.*)$', pathway)

      pre_mtype = pathway_match[1]
      post_mtype = pathway_match[2]

      mtypes.add(pre_mtype)
      mtypes.add(post_mtype)

      mts.append(pre_mtype)
      mts.append(post_mtype)

  print(len(set(mts)))

  mtype_list = list(mtypes)
  mtype_list.sort()

  pathway_index = {
    'region': {},
    'mtypeIdx': mtype_list
  }

  for region in regions:
    if region not in pathway_index['region']:
      pathway_index['region'][region] = []

    pathways = listdirsonly(join(input_path, 'REGION', region, 'Central/Pathways'))
    for pathway in pathways:
      pathway_match = re.match(r'^(L\d+\_.*)\-(L\d+\_.*)$', pathway)

      pre_mtype = pathway_match[1]
      post_mtype = pathway_match[2]

      pathway_index['region'][region].append(mtype_list.index(pre_mtype))
      pathway_index['region'][region].append(mtype_list.index(post_mtype))

  with open(join(output_path, 'pathway-index.json'), 'w') as pathway_index_file:
    json.dump(pathway_index, pathway_index_file)


def listdirsonly(path):
  """
  List directories for a given path
  """
  return [dir for dir in listdir(path) if isdir(join(path, dir))]


if __name__ == '__main__':
  main()
