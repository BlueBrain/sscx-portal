from genericpath import isfile
import sys
import csv
import re
import json
from os import listdir, makedirs
from os.path import isdir, join, abspath
import coloredlogs, logging


log = logging.getLogger(__name__)
coloredlogs.install(level='DEBUG')


def main():
  """
  Create pathway index.

  Script arguments:
  * model factsheets base path
  * output path
  * csv file with pathways to ignore (not to add to the index)

  Expected memodel directory structure:
  <REGION>/<region>/Central/Pathways/<pre_mtype>-<post_mtype>/

  Output: pathway-index.json with the following structure:
  {
    region: {
      <region>: [pre_mtype_idx, post_mtype_idx][]
    },
    mtypeIdx: string[],
  }

  Expected structure of the CSV file with ignored pathways:
  region,pre,post,pathway
  """
  input_path = abspath(sys.argv[1])
  output_path = abspath(sys.argv[2])
  ignore_list_path = sys.argv[3] if 3 in sys.argv else None

  log.info(f'model factsheets path: {input_path}')
  log.info(f'output path:  {output_path}')
  if ignore_list_path:
    log.info(f'ignoring entries from the file: ${ignore_list_path}')

  if not isdir(input_path):
    log.critical(f'model factsheets base path doesn\'t seem to be directory: {input_path}')
    sys.exit(1)

  if not isdir(output_path):
    try:
      makedirs(output_path)
    except Exception:
      log.critical(f'Can\'t create an output directory ({output_path})')
      sys.exit(1)

  if ignore_list_path and not isfile(ignore_list_path):
    log.critical(f'Ignore list doesn\'t seem to be a file')
    sys.exit(1)

  ignored_pathways = []
  if ignore_list_path:
    with open(ignore_list_path) as ignore_file:
      reader = csv.reader(ignore_file)
      ignored_pathways = [(row[0], row[3]) for row in reader]


  regions = listdirsonly(join(input_path, 'REGION'))
  mtypes = set()

  mts = []

  for region in regions:
    log.info(f'Reading index for {region} region')
    pathways = listdirsonly(join(input_path, 'REGION', region, 'Central/Pathways'))
    for pathway in pathways:
      if (region, pathway) in ignored_pathways:
        continue

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

  log.info('Generating pathway index')
  for region in regions:
    pathway_num = 0

    if region not in pathway_index['region']:
      pathway_index['region'][region] = []

    pathways = listdirsonly(join(input_path, 'REGION', region, 'Central/Pathways'))
    for pathway in pathways:
      if (region, pathway) in ignored_pathways:
        log.info(f'Skipping pathway: {region} {pathway}')
        continue

      pathway_match = re.match(r'^(L\d+\_.*)\-(L\d+\_.*)$', pathway)

      pre_mtype = pathway_match[1]
      post_mtype = pathway_match[2]

      pathway_index['region'][region].append(mtype_list.index(pre_mtype))
      pathway_index['region'][region].append(mtype_list.index(post_mtype))

      pathway_num += 1

    log.info(f'Pathways for {region:<5}: {pathway_num}')

  with open(join(output_path, 'pathway-index.json'), 'w') as pathway_index_file:
    json.dump(pathway_index, pathway_index_file)


def listdirsonly(path):
  """
  List directories for a given path
  """
  return [dir for dir in listdir(path) if isdir(join(path, dir))]


if __name__ == '__main__':
  main()
