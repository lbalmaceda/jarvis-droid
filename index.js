require('dotenv').config()
var _ = require('underscore');
var providers = require('./providers');

module.exports = function(context) {
  return {
    whoIs: function(req, res) {
      var name = formatName(req.params.name);
      var userInfo = providers.slack(name);
      var message = "User not found.";
      if (userInfo) {
        message = describeUser(userInfo);
      }

      try {
        return res.text(message).send();
      } catch (e) {
        return res.text('Something\'s wrong.. I cannot answer you right now.\n```' + JSON.stringify(e) + '```').send();
      }
    },
    help: function(req, res) {
      var helpMessage = "I can give you information about a specific person. Try asking `who is @user`.";
      return res.text(helpMessage).send();
    }
  };
};

function formatName(name){
  if (name && name.charAt(0) !== '@') {
    name = '@' + name;
  }
  return name.toLowerCase();
}

function describeUser(user){
  return separator() +
    "Who is " + mdBold(user.name) + "?\n" +
    mdBold("Cask:") + " " + user.cask + "\n" +
    mdBold("Crew:") + " " +user.crew + "\n" +
    mdBold("Projects:") + " " + describeCodeArray(user.projects) + "\n" +
    separator();
}

function describeCodeArray(array){
  return _.map(array, function(item){
    return mdCode(item);
  });
}

// MarkDown Format Helper Functions
function separator(){
  return "=====================================================\n"
}

function mdBold(text){
  return "*" + text + "*";
}

function mdCode(text){
  return "`" + text + "`";
}
