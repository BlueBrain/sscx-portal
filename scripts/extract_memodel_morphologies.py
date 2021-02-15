import sys
import multiprocessing
import subprocess
import logging
from os import listdir, makedirs
from os.path import isfile, isdir, join, abspath

CPU_COUNT = multiprocessing.cpu_count()


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


def copy_morphology(args):
  memodel_base_path, memodel, output_path = args
  mtype, etype, region, memodel_name = memodel

  memodel_base_path = join(memodel_base_path, mtype, etype, region, memodel_name)
  output_dir = join(output_path)
  # output_dir = join(output_path, mtype, etype, region, memodel_name)

  morphology_name = listdir(join(memodel_base_path, 'morphology'))[0]

  if not isdir(output_dir):
    makedirs(output_dir)

  if isfile(join(output_dir, morphology_name)):
    logger.info(f'Morphology already exists for {mtype}/{etype}/{region}/{memodel_name}')
  else:
    cp_morph_cmd = f'cp "morphology/{morphology_name}" "{output_dir}/"'
    cp_morph_run = subprocess.run(cp_morph_cmd, shell=True, cwd=memodel_base_path)

    if cp_morph_run.returncode != 0:
      logger.error(f'Error copying morphology {memodel_base_path}/{memodel_name} to {output_dir}')
      logger.error(cp_morph_run.stderr)
    else:
      logger.info(f'Copy morphology done for {mtype}/{etype}/{region}/{memodel_name}')


def main():
  """
  Copy morphologies from memodel build folder.

  Script arguments:
  * memodel base path
  * output path

  Expected memodel directory structure:
  <mtype>/<etype>/<region>/<memodel_name>
  e.g.: L1_DAC/bNAC/S1DZ/L1_DAC_bNAC_1

  Output directory structure:
  ./<morphology_name>.asc

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
  pool.map(copy_morphology, [(memodel_path, memodel, output_path) for memodel in memodels])
  pool.close()
  pool.join()

  logger.info(f'Extracted morphologies for {len(memodels)} memodels')


main()
