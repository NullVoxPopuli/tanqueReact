if [ "$TRAVIS_BRANCH" == "master" ] && [ $TRAVIS_PULL_REQUEST == "false" ]; then
   echo "Deploying the 'master' branch..."
   ./scripts/ci/deploy.sh;
 else
   echo "Building..."
   ./scripts/ci/transpile.sh;
 fi
