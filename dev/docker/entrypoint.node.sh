#!/bin/sh

set -e

npm config set unsafe-perm true && npm install --no-audit
npm rebuild node-sass

SHELL=/bin/sh exec npm run watch
