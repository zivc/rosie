var events = require('events'),
	eventEmitter = new events.EventEmitter(),
	config = require('../config');

module.exports = function(client,config) {

	client.addListener('message', function(from, to, message) {

		var event = 'rosie:' + message.substr(0,config.trigger.length) === config.trigger ? message.split(' ')[1] : 'message';
		eventEmitter.emit(event, {message:message, from:from, to:to});

	});

};
