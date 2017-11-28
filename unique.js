var fs = require('fs');

var data = fs.readFileSync('data.txt', 'utf8');
var list = data.split('\n');

var filtered = list.filter(function (x, i, self) {
  return self.indexOf(x) === i;
});

fs.writeFileSync('data.txt', filtered.join('\n'), 'utf8');
