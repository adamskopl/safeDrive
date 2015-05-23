#!/bin/bash

MIN_FILE="./safedrive.combined.js"

echo "removing $MIN_FILE"
rm $MIN_FILE

echo "include constants file (it has to be first)"
cat ./src/constants.js >> $MIN_FILE

echo "including *.js files (except those included first) from 'src' in minify.js" 
find src -iname "*.js" ! -iname "constants.js" -exec cat {} >> $MIN_FILE \;
