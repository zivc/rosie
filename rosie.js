var irc = require('irc'),
	config = require('./config'),
	client = new irc.Client(
		config.team + '.irc.slack.com',
		config.user,
		{
			password: config.password,
			userName: config.user
		});

var core = require('commands/core');
