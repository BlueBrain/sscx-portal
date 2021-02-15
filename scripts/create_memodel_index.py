import sys
import json
import logging
from os import listdir, makedirs
from os.path import isfile, isdir, join, abspath



class CustomFormatter(logging.Formatter):
  """Logging Formatter to add colors and count warning / errors"""

  grey = "\x1b[38;21m"
  yellow = "\x1b[33;21m"
  red = "\x1b[31;21m"
  bold_red = "\x1b[31;1m"
  reset = "\x1b[0m"
  # format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s (%(filename)s:%(lineno)d)"
  format = "%(asctime)s - %(levelname)s - %(message)s"

  FORMATS = {
    logging.DEBUG: grey + format + reset,
    logging.INFO: grey + format + reset,
    logging.WARNING: yellow + format + reset,
    logging.ERROR: red + format + reset,
    logging.CRITICAL: bold_red + format + reset
  }

  def format(self, record):
    log_fmt = self.FORMATS.get(record.levelno)
    formatter = logging.Formatter(log_fmt)
    return formatter.format(record)


logger = logging.getLogger("main")
logger.setLevel(logging.DEBUG)
# create console handler with a higher log level
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)

ch.setFormatter(CustomFormatter())

logger.addHandler(ch)


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

  logger.info(f'memodel path: {memodel_path}')
  logger.info(f'output path:  {output_path}')

  if not isdir(memodel_path):
    logger.critical(f'memodel base path doesn\'t seem to be directory: {memodel_path}')
    sys.exit(1)

  if not isdir(output_path):
    try:
      makedirs(output_path)
    except Exception:
      logger.critical(f'Can\'t create an output directory ({output_path})')
      sys.exit(1)

  logger.info('Reading directory structure')
  memodels = []

  mtypes = listdirsonly(memodel_path)
  if not len(mtypes):
    logger.critical('Looks like there are no mtype directories, check provided memodel base path')
    sys.exit(1)
  for mtype in mtypes:
    etypes = listdirsonly(join(memodel_path, mtype))
    if not len(etypes):
      logger.warn(f'No etype directories found in ./{mtype}')
    for etype in etypes:
      regions = listdirsonly(join(memodel_path, mtype, etype))
      if not len(regions):
        logger.warn(f'No region directories found in ./{mtype}/{etype}')
      for region in regions:
        memodel_names = listdirsonly(join(memodel_path, mtype, etype, region))
        if not len(memodel_names):
          logger.warn(f'No memodel directories found in ./{mtype}/{etype}/{region}')
        for memodel_name in memodel_names:
          memodels.append((mtype, etype, region, memodel_name))

  logger.info(f'Found {len(memodels)} memodel directories')
  logger.info('Creating index')

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

  logger.info(f'Created index for {len(memodels)} memodels')


main()
