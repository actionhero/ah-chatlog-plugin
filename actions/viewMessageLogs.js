exports.viewChatLogs = {
  name: 'viewChatLogs',
  description: 'I return saved messages for chat rooms',
  outputExample: {
    messages: [
      { 
        context: "user",
        from: "8c3a6f3b-bcf9-4686-a24f-a881d22140de",
        message: "message 1",
        room: "defaultRoom",
        sentAt: 1430130325318,
      },
      { 
        context: "user",
        from: "8c3a6f3b-bcf9-4686-a24f-a881d22140de",
        message: "message 2",
        room: "defaultRoom",
        sentAt: 1430130325320,
      },
    ]
  },

  inputs: {
    room: { 
      required: true,
      formatter: function(s){ return String(s); }
    },
    start: {
      required: false,
      default: function(){ return 0; },
      formatter: function(s){ return parseInt(s); }
    },
    stop: {
      required: false,
      default: function(){ return -1; },
      formatter: function(s){ return parseInt(s); }
    }
  },

  run: function(api, data, next){
    if(data.params.stop < 0){ data.params.stop = api.config.chatlog.massagesToKeep; }

    api.chatlog.viewMessages(
      data.connection, 
      data.params.room, 
      data.params.start, 
      data.params.stop, 
      function(err, messages){
        data.response.messages = messages;
        next(err);
      }
    );
  }

};