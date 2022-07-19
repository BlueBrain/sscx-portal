#!/bin/bash

set -e

SOURCE_VIDEO_PATH=$(realpath $1)
OUTPUT_PATH=$(realpath ${2:-./})
ENCODING_FORMAT=${3:-all}
SIZE=${4:-all}

SOURCE_VIDEO_FILENAME=$(basename $SOURCE_VIDEO_PATH)


if [ "$ENCODING_FORMAT" != "all" ] && [ "$ENCODING_FORMAT" != "h264" ] && [ "$ENCODING_FORMAT" != "hevc" ] && [ "$ENCODING_FORMAT" != "av1" ]; then
  echo "Unknown encoding format provided: $ENCODING_FORMAT. Supported values: all, h264, hevc, av1"
  exit 1
fi

if [ "$SIZE" != "all" ] && [ "$SIZE" != "1080p" ] && [ "$SIZE" != "720p" ] && [ "$SIZE" != "480p" ] && [ "$SIZE" != "360p" ]; then
  echo "Unknown size provided: $SIZE. Supported values: all, 1080p, 720p, 480p, 360p"
  exit 1
fi


echo "Source location:    $SOURCE_VIDEO_PATH"
echo "Encoding format(s): $ENCODING_FORMAT"
echo "Video size(s):      $SIZE"
echo "Output path:        $OUTPUT_PATH"
echo

while true; do
    read -p "Do you wish to continue? (Yes/No) " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

FILENAME_BASE="${SOURCE_VIDEO_FILENAME%.*}"

if [ "$ENCODING_FORMAT" = "all" ] || [ "$ENCODING_FORMAT" = "h264" ]; then
  if [ "$SIZE" = "all" ] || [ "$SIZE" = "1080p" ]; then
    echo "Encoding 1080p H264"

    ffmpeg \
      -i $SOURCE_VIDEO_PATH \
      -map_metadata -1 \
      -an \
      -c:v libx264 \
      -crf 24 \
      -preset veryslow \
      -profile:v high \
      -pix_fmt yuv420p \
      -movflags +faststart \
      -vf scale=1920:-2 \
      $OUTPUT_PATH/$FILENAME_BASE.1080p.h264.mp4
  fi

  if [ "$SIZE" = "all" ] || [ "$SIZE" = "720p" ]; then
    echo "Encoding 720p H264"

    ffmpeg \
      -i $SOURCE_VIDEO_PATH \
      -map_metadata -1 \
      -an \
      -c:v libx264 \
      -crf 24 \
      -preset veryslow \
      -profile:v high \
      -pix_fmt yuv420p \
      -movflags +faststart \
      -vf scale=1280:-2 \
      $OUTPUT_PATH/$FILENAME_BASE.720p.h264.mp4
  fi

  if [ "$SIZE" = "all" ] || [ "$SIZE" = "480p" ]; then
    echo "Encoding 480p H264"

    ffmpeg \
      -i $SOURCE_VIDEO_PATH \
      -map_metadata -1 \
      -an \
      -c:v libx264 \
      -crf 24 \
      -preset veryslow \
      -profile:v high \
      -pix_fmt yuv420p \
      -movflags +faststart \
      -vf scale=854:-2 \
      $OUTPUT_PATH/$FILENAME_BASE.480p.h264.mp4
  fi

  if [ "$SIZE" = "all" ] || [ "$SIZE" = "360p" ]; then
    echo "Encoding 360p H264"

    ffmpeg \
      -i $SOURCE_VIDEO_PATH \
      -map_metadata -1 \
      -an \
      -c:v libx264 \
      -crf 24 \
      -preset veryslow \
      -profile:v high \
      -pix_fmt yuv420p \
      -movflags +faststart \
      -vf scale=640:-2 \
      $OUTPUT_PATH/$FILENAME_BASE.360p.h264.mp4
  fi
fi

