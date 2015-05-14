var events = require('events'),
	eventEmitter = new events.EventEmitter();

module.exports = function(client,config) {

	client.addListener('message', function(from, to, message) {

		var event = 'rosie:' + message.substr(0,config.bot.trigger.length) === config.bot.trigger ? message.split(' ')[1] : 'message';
		console.log(event, {message:message, from:from, to:to});
		eventEmitter.emit(event, {message:message, from:from, to:to});

	});

};
