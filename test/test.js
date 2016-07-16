function loadPAC(path) {
  var vm = require("vm");
  var fs = require("fs");
  var data = fs.readFileSync(path);
  var context = {
    dnsResolve: function(host) { return host; },
    isPlainHostName: function(host) { return false; },
    isInNet: function(ip, ipstart, ipmask) { return false; },
    shExpMatch: function(a, b) { return false; },
    console: console
  };
  vm.runInNewContext(data, context);
  return context.FindProxyForURL;
}

function ipList(repeat) {
  var iplist = [];
  for (var i = 0; i < repeat; i++) {
    var atom = Array();
    atom.push(Math.random()*256>>0);
    atom.push(Math.random()*256>>0);
    atom.push(Math.random()*256>>0);
    atom.push(Math.random()*256>>0);
    iplist.push(atom.join("."));
  }
  return iplist;
}

function speedTest(path, iplist) {
  console.log("Testing pac generated by " + path);
  var pac = loadPAC(path);
  var result = [];
  var time = process.hrtime();
  for (var i = 0; i < iplist.length; i++) {
    result.push(pac("", iplist[i]));
  }
  var diff = process.hrtime(time);
  console.log("avg: " + ((diff[0] * 1e3 + diff[1] * 1e-6) * 1e3 / iplist.length).toFixed(3) + "us");
  return result;
}

var repeat = 3000000;
iplist = ipList(repeat);

oldresult = speedTest("blackgear-mono_pac.pac", iplist);
newresult = speedTest("blackgear-mono_pac-unicode.pac", iplist);
speedTest("Leask-Flora_Pac-mod.pac", iplist);
speedTest("usufu-Flora_Pac.pac", iplist);
speedTest("yaleh-Flora_Pac.pac", iplist);

for (var i = 0; i < repeat; i++) {
  if (oldresult[i] !== newresult[i]) {
    throw "Err";
  }
}
