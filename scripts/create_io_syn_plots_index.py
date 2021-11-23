import sys
import json
import re
from os import listdir
from os.path import isdir, join, abspath, isfile
import coloredlogs
import logging


log = logging.getLogger(__name__)
coloredlogs.install(level='DEBUG')


def main():
  """
  Create an index for available input/output synaptome plots in place.

  Script arguments:
  * mtype i/o synaptome path

  Synaptome path directory expected to have named per layer plots: L<layer_num>.png
  "io_synaptome_layers.json" file will contain a list of layers for which plots are available
  """
  synaptome_path = abspath(sys.argv[1])

  log.info(f'synaptome plots path: {synaptome_path}')

  if not isdir(synaptome_path):
    log.critical(f'base synaptome plots path doesn\'t seem to be directory: {synaptome_path}')
    sys.exit(1)

  plot_layers = [
    re.match(r'L\d', plot_file)[0]
    for plot_file
    in listdir(synaptome_path)
    if re.match(r'L\d\.png', plot_file)
  ]
  plot_layers.sort()

  if not len(plot_layers):
    log.critical('Looks like there are no plots in the base directory, check provided base path')
    sys.exit(1)

  with open(join(synaptome_path, 'io_synaptome_plot_layers.json'), 'w') as index_file:
    json.dump(plot_layers, index_file)


if __name__ == '__main__':
  main()
