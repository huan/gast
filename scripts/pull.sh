#!/bin/sh
#
#
#
#
#
#

GIT_STATUS=$( git status -s | wc -l )

[ "$1" = "force" ] && GIT_STATUS=0

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

BASE_DIR=$(cd "$(dirname "$0")"; pwd)

CLASP_CONFIG="$BASE_DIR/../.clasp.json"
CLASP_CMD="$BASE_DIR/../node_modules/.bin/clasp"

[ -e $CLASP_CONFIG ] || {
  echo "CLASP_CONFIG not found!"
  exit 255
}

[ -e $CLASP_CMD ] || {
  echo "CLASP_CMD not exist!"
  echo "npm install first"
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

mv -f "$CLASP_CONFIG" "${CLASP_CONFIG}.bak"

cd "$BASE_DIR/.."
$CLASP_CMD

#
#
#
echo "Done."


#
# Remove .gitignore files in src
#
echo -n "Removing useless files in src directory... "
path=$(grep path "$CLASP_CONFIG" | cut -d'"' -f4)
[ -n "$path" ] || {
  echo "path not found!"
  exit 255
}

for uselessFile in $( cat $BASE_DIR/../$path/.gitignore ); do
  echo -n " $uselessFile "
  rm -f $BASE_DIR/../$path/$uselessFile
done

echo "Done."


echo


