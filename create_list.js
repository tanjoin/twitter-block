var Nightmare = require('nightmare');
var fs = require('fs');

var explorer = function(i, length) {
  console.log(i);
  if (i > length) {
    return
  }
  var nightmare = Nightmare({ show: false });
  nightmare
    .goto('$url$')
    .wait(1000)
    .evaluate(function () {
      var hoge = document.getElementsByClassName('$class name$');
      var list = [];
      for (var i = 0; i < hoge.length; i++) {
        list.push('$...$');
      }
      return list;
    })
    .end()
    .then(function (result) {
      var text = "";
      for (var j = 0; j < result.length; j++) {
        text += result[j] + "\n";
      }
      fs.appendFileSync("data.txt", text, 'utf8', (err) => console.log(err));
      explorer(i + 1);
    })
    .catch(function (error) {
      console.error('Search failed:', error);
    });
}

fs.writeFileSync("data.txt", "", 'utf8', (err) => console.log(err));
explorer(1, 20);
