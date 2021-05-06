import sys
import multiprocessing
import subprocess
from os import listdir, makedirs
from os.path import isfile, isdir, join, abspath
import coloredlogs, logging


log = logging.getlog(__name__)
coloredlogs.install(level='DEBUG')

CPU_COUNT = multiprocessing.cpu_count()


def listdirsonly(path):
  """
  List directories for a given path
  """
  return [dir for dir in listdir(path) if isdir(join(path, dir))]


def compress_memodel_dir(args):
  memodel_base_path, memodel, output_path = args
  mtype, etype, region, memodel_name = memodel

  memodel_base_path = join(memodel_base_path, mtype, etype, region)
  output_dir = join(output_path, mtype, etype, region)
  output_file = join(output_dir, f'{memodel_name}.tar.xz')

  if isfile(join(output_dir, output_file)):
    log.info(f'Archive already exists for {mtype}/{etype}/{region}/{memodel_name}')
    return

  if not isdir(output_dir):
    makedirs(output_dir)

  cmd = f'tar cf - "{memodel_name}" --exclude=\'recordings.*\' --exclude=\'*step*.dat\' | xz -4e > "{output_file}"'
  compression_run = subprocess.run(cmd, shell=True, cwd=memodel_base_path)

  if compression_run.returncode != 0:
    log.error(f'Error compressing {memodel_base_path}/{memodel_name} to {output_file}')
    log.error(compression_run.stderr)
  else:
    log.info(f'Compression done for {mtype}/{etype}/{region}/{memodel_name}')


def main():
  """
  Create memodel archives.

  Script arguments:
  * memodel base path
  * output path

  Expected memodel directory structure:
  <mtype>/<etype>/<region>/<memodel_name>
  e.g.: L1_DAC/bNAC/S1DZ/L1_DAC_bNAC_1

  Output directory structure:
  <mtype>/<etype>/<region>/<memodel_name>/<"e_type_factsheet.json" | "me_type_factsheet.json">

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
  # elif len(listdir(output_path)):
  #   log.critical(f'Output directory isn\'t clean ({output_path})')
  #   sys.exit(1)

  proc_num = int(input(f'Enter Number of processes to use ({CPU_COUNT}): '))

  log.info('Reading directory structure')
  memodels = []

  mtypes = listdirsonly(memodel_path)
  if not len(mtypes):
    log.critical('Looks like there are no mtype directories, check provided memodel base path')
    sys.exit(1)
  for mtype in mtypes:
    etypes = listdir(join(memodel_path, mtype))
    if not len(etypes):
      log.warn(f'No etype directories found in ./{mtype}')
    for etype in etypes:
      regions = listdir(join(memodel_path, mtype, etype))
      if not len(regions):
        log.warn(f'No region directories found in ./{mtype}/{etype}')
      for region in regions:
        memodel_names = listdir(join(memodel_path, mtype, etype, region))
        if not len(memodel_names):
          log.warn(f'No memodel directories found in ./{mtype}/{etype}/{region}')
        for memodel_name in memodel_names:
          memodels.append((mtype, etype, region, memodel_name))

  log.info(f'Found {len(memodels)} memodel directories')
  log.info('About to start compression')

  pool = multiprocessing.Pool(proc_num)
  pool.map(compress_memodel_dir, [(memodel_path, memodel, output_path) for memodel in memodels])
  pool.close()
  pool.join()

  log.info(f'Generated {len(memodels)} memodel archives')


if __name__ == '__main__':
  main()
