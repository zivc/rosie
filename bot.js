var irc = require('irc'),
	config = require('config'),
	client = new irc.Client(
		config.team + '.irc.slack.com',
		config.user,
		{
			password: config.password,
			userName: config.user
		});

client.addListener('message', function(from, to, message) {
	console.log(from + ' => ' + to + ': ' + message);
});

client.addListener('pm', function(from, message) {
	console.log(from + ' => ' + config.user + ': ' + message);
});