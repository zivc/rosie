var irc = require('irc'),
	config = require('./config'),
	client = new irc.Client(
		config.slack.team + '.irc.slack.com',
		config.slack.user,
		{
			password: config.slack.password,
			userName: config.slack.user
		}),
	core = require('./commands/core')(client);
