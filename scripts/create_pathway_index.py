import itertools
import sys
import csv
import re
import json
from os import listdir, makedirs
from os.path import isdir, join, abspath
import coloredlogs, logging


log = logging.getLogger(__name__)
coloredlogs.install(level='DEBUG')

regions = [
  'S1DZ',
  'S1DZO',
  'S1FL',
  'S1HL',
  'S1J',
  'S1Sh',
  'S1Tr',
  'S1ULp',
]


def main():
  """
  Create pathway index.

  Script arguments:
  * viable pathways path
  * output path

  Expected directory structure for the list of viable pathways:
  - <REGION>_Column.csv

  Each CSV should have source_mtype and target_mtype columns


  Output: pathway-index.json with the following structure:
  {
    pathways: {
      common: [pre_mtype_idx, post_mtype_idx][],
      region: {
        <region>: [pre_mtype_idx, post_mtype_idx][]
      },
    }
    mtypes: string[],
  }

  Expected structure of the CSV file with ignored pathways:
  region,pre,post,pathway
  """
  input_path = abspath(sys.argv[1])
  output_path = abspath(sys.argv[2])

  log.info(f'viable pathways path: {input_path}')
  log.info(f'output path:  {output_path}')

  if not isdir(input_path):
    log.critical(f'viable pathways base path doesn\'t seem to be directory: {input_path}')
    sys.exit(1)

  if not isdir(output_path):
    try:
      makedirs(output_path)
    except Exception:
      log.critical(f'Can\'t create an output directory ({output_path})')
      sys.exit(1)

  mtypes = set()
  raw_pathways = {}
  indexed_pathways = {}

  log.info('Reading pathways and building mtype index')
  for region in regions:
    with open(join(input_path, f'{region}_Column.csv'), 'r') as csv_file:
      raw_pathways[region] = []
      pathway_collection = csv.DictReader(csv_file)
      for pathway_dict in pathway_collection:
        pre_mtype = pathway_dict['source_mtype']
        post_mtype = pathway_dict['target_mtype']
        mtypes.add(pre_mtype)
        mtypes.add(post_mtype)
        raw_pathways[region].append(f'{pre_mtype}---{post_mtype}')

  mtype_list = list(mtypes)
  mtype_list.sort()

  log.info('Building common pathway index')
  common_pathways = list(set.intersection(*[
    set(raw_pathways[region])
    for region
    in regions
  ]))
  common_pathways.sort()
  log.info(f'Common pathways: {len(common_pathways)}')

  indexed_common_pathways = list(itertools.chain(*[
    [
      mtype_list.index(re.match(r'^(L\d+\_.*)\-\-\-(L\d+\_.*)$', pathway)[1]),
      mtype_list.index(re.match(r'^(L\d+\_.*)\-\-\-(L\d+\_.*)$', pathway)[2])
    ]
    for pathway
    in list(common_pathways)
  ]))

  log.info('Building region pathway index')
  for region in regions:
    pathways = set(raw_pathways[region]) - set(common_pathways)
    log.info(f'Region {region} pathways: {len(pathways)}')
    indexed_pathways[region] = list(itertools.chain(*[
      [
        mtype_list.index(re.match(r'^(L\d+\_.*)\-\-\-(L\d+\_.*)$', pathway)[1]),
        mtype_list.index(re.match(r'^(L\d+\_.*)\-\-\-(L\d+\_.*)$', pathway)[2])
      ]
      for pathway
      in pathways
    ]))

  pathway_index = {
    'pathways': {
      'common': indexed_common_pathways,
      'region': indexed_pathways
    },
    'mtypes': mtype_list
  }

  with open(join(output_path, 'pathway-index.json'), 'w') as pathway_index_file:
    json.dump(pathway_index, pathway_index_file)


def listdirsonly(path):
  """
  List directories for a given path
  """
  return [dir for dir in listdir(path) if isdir(join(path, dir))]


if __name__ == '__main__':
  main()
