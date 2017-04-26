#!/bin/sh

# use user input, otherwise analyze
command="analyze -f html ./js > codeclimate.html"
passed_command="$*"
if [ ! -z "$passed_command" ]; then
  command=$passed_command
fi

echo "Running: codeclimate $command"

# actually run the command
 sh -c "docker run \
  --rm \
  --env CODECLIMATE_CODE="$PWD" \
  --volume "$PWD":/code \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  --volume /tmp/cc:/tmp/cc \
  codeclimate/codeclimate $command"
