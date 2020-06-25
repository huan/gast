#!/bin/sh
#
#
#
#
#
#

GIT_STATUS=$(git status -s | wc -l)

[ "$1" = "force" ] && GIT_STATUS=0

[ "$2" = "tests" ] && PUSH_TESTS=1

[ "$GIT_STATUS" -gt 0 ] && {
  git status
  echo
  echo "##################################################"
  echo "there's local changes in git not commited(pushed)!"
  echo "##################################################"
  echo
  echo "run 'git commit -a' to fix it. (also suggest to run a 'git push' after that)"
  echo
  exit
}

BASE_DIR=$(
  cd "$(dirname "$0")"
  pwd
)

CLASP_CONFIG="$BASE_DIR/../.clasp.json"

[ -e $CLASP_CONFIG ] || {
  echo "CLASP_CONFIG not found!"
  exit 255
}

scriptId=$(grep scriptId "$CLASP_CONFIG" | cut -d'"' -f4)
[ -n "$scriptId" ] || {
  echo "scriptId not found!"
  exit 255
}

#
#
#
echo -n "Start pulling GAS script id: $scriptId from google drive... "

cd "$BASE_DIR/.."

# Clear dist
rm -rf "./dist"
mkdir "./dist"

# Copy the manifest to dist
cp -f ./src/appsscript.json ./dist

# Wrap and copy the source file to dist
str="\/\*\* gas-tap-lib.js \*\*\/"
sed -e "/$str/r ./src/gas-tap-lib.js" -e "/$str/d" ./src/wrapper.js >./dist/gas-tap-lib.js

# Does it copy the tests file?
[ "$PUSH_TESTS" = "1" ] && cp -f ./src/gast-tests.js ./dist

# Push to the project
npx clasp push

#
#
#
echo "Done."
