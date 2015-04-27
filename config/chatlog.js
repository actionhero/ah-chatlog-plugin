exports.default = {
  chatlog: function(api){
    return {
      "chatlogPrefix"  : "actionhero:chatlog", // redis key prefix
      "massagesToKeep" : 10000,                // how many messages to keep per room
      "roomsToIgnore"  : [],                   // should we not keep any message for any rooms?
    };
  }
};
