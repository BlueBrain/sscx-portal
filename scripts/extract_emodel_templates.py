import sys
import json
import multiprocessing
import subprocess
import logging
from os import listdir, makedirs
from os.path import isfile, isdir, join, abspath

CPU_COUNT = multiprocessing.cpu_count()

emodel_exp_cells = json.loads(open('./emodel-exp-cells.json').read())


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


def extend_factsheet(args):
  memodel_base_path, memodel, output_path = args
  mtype, etype, region, memodel_name = memodel
  logger.info(f'Extending {mtype}/{etype}/{region}/{memodel_name}')

  memodel_base_path = join(memodel_base_path, mtype, etype, region, memodel_name)
  output_dir = join(output_path, mtype, etype, region, memodel_name)

  if not isdir(output_dir):
    makedirs(output_dir)

  # check config/constants.json file present in memodel folder
  if not isfile(join(memodel_base_path, 'config/constants.json')):
    logger.error(f'Can\'t read config/constants.json for {mtype}/{etype}/{region}/{memodel_name}')
    return

  # check target e_type_factsheet present
  if not isfile(join(output_dir, 'e_type_factsheeet.json')):
    logger.error(f'Etype factsheet does not exist for {mtype}/{etype}/{region}/{memodel_name}')
    return

  # read emodel template and extend the e_type_factsheet
  with open(join(memodel_base_path, 'config/constants.json')) as constants_file:
    constants = json.loads(constants_file.read())
  with open(join(output_dir, 'e_type_factsheeet.json')) as etype_factsheet_file:
    etype_factsheet = json.loads(etype_factsheet_file.read())
  if len(etype_factsheet) == 3:
    etype_factsheet.append({
      "value": constants['template_name'],
      "name": "emodel template"
    })
    etype_factsheet.append({
      "value": emodel_exp_cells[constants['template_name']],
      "name": "experimental cells used for model fitting"
    })
    with open(join(output_dir, 'e_type_factsheeet.json'), 'w') as etype_factsheet_file:
      json.dump(etype_factsheet, etype_factsheet_file)


def main():
  """
  Extract emodel template names from memodel build folder and append those to the etype factsheets.
  Factsheets should be already generated.

  Script arguments:
  * memodel base path
  * output factsheets path

  Expected memodel directory structure:
  <mtype>/<etype>/<region>/<memodel_name>
  e.g.: L1_DAC/bNAC/S1DZ/L1_DAC_bNAC_1

  Output directory structure:
  <mtype>/<etype>/<region>/<memodel_name>/e_type_factsheeet.json

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
  # elif len(listdir(output_path)):
  #   logger.critical(f'Output directory isn\'t clean ({output_path})')
  #   sys.exit(1)

  proc_num = int(input(f'Enter Number of processes to use ({CPU_COUNT}): '))

  logger.info('Reading directory structure')
  memodels = []

  mtypes = listdirsonly(memodel_path)
  logger.info(f'mtypes: {mtypes}')
  if not len(mtypes):
    logger.critical('Looks like there are no mtype directories, check provided memodel base path')
    sys.exit(1)
  for mtype in mtypes:
    logger.info(f'Listing mtype {mtype}')
    etypes = listdir(join(memodel_path, mtype))
    if not len(etypes):
      logger.warn(f'No etype directories found in ./{mtype}')
    for etype in etypes:
      regions = listdir(join(memodel_path, mtype, etype))
      if not len(regions):
        logger.warn(f'No region directories found in ./{mtype}/{etype}')
      for region in regions:
        memodel_names = listdir(join(memodel_path, mtype, etype, region))
        if not len(memodel_names):
          logger.warn(f'No memodel directories found in ./{mtype}/{etype}/{region}')
        for memodel_name in memodel_names:
          memodels.append((mtype, etype, region, memodel_name))

  logger.info(f'Found {len(memodels)} memodel directories')
  logger.info('About to start extraction')

  pool = multiprocessing.Pool(proc_num)
  pool.map(extend_factsheet, [(memodel_path, memodel, output_path) for memodel in memodels])
  pool.close()
  pool.join()

  logger.info(f'Extend factsheets for {len(memodels)} memodels')


if __name__ == '__main__':
  main()
