var fs = require('fs');

var data = fs.readFileSync('friend_followers.txt', 'utf8');
var list = data.split('\n');

var filtered = list.filter(function (x, i, self) {
  return self.indexOf(x) === i;
});

fs.writeFileSync('friend_followers.txt', filtered.join('\n'), 'utf8');
