#!/bin/bash

function finish {
  docker-compose -f docker-compose.yml down --remove-orphans
}
trap "finish $1" EXIT

docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml run --rm web npm test
