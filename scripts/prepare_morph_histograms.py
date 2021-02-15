import sys
import json
import re
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


def convert_histogram(args):
  base_path, histogram, output_path = args
  region, mtype, name = histogram

  histogram_base_path = join(base_path, region, mtype)
  output_dir = join(output_path, region, mtype)
  output_file = join(output_dir, f'{name}.png')

  if isfile(join(output_dir, output_file)):
    logger.info(f'Converted file already exists for {region}/{mtype}/{name}')
    return

  if not isdir(output_dir):
    makedirs(output_dir)

  cmd = f'svgexport {name}.svg {output_dir}/{name}.png 4x'
  convert_run = subprocess.run(cmd, shell=True, cwd=histogram_base_path)

  if convert_run.returncode != 0:
    logger.error(f'Error converting {histogram_base_path}/{name} to {output_file}')
    logger.error(convert_run.stderr)
  else:
    logger.info(f'Conversion done for {region}/{mtype}/{name}')


def main():
  """
  Prepare morph histograms.
  This includes two steps:
  * convert histogram svgs to pngs with 4x resolution
  * create index json file for each mtype containing a list of histogram images

  Script arguments:
  * base path
  * output path

  Expected input directory structure:
  <region>/<mtype>/<pngs[]>

  Output directory structure:
  <region>/<mtype>/<svgs[] | 'morph-histogram-index.json'>

  """
  histogram_path = abspath(sys.argv[1])
  output_path = abspath(sys.argv[2])

  logger.info(f'histogram input path: {histogram_path}')
  logger.info(f'output path:  {output_path}')

  if not isdir(histogram_path):
    logger.critical(f'histogram base path doesn\'t seem to be directory: {histogram_path}')
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
  histograms = []

  regions = listdirsonly(histogram_path)
  if not len(regions):
    logger.critical('Looks like there are no region directories, check provided input base path')
    sys.exit(1)
  for region in regions:
    mtypes = listdirsonly(join(histogram_path, region))
    if not len(mtypes):
      logger.warn(f'No mtype directories found in ./{region}')
    for mtype in mtypes:
      histogram_files = listdir(join(histogram_path, region, mtype))

      histogram_files_wo_ext = [
        re.match(r'(.+)\.svg', fname).groups()[0]
        for fname
        in histogram_files
        if re.match(r'.+\.svg', fname)
      ]

      current_output_dir = join(output_path, region, mtype)
      if not isdir(current_output_dir):
        makedirs(current_output_dir)
      with open(join(current_output_dir, 'histogram-index.json'), 'w') as index_file:
        json.dump(histogram_files_wo_ext, index_file)
      if not len(histogram_files):
        logger.warn(f'No files found in ./{region}/{mtype}')
      for histogram_name in histogram_files_wo_ext:
        histograms.append((region, mtype, histogram_name))

  logger.info(f'Found {len(histograms)} histogram images')
  logger.info('About to start convertion')

  pool = multiprocessing.Pool(proc_num)
  pool.map(convert_histogram, [(histogram_path, histogram, output_path) for histogram in histograms])
  pool.close()
  pool.join()

  logger.info(f'Converted {len(histograms)} histograms with index')


if __name__ == '__main__':
  main()
