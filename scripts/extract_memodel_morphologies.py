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


def copy_morphology(args):
  memodel_base_path, memodel, output_path = args
  mtype, etype, region, memodel_name = memodel

  memodel_base_path = join(memodel_base_path, mtype, etype, region, memodel_name)
  output_dir = output_path

  morphology_name = listdir(join(memodel_base_path, 'morphology'))[0]

  if not isdir(output_dir):
    makedirs(output_dir)

  if isfile(join(output_dir, morphology_name)):
    log.info(f'Morphology already exists for {mtype}/{etype}/{region}/{memodel_name}')
  else:
    cp_morph_cmd = f'cp "morphology/{morphology_name}" "{output_dir}/"'
    cp_morph_run = subprocess.run(cp_morph_cmd, shell=True, cwd=memodel_base_path)

    if cp_morph_run.returncode != 0:
      log.error(f'Error copying morphology {memodel_base_path}/{memodel_name} to {output_dir}')
      log.error(cp_morph_run.stderr)
    else:
      log.info(f'Copy morphology done for {mtype}/{etype}/{region}/{memodel_name}')


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
  log.info('About to start extraction')

  pool = multiprocessing.Pool(proc_num)
  pool.map(copy_morphology, [(memodel_path, memodel, output_path) for memodel in memodels])
  pool.close()
  pool.join()

  log.info(f'Extracted morphologies for {len(memodels)} memodels')


if __name__ == '__main__':
  main()
