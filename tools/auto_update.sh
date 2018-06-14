#!/usr/bin/env bash
rm delegated-apnic-latest && wget https://ftp.apnic.net/stats/apnic/delegated-apnic-latest
python apnic2iplist.py > ../src/ipList
cd ../src
python make.py -p "%s %s" -o ./proxy.pac -op
python update_to_server.py