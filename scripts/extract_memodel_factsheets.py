import sys
import json
import multiprocessing
import subprocess
import logging
from os import listdir, makedirs
from os.path import isfile, isdir, join, abspath

CPU_COUNT = multiprocessing.cpu_count()


with open('./scripts/emodel-exp-cells.json') as emodel_exp_cells:
  emodel_exp_cells = json.loads(emodel_exp_cells.read())


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


def extract_factsheets(args):
  memodels_dir, memodel, output_path = args
  mtype, etype, region, memodel_name = memodel

  memodel_base_path = join(memodels_dir, mtype, etype, region, memodel_name)
  output_dir = join(output_path, mtype, etype, region, memodel_name)

  if not isdir(output_dir):
    makedirs(output_dir)

  # check config/constants.json file present in memodel folder
  if not isfile(join(memodel_base_path, 'config/constants.json')):
    logger.error(f'Can\'t read config/constants.json for {mtype}/{etype}/{region}/{memodel_name}')
    return

  # etype factsheet
  if isfile(join(output_dir, 'e_type_factsheet.json')):
    logger.info(f'Etype factsheet already exists for {mtype}/{etype}/{region}/{memodel_name}')
  else:
    # read emodel template and extend the e_type_factsheet
    with open(join(memodel_base_path, 'config/constants.json')) as constants_file:
      constants = json.loads(constants_file.read())
    with open(join(memodel_base_path,'factsheets', 'e_type_factsheeet.json')) as etype_factsheet_file:
      etype_factsheet = json.loads(etype_factsheet_file.read())
    etype_factsheet.append({
      "value": constants['template_name'],
      "name": "emodel template"
    })
    etype_factsheet.append({
      "value": emodel_exp_cells[constants['template_name']],
      "name": "experimental cells used for model fitting"
    })
    with open(join(output_dir, 'e_type_factsheet.json'), 'w') as etype_factsheet_file:
      json.dump(etype_factsheet, etype_factsheet_file)
    logger.info(f'Etype factsheet was successfully written for {mtype}/{etype}/{region}/{memodel_name}')

  # metype factsheet
  if isfile(join(output_dir, 'me_type_factsheeet.json')):
    logger.info(f'MEtype factsheet already exists for {mtype}/{etype}/{region}/{memodel_name}')
  else:
    metype_cmd = f'cp "factsheets/me_type_factsheeet.json" "{output_dir}/me_type_factsheet.json"'
    logger.log(f'metype_cmd: {metype_cmd}')
    cp_metype_run = subprocess.run(metype_cmd, shell=True, cwd=memodel_base_path)

    if cp_metype_run.returncode != 0:
      logger.error(f'Error copying MEtype factsheet {memodel_base_path} to {output_dir}')
      logger.error(cp_metype_run.stderr)
    else:
      logger.info(f'MEtype factsheet was successfully written for {mtype}/{etype}/{region}/{memodel_name}')


def main():
  """
  Copy extended factsheets from memodel build folder.

  Script arguments:
  * memodel base path
  * output path

  Expected memodel directory structure:
  <mtype>/<etype>/<region>/<memodel_name>
  e.g.: L1_DAC/bNAC/S1DZ/L1_DAC_bNAC_1

  Output directory structure:
  <mtype>/<etype>/<region>/<memodel_name>/<"me_type_factsheet.json" || "e_type_factsheet.json">

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
  elif len(listdir(output_path)):
    logger.critical(f'Output directory isn\'t clean ({output_path})')
    sys.exit(1)

  proc_num = int(input(f'Enter Number of processes to use ({CPU_COUNT}): '))

  logger.info('Reading directory structure')
  memodels = []

  mtypes = listdirsonly(memodel_path)
  if not len(mtypes):
    logger.critical('Looks like there are no mtype directories, check provided memodel base path')
    sys.exit(1)
  for mtype in mtypes:
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
  pool.map(extract_factsheets, [(memodel_path, memodel, output_path) for memodel in memodels])
  pool.close()
  pool.join()

  logger.info(f'Extracted factsheets for {len(memodels)} memodels')


if __name__ == '__main__':
  main()
