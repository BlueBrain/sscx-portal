import sys
import json
from os import listdir
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
  Count memodel instances and report when there are less than five instances
  per given region/mtype/etype

  Script arguments:
  * memodel base path

  Expected memodel directory structure:
  <mtype>/<etype>/<region>/<memodel_name>
  e.g.: L1_DAC/bNAC/S1DZ/L1_DAC_bNAC_1

  """
  memodel_path = abspath(sys.argv[1])
  output_path = abspath(sys.argv[2])

  log.info(f'memodel path: {memodel_path}')
  log.info(f'output path:  {output_path}')

  if not isdir(memodel_path):
    log.critical(f'memodel base path doesn\'t seem to be directory: {memodel_path}')
    sys.exit(1)

  log.info('Reading directory structure')
  memodels = []

  memodel_count_exceptions = {}
  mtypes = listdirsonly(memodel_path)
  if not len(mtypes):
    log.critical('Looks like there are no mtype directories, check provided memodel base path')
    sys.exit(1)
  for mtype in mtypes:
    etypes = listdir(join(memodel_path, mtype))
    if not len(etypes):
      log.warning(f'No etype directories found in ./{mtype}')
    for etype in etypes:
      regions = listdir(join(memodel_path, mtype, etype))
      if not len(regions):
        log.warning(f'No region directories found in ./{mtype}/{etype}')
      for region in regions:
        memodel_names = listdir(join(memodel_path, mtype, etype, region))
        if not len(memodel_names):
          log.warning(f'No memodel directories found in ./{mtype}/{etype}/{region}')
        if not len(memodel_names) == 5:
          log.warning(f'Found {len(memodel_names)} memodel instances for {mtype}/{etype}/{region}')
          log.info(', '.join(memodel_names))

          if mtype not in memodel_count_exceptions:
            memodel_count_exceptions[mtype] = {}

          if etype not in memodel_count_exceptions[mtype]:
            memodel_count_exceptions[mtype][etype] = {}

          memodel_count_exceptions[mtype][etype][region] = len(memodel_names)
        for memodel_name in memodel_names:
          memodels.append((mtype, etype, region, memodel_name))

  log.info(f'Found {len(memodels)} memodel directories')
  with open(join(output_path, 'memodel-number-exceptions.json'), 'w') as file:
    json.dump(memodel_count_exceptions, file)


if __name__ == '__main__':
  main()
