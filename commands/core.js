module.exports = function(client,config,event) {

	client.addListener('message', function(from, to, message) {

		var eventName = 'rosie:' + message.substr(0,config.bot.trigger.length) === config.bot.trigger ? message.split(' ')[1] : 'message';
		event.emit(eventName, {message:message, from:from, to:to});

		console.log(eventName, {message:message, from:from, to:to});

	});

};
