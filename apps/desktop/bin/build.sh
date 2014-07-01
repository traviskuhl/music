#!/bin/bash


rm app.nw

node bin/compile.js

cd src/

zip -rq  app.nw *

mv app.nw ../

cd ../

/Users/kuhl/Applications/node-webkit.app/Contents/MacOS/node-webkit app.nw