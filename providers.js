var _ = require("underscore");

module.exports = {};
module.exports.slack = new function(username){
  var token = process.env.SLACK_TOKEN;
  var WebClient = require('@slack/client').WebClient;
  var client = new WebClient(token);

  client.users.list(null, function usersCb(err, res) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Team Info:', res.members);
      var user = findUser(res.members, username);
      return parseSlackProfile(user);
    }
  });
}

module.exports.json = new function(username){
  var usersData = require('./users_data');
  return usersData[name];
}

function findUser(users, username){
  return _.findWhere(users, {name: username});
}

function parseSlackProfile(user){
  if (!user){
    return "User not found.";
  }
  return "The slack profile for this user says: \n" + user;
}
