# server open source https://github.com/lbp0200/prc-net-tool
import requests

with open('proxy.pac', 'r') as pac_file:
    headers = {'pwd': '123'}
    resp = requests.post('https://prudent-travels.000webhostapp.com/pac.php', pac_file.read(), headers=headers)
    print(resp.text)
