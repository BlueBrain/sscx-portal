import sys
import logging
import re
import json
from os import listdir
from os.path import isdir, join, abspath
import coloredlogs, logging


log = logging.getLogger(__name__)
coloredlogs.install(level='DEBUG')


def listdirsonly(path):
  """
  List directories for a given path
  """
  return [dir for dir in listdir(path) if isdir(join(path, dir))]


def main():
  """
  For a given folder with ephys population data generate a json file
  containing a list of population plots (PNG images)

  Script arguments:
  * ephys population folder

  Expected ephys population structure:
  <mtype>/
  """
  input_path = abspath(sys.argv[1])

  log.info(f'ephys population path: {input_path}')

  if not isdir(input_path):
    log.critical(f'ephys population data base path doesn\'t seem to be directory: {input_path}')
    sys.exit(1)

  mtypes = listdirsonly(input_path)

  for mtype in mtypes:
    log.info(f'reading index for {mtype} mtype')
    protocols = listdirsonly(join(input_path, mtype))

    plot_index = {
      "plots": {}
    }

    for protocol in protocols:
      plot_fnames = [
        fname
        for fname
        in listdir(join(input_path, mtype, protocol))
        if re.match(r'.+\.png', fname)
      ]

      plot_fnames.sort()

      plot_index["plots"][protocol] = plot_fnames

    log.info(f'writing plot index file for {mtype}')
    with open(join(input_path, mtype, 'plots.json'), 'w') as plot_index_file:
      json.dump(plot_index, plot_index_file)

  log.info('done')


if __name__ == '__main__':
  main()
