# tanqueRéact
React Chat

### Initial Setup

```bash
docker-compose build
```

### Running

```bash
./run
```

## Linting

Since all the packages are managed in docker's environment, you'll need to install the linter packages on your system.

```bash
# lazy install everything technique - also helpful for IDE's ESLint
yarn install --pure-lockfile
```

node_modules is already in the gitignore.

note that node_modules is not required to exist, as the app makes use of the in-docker node_modules.

The host node version should match the docker version -- so nvm is recommended.

## Testing

```bash
./run npm run test:watch # or just test (for C.I.)
```

## Dependencies

[Yarn](https://yarnpkg.com/en/), rather than npm.
 - Caching for faster dev.

```bash
./run yarn add dep-name --dev
docker-compose build
```

### Installing
```bash
./run yarn install --flat
```
forces only having one copy of a dependency.

### Check Info (e.g.: looking for bins)
```bash
./run yarn info webpack
```
