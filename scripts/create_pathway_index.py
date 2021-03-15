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
  * synaptome renderings base path
  * output path

  Expected memodel directory structure:
  <region>/<pre_mtype>___<post_mtype>/

  Output: pathway_index.json with the following structure:
  {
    region: {
      <region>: [pre_mtype_idx, post_mtype_idx][]
    },
    mtypeIdx: string[],
  }

  """
  synaptome_path = abspath(sys.argv[1])
  output_path = abspath(sys.argv[2])

  log.info(f'synaptome path: {synaptome_path}')
  log.info(f'output path:  {output_path}')

  if not isdir(synaptome_path):
    log.critical(f'synaptome base path doesn\'t seem to be directory: {synaptome_path}')
    sys.exit(1)

  if not isdir(output_path):
    try:
      makedirs(output_path)
    except Exception:
      log.critical(f'Can\'t create an output directory ({output_path})')
      sys.exit(1)

  regions = listdirsonly(synaptome_path)
  mtypes = set()

  mts = []

  for region in regions:
    log.info(f'reading index for {region} region')
    pathways = listdirsonly(join(synaptome_path, region))
    for pathway in pathways:
      pre_mtype = re.match(r'^(.+)\_\_\_.*$', pathway)[1]
      post_mtype = re.match(r'^.*\_\_\_(.+)$', pathway)[1]

      if re.match(r'^.*\_\d+$', pre_mtype) or re.match(r'^.*\_\d+$', post_mtype):
        print(f'{region}/{pathway}')

      mtypes.add(pre_mtype)
      mtypes.add(post_mtype)

      mts.append(pre_mtype)
      mts.append(post_mtype)

  print(len(set(mts)))

  mtype_list = list(mtypes)
  mtype_list.sort()

  weird_mtypes = [mtype for mtype in mtype_list if re.match(r'^.*\_\d+$', mtype)]
  log.warning(f'Found {len(weird_mtypes)} weird mtypes: {", ".join(weird_mtypes)}')

  pathway_index = {
    'region': {},
    'mtypeIdx': mtype_list
  }

  for region in regions:
    if region not in pathway_index['region']:
      pathway_index['region'][region] = []

    pathways = listdirsonly(join(synaptome_path, region))
    for pathway in pathways:
      pre_mtype = re.match(r'^(.+)\_\_\_.*$', pathway)[1]
      post_mtype = re.match(r'^.*\_\_\_(.+)$', pathway)[1]

      pathway_index['region'][region].append([
        mtype_list.index(pre_mtype),
        mtype_list.index(post_mtype)
      ])

  with open(join(output_path, 'pathway-index.json'), 'w') as pathway_index_file:
    json.dump(pathway_index, pathway_index_file)


def listdirsonly(path):
  """
  List directories for a given path
  """
  return [dir for dir in listdir(path) if isdir(join(path, dir))]


if __name__ == '__main__':
  main()
