#!/bin/bash
set -ex

# dist should already exist.
mkdir -p dist

docker-compose run \
  -e ROUTER_BASE_PATH='tanqueReact/' \
  --rm web bash -c "\
  ./node_modules/.bin/webpack -d \
  --config ./config/webpack/github-pages.js"
