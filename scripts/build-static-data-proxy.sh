#!/bin/bash

echo "Please enter SSCx Portal HTTP auth credentials"
echo

echo -n "user    : " && read SSCX_USER && echo
echo -n "password: " && read -s SSCX_PASSWORD && echo
echo

status_code=$(curl -u "$SSCX_USER:$SSCX_PASSWORD" --write-out %{http_code} --silent --output /dev/null https://bbp.epfl.ch/sscx-portal/)

if [[ "$status_code" -ne 200 ]] ; then
  echo "The Portal returned HTTP status $status_code, please check if supplied credentials are valid"
  exit 1
else
  echo "Supplied credentials seem to be valid"
  echo "Building docker image"
  echo

  docker build \
    --build-arg AUTH_HEADER_ARG="Basic $(echo -n "$SSCX_USER:$SSCX_PASSWORD" | base64)" \
    -f Dockerfile.static-data-proxy \
    -t sscx-static-data-proxy .

  echo "Done"
  echo
  echo "Now you can start the proxy with 'npm run start-static-data-proxy'"
fi
