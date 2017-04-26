FROM node:7


# Make sure yarn is installed, and that we have a directory to put the code.
RUN \
  curl -o- -L https://yarnpkg.com/install.sh | bash && \
  echo $(yarn --version) && \
  mkdir -p /src/app

WORKDIR /src/app
ADD package.json /src/app
# ADD yarn.lock /src/app

RUN $HOME/.yarn/bin/yarn install --pure-lockfile

CMD ["npm", "run", "dev"]