if [ "$ENCODING_FORMAT" = "all" ] || [ "$ENCODING_FORMAT" = "hevc" ]; then
  if [ "$SIZE" = "all" ] || [ "$SIZE" = "1080p" ]; then
    echo "Encoding 1080p HEVC"

    ffmpeg \
      -i $SOURCE_VIDEO_PATH \
      -map_metadata -1 \
      -an -c:v \
      libx265 \
      -crf 29 \
      -preset veryslow \
      -pix_fmt yuv420p \
      -movflags +faststart \
      -tag:v hvc1 \
      -vf scale=1920:-2 \
      $OUTPUT_PATH/$FILENAME_BASE.1080p.hevc.mp4
  fi

  if [ "$SIZE" = "all" ] || [ "$SIZE" = "720p" ]; then
    echo "Encoding 720p HEVC"

    ffmpeg \
      -i $SOURCE_VIDEO_PATH \
      -map_metadata -1 \
      -an -c:v \
      libx265 \
      -crf 29 \
      -preset veryslow \
      -pix_fmt yuv420p \
      -movflags +faststart \
      -tag:v hvc1 \
      -vf scale=1280:-2 \
      $OUTPUT_PATH/$FILENAME_BASE.720p.hevc.mp4
  fi

  if [ "$SIZE" = "all" ] || [ "$SIZE" = "480p" ]; then
    echo "Encoding 480p HEVC"

    ffmpeg \
      -i $SOURCE_VIDEO_PATH \
      -map_metadata -1 \
      -an -c:v \
      libx265 \
      -crf 29 \
      -preset veryslow \
      -pix_fmt yuv420p \
      -movflags +faststart \
      -tag:v hvc1 \
      -vf scale=854:-2 \
      $OUTPUT_PATH/$FILENAME_BASE.480p.hevc.mp4
  fi

  if [ "$SIZE" = "all" ] || [ "$SIZE" = "360p" ]; then
    echo "Encoding 360p HEVC"

    ffmpeg \
      -i $SOURCE_VIDEO_PATH \
      -map_metadata -1 \
      -an -c:v \
      libx265 \
      -crf 29 \
      -preset veryslow \
      -pix_fmt yuv420p \
      -movflags +faststart \
      -tag:v hvc1 \
      -vf scale=640:-2 \
      $OUTPUT_PATH/$FILENAME_BASE.360p.hevc.mp4
  fi
fi

if [ "$ENCODING_FORMAT" = "all" ] || [ "$ENCODING_FORMAT" = "av1" ]; then
  if [ "$SIZE" = "all" ] || [ "$SIZE" = "1080p" ]; then
    echo "Encoding 1080p AV1"

    ffmpeg \
      -i $SOURCE_VIDEO_PATH \
      -map_metadata -1 \
      -an -c:v \
      libsvtav1 \
      -crf 51 \
      -preset 0 \
      -pix_fmt yuv420p \
      -movflags +faststart \
      -vf scale=1920:-2 \
      $OUTPUT_PATH/$FILENAME_BASE.1080p.av1.mp4
  fi

  if [ "$SIZE" = "all" ] || [ "$SIZE" = "720p" ]; then
    echo "Encoding 720p AV1"

    ffmpeg \
      -i $SOURCE_VIDEO_PATH \
      -map_metadata -1 \
      -an -c:v \
      libsvtav1 \
      -crf 51 \
      -preset 0 \
      -pix_fmt yuv420p \
      -movflags +faststart \
      -vf scale=1280:-2 \
      $OUTPUT_PATH/$FILENAME_BASE.720p.av1.mp4
  fi

  if [ "$SIZE" = "all" ] || [ "$SIZE" = "480p" ]; then
    echo "Encoding 480p AV1"

    ffmpeg \
      -i $SOURCE_VIDEO_PATH \
      -map_metadata -1 \
      -an -c:v \
      libsvtav1 \
      -crf 51 \
      -preset 0 \
      -pix_fmt yuv420p \
      -movflags +faststart \
      -vf scale=854:-2 \
      $OUTPUT_PATH/$FILENAME_BASE.480p.av1.mp4
  fi

  if [ "$SIZE" = "all" ] || [ "$SIZE" = "360p" ]; then
    echo "Encoding 360p AV1"

    ffmpeg \
      -i $SOURCE_VIDEO_PATH \
      -map_metadata -1 \
      -an -c:v \
      libsvtav1 \
      -crf 51 \
      -preset 0 \
      -pix_fmt yuv420p \
      -movflags +faststart \
      -vf scale=640:-2 \
      $OUTPUT_PATH/$FILENAME_BASE.360p.av1.mp4
  fi
fi

echo
echo Done
