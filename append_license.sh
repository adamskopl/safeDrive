#!/bin/bash

# script appending license.txt to the safedrive.min.js
{ echo -n "$(cat license.txt)"; cat ./safedrive.min.js; } > safedrive.min.js.new
mv safedrive.min.js.new safedrive.min.js
