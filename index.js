var Twitter = require('twitter');
var Config = require('./config.json');
var client = new Twitter(Config);
var fs = require('fs');
var sleep = require('sleep');

if (false) {
  fs.writeFileSync('136.txt', "", "utf8", (err) => console.log(err));
  fs.writeFileSync('401.txt', "", "utf8", (err) => console.log(err));
  fs.writeFileSync('404.txt', "", "utf8", (err) => console.log(err));
}

var explorer = function(i, max, users) {
  if (i > max) {
    return;
  }
  console.log(users[i]);
  var params = {screen_name: users[i]};
  client.get('statuses/user_timeline', params, function(error, user, response) {
    if (!response || !response.statusCode) {
      console.log(" > " + JSON.stringify(response, null, 2));
      explorer(i, max, users);
      return;
    } else if (response.statusCode === 429) {
      var limit = 1 * (response.headers['x-rate-limit-limit'] + 1);
      var date = new Date(parseInt(response.headers['x-rate-limit-reset']));
      console.log("limit: " + response.headers['x-rate-limit-limit'] + ", reset: " + response.headers['x-rate-limit-reset']);
      console.log(" [Sleep]" + date.toLocaleDateString() + " " + date.toLocaleTimeString())
      sleep.sleep(limit);
    } else if (response.statusCode === 401) {
      fs.appendFileSync('401.txt', params.screen_name + "\n");
    } else if (response.statusCode === 404) {
      fs.appendFileSync('404.txt', params.screen_name + "\n");
    } else if (response.statusCode >= 300) {
      console.log(" >> " + JSON.stringify(response, null, 2));
    }
    if (error) {
      console.log(" >>> " + JSON.stringify(error, null, 2));
      if (error.code && error.code === 136) {
        fs.appendFileSync('136.txt', params.screen_name + "\n");
      } else if (error[0] && error[0].code && error[0].code === 136) {
        fs.appendFileSync('136.txt', params.screen_name + "\n");
      }
    }
    explorer(i+1, max, users);
  });
}

var list = fs.readFileSync('data4.txt', 'utf8');
list = list.split('\n');
explorer(0, list.length, list);
