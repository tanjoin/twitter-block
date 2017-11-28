var fs = require('fs');

var fs = require('fs');

var data = fs.readFileSync('data.txt', 'utf8');
var includeList = fs.readFileSync('include.txt', 'utf8').split('\n');
var list = data.split('\n');

list = list.concat(includeList);

fs.writeFileSync('data.txt', list.join('\n'), 'utf8');
