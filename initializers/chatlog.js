module.exports = {
  initialize: function(api, next){

    api.chatlog = {};

    api.chatlog.saveMessage = function(connection, room, messagePayload, callback){
      // only long messages once, on the server the chatting connection is attached to
      if(connection.id === messagePayload.from && api.config.chatlog.roomsToIgnore.indexOf(room) < 0){
        var key = api.config.chatlog.chatlogPrefix + ':' + room;
        api.redis.client.rpush(key, JSON.stringify(messagePayload), function(err){
          if(err){ return callback(err); }
          api.redis.client.ltrim(key, 0, api.config.chatlog.massagesToKeep, function(err){
            callback(err);
          });
        });
      }else{
        return callback();
      }
    };

    api.chatlog.viewMessages = function(connection, room, start, end, callback){
      if(connection.rooms.indexOf(room) > -1){
        var key = api.config.chatlog.chatlogPrefix + ':' + room;
        var results = [];
        api.redis.client.lrange(key, start, end, function(err, data){
          if(!err){
            data.forEach(function(d){ results.push(JSON.parse(d)); });
          }
          callback(err, results);
        });
      }else{
        callback( api.config.errors.connectionNotInRoom(room) );
      }
    };

    api.chatlog.clearMessage = function(room, callback){
      var key = api.config.chatlog.chatlogPrefix + ':' + room;
      api.redis.connection.del(key, callback);
    };

    api.chatRoom.addMiddleware({
      name: 'chatlog middleware',
      say: api.chatlog.saveMessage
    });

    next();
  },
};
