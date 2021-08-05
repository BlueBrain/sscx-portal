#!/bin/bash

CURRENT_DIR=$(pwd)

IMG_DIR=$1
IMG_WIDTH=${2:-640}
CPU_N=${3:-4}
COLORS=${4:-128}

echo "Location: $(realpath $IMG_DIR)"
echo
echo "Target image width: $IMG_WIDTH px"
echo "Target number of colors: $COLORS"
echo
echo "Using $CPU_N CPUs"
echo

while true; do
    read -p "Do you wish to continue? (Yes/No) " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

cd $IMG_DIR

find . -name "*.png" ! -name "*__w*.png" \
  | sed 's/\.png//' \
  | xargs -I {} -P$CPU_N bash -c \
  'if test ! -f "{}__w$1.png"; then convert "{}.png" -geometry $1 -colors $2 -limit memory 4GiB "{}__w$1.png"; echo "Created {}__w$1.png"; fi' \
  -- "$IMG_WIDTH" "$COLORS"

cd $CURRENT_DIR

echo
echo Done
