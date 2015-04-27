# ah-chatlog-plugin

This plugin saves messages saig in actionhero chat rooms to redis.  We then expose actions to read that history. 

## Middleware

A middleware is added to store all chat messages in redis, up to the last `api.config.chatlog.massagesToKeep` messages (10000) default.

## Action

An action, `viewChatLogs` is provided to view the previous messages.  The connection must already be present in the chat room to use.  The param `room` is required, and you can specify the `start` and `end` message to return in the collection `messages`.

This makes use of the method `api.chatlog.viewMessages` to load data, which you can use elsewhere in the project. 

## Configuration

Create `./config/chatlog.js` within your project, and copy the example from this repository. 
