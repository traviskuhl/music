#!/bin/bash
#

VERSION="0.1"
ECHO="VERSION "

echo $ECHO$VERSION

node bin/compile.js

rm -rf builds/$VERSION

mkdir -p builds/$VERSION

cp -r builds/osx/* builds/$VERSION

mkdir -p builds/$VERSION/node-webkit.app/Contents/Resources/app.nw/

cp -r src/* builds/$VERSION/node-webkit.app/Contents/Resources/app.nw/

mv builds/$VERSION/node-webkit.app builds/$VERSION/Music.app

echo "DONE!";