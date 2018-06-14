#!/usr/bin/env bash
BASEDIR=$(dirname "$0")
cd "$BASEDIR"

git pull
rm delegated-apnic-latest && wget https://ftp.apnic.net/stats/apnic/delegated-apnic-latest
python apnic2iplist.py > ../src/ipList
cd ../src
python make.py -p "%s %s" -o ./proxy.pac -op
python update_to_server.py
git add -A
git commit -m "update"
git push