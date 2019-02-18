#!/usr/bin/env bash
set -ex

DIR_EBOOKMAPPER=~/personal/ebook-page-mapper
DIR_EBOOKMAPPER_DIST=~/personal/ebook-page-mapper/dist/ebook-page-mapper
DIR_EBOOKMAPPER_GHPAGES=~/personal/ebook-page-mapper.gh-pages

cd $DIR_EBOOKMAPPER
npx ng build --prod --base-href "https://prendradjaja.github.io/ebook-page-mapper/"

rm -f $DIR_EBOOKMAPPER_GHPAGES/*
cp $DIR_EBOOKMAPPER_DIST/* $DIR_EBOOKMAPPER_GHPAGES

set +x

echo
echo Done. Now:
echo - cd to $DIR_EBOOKMAPPER_GHPAGES
echo - commit and push
