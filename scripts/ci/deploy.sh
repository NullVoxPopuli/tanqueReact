#!bin/bash
# dist should already exist.
cd dist \
  && git init \
  && git remote add github git@github.com:NullVoxPopuli/tanqueReact.git \
  && git checkout --orphan gh-pages \
  && git add . \
  && git commit -m"update gh-pages" \
  && git push github gh-pages
  
