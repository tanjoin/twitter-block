var fs = require('fs');

var fs = require('fs');

var data = fs.readFileSync('friend_followers.txt', 'utf8');
var excludeList = fs.readFileSync('friends.txt', 'utf8').split('\n');
var list = data.split('\n');

var filtered = list.filter(function (x, i, self) {
  return excludeList.indexOf(x) < 0;
});

fs.writeFileSync('data.txt', filtered.join('\n'), 'utf8');
