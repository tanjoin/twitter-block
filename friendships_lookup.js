#!/usr/bin/env node
var Twitter = require('twitter');
var Config = require('./config.json');
var client = new Twitter(Config);
var fs = require('fs');
var sleep = require('sleep');
var argv = require('optimist')
    .usage('node friend_list.js --clear --inpput hoge.txt')
    .default('input', 'data.txt')
    .default('output', 'friendships.txt')
    .default('clear', false)
    .argv;

var max_count = 100;

if (argv.clear) {
  fs.writeFileSync(argv.output, "", "utf8", (err) => console.log(err));
}

var explorer = function(index, list) {
  var params = {screen_name: list.slice(index, index + max_count).join() };
  client.get('friendships/lookup', params, function(error, data, response) {
    if (!response || !response.statusCode) {
      console.log(" > " + JSON.stringify(response, null, 2));
      explorer(index, list);
      return;
    } else if (response.statusCode === 429) {
      var limit = 1 * (response.headers['x-rate-limit-limit'] + 1);
      var date = new Date(parseInt(response.headers['x-rate-limit-reset']));
      console.log("limit: " + response.headers['x-rate-limit-limit'] + ", reset: " + response.headers['x-rate-limit-reset']);
      console.log(" [Sleep]" + date.toLocaleDateString() + " " + date.toLocaleTimeString())
      sleep.sleep(limit);
      explorer(next_cursor);
      return;
    }
    var list = data;
    for (var i = 0; i < list.length; i++) {
      fs.appendFileSync(argv.output, JSON.stringify(list[i]) + "\n", 'utf8');
    }
    if (index < list.count) {
      explorer(index + max_count, list);
    }
  });
}

explorer(0, fs.readFileSync(argv.input, 'utf8').split('\n'));
