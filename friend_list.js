#!/usr/bin/env node
var Twitter = require('twitter');
var Config = require('./config.json');
var client = new Twitter(Config);
var fs = require('fs');
var sleep = require('sleep');
var argv = require('optimist')
    .usage('node friend_list.js --clear --inpput hoge.txt')
    .default('input', 'data.txt')
    .default('clear', false)
    .argv;

if (argv.clear) {
  fs.writeFileSync('friends.txt', "", "utf8", (err) => console.log(err));
}

var explorer = function(next_cursor) {
  var params = {count:200};
  if (next_cursor) {
    params['cursor'] = next_cursor;
  }
  client.get('friends/list', params, function(error, data, response) {
    if (!response || !response.statusCode) {
      console.log(" > " + JSON.stringify(response, null, 2));
      explorer(next_cursor);
      return;
    } else if (response.statusCode === 429) {
      var limit = 1 * (response.headers['x-rate-limit-limit'] + 1);
      var now = new Date();
      var date = new Date(parseInt(response.headers['x-rate-limit-reset']) * 1000);
      console.log("limit: " + response.headers['x-rate-limit-limit'] + ", reset: " + response.headers['x-rate-limit-reset']);
      console.log(" [Sleep] " + now.toLocaleDateString() + " " + now.toLocaleTimeString() + " => " + date.toLocaleDateString() + " " + date.toLocaleTimeString())
      sleep.sleep(limit);
      explorer(next_cursor);
      return;
    }

    var list = data.users.map((user) => user.screen_name);
    for (var i = 0; i < list.length; i++) {
      console.log(list[i]);
      fs.appendFileSync('friends.txt', list[i] + "\n", 'utf8');
    }
    if (data.next_cursor) {
      explorer(data.next_cursor);
    }
  });
}

explorer();
