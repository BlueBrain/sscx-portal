import sys
import json
from os import listdir, makedirs
from os.path import isdir, join, abspath
import coloredlogs, logging


log = logging.getlog(__name__)
coloredlogs.install(level='DEBUG')


def listdirsonly(path):
  """
  List directories for a given path
  """
  return [dir for dir in listdir(path) if isdir(join(path, dir))]


def main():
  """
  Create memodel index.

  Script arguments:
  * memodel base path
  * output path

  Expected memodel directory structure:
  <mtype>/<etype>/<region>/<memodel_name>
  e.g.: L1_DAC/bNAC/S1DZ/L1_DAC_bNAC_1

  Output: memodel_index.json

  """
  memodel_path = abspath(sys.argv[1])
  output_path = abspath(sys.argv[2])

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

  log.info('Reading directory structure')
  memodels = []

  mtypes = listdirsonly(memodel_path)
  if not len(mtypes):
    log.critical('Looks like there are no mtype directories, check provided memodel base path')
    sys.exit(1)
  for mtype in mtypes:
    etypes = listdirsonly(join(memodel_path, mtype))
    if not len(etypes):
      log.warn(f'No etype directories found in ./{mtype}')
    for etype in etypes:
      regions = listdirsonly(join(memodel_path, mtype, etype))
      if not len(regions):
        log.warn(f'No region directories found in ./{mtype}/{etype}')
      for region in regions:
        memodel_names = listdirsonly(join(memodel_path, mtype, etype, region))
        if not len(memodel_names):
          log.warn(f'No memodel directories found in ./{mtype}/{etype}/{region}')
        for memodel_name in memodel_names:
          memodels.append((mtype, etype, region, memodel_name))

  log.info(f'Found {len(memodels)} memodel directories')
  log.info('Creating index')

  index = {}
  # path structure: region, mtype, etype

  for memodel in memodels:
    mtype, etype, region, memodel_name = memodel
    if region not in index:
      index[region] = {}

    if mtype not in index[region]:
      index[region][mtype] = []

    if etype not in index[region][mtype]:
      index[region][mtype].append(etype)

  with open(join(output_path, 'memodel-index.json'), 'w') as index_file:
    json.dump(index, index_file)

  log.info(f'Created index for {len(memodels)} memodels')


if __name__ == '__main__':
  main()
