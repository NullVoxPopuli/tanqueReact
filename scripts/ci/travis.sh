if [ "$TRAVIS_BRANCH" == "master" ] && [ $TRAVIS_PULL_REQUEST == "false" ]; then
  # We only care about publishing on master...
  echo "Preparing Deploy"

  cp ./scripts/ci/travis-id_rsa.enc ./
  openssl aes-256-cbc -K $encrypted_bee6fd901ba1_key -iv $encrypted_bee6fd901ba1_iv -in travis-id_rsa.enc -out travis-id_rsa -d
  chmod 600 travis-id_rsa
  cp travis-id_rsa $HOME/.ssh/id_rsa

  echo "Deploying the 'master' branch..."

  ./scripts/ci/deploy.sh;

  echo "Deployed!"
 else
  echo "Building..."

  ./scripts/ci/transpile.sh;
 fi
