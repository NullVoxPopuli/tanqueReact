#!/bin/bash
# dist should already exist.
docker-compose run \
  -e ROUTER_BASE_PATH='tanqueReact/' \
  --rm web bash -c "\
  ./node_modules/.bin/webpack -d \
  --config ./config/webpack/github-pages.js"

cd dist \
  && git init \
  && git remote add github git@github.com:NullVoxPopuli/tanqueReact.git

  # already in dist
  git checkout --orphan gh-pages
  git checkout gh-pages

  # already in dist, and already on gh-pages
  git add . \
  && git commit -m"update gh-pages" \
  && git push github gh-pages -f
