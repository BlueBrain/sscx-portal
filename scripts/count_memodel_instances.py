import sys
import logging
import json
from os import listdir
from os.path import isdir, join, abspath


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
  Count memodel instances and report when there are less than five instances
  per given region/mtype/etype

  Script arguments:
  * memodel base path

  Expected memodel directory structure:
  <mtype>/<etype>/<region>/<memodel_name>
  e.g.: L1_DAC/bNAC/S1DZ/L1_DAC_bNAC_1

  """
  memodel_path = abspath(sys.argv[1])

  logger.info(f'memodel path: {memodel_path}')

  if not isdir(memodel_path):
    logger.critical(f'memodel base path doesn\'t seem to be directory: {memodel_path}')
    sys.exit(1)

  logger.info('Reading directory structure')
  memodels = []

  memodel_count_exceptions = {}
  mtypes = listdirsonly(memodel_path)
  if not len(mtypes):
    logger.critical('Looks like there are no mtype directories, check provided memodel base path')
    sys.exit(1)
  for mtype in mtypes:
    etypes = listdir(join(memodel_path, mtype))
    if not len(etypes):
      logger.warning(f'No etype directories found in ./{mtype}')
    for etype in etypes:
      regions = listdir(join(memodel_path, mtype, etype))
      if not len(regions):
        logger.warning(f'No region directories found in ./{mtype}/{etype}')
      for region in regions:
        memodel_names = listdir(join(memodel_path, mtype, etype, region))
        if not len(memodel_names):
          logger.warning(f'No memodel directories found in ./{mtype}/{etype}/{region}')
        if not len(memodel_names) == 5:
          logger.warning(f'Found {len(memodel_names)} memodel instances for {mtype}/{etype}/{region}')
          logger.info(', '.join(memodel_names))

          if mtype not in memodel_count_exceptions:
            memodel_count_exceptions[mtype] = {}

          if etype not in memodel_count_exceptions[mtype]:
            memodel_count_exceptions[mtype][etype] = {}

          memodel_count_exceptions[mtype][etype][region] = len(memodel_names)
        for memodel_name in memodel_names:
          memodels.append((mtype, etype, region, memodel_name))

  logger.info(f'Found {len(memodels)} memodel directories')
  logger.info(f'Memodel count exceptions: {json.dumps(memodel_count_exceptions)}')


if __name__ == '__main__':
  main()
