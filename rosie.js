var irc = require('irc'),
	config = require('./config'),
	events = require('events'),
	eventEmitter = new events.EventEmitter(),
	waterline = require('waterline'),
	client = new irc.Client(
		config.slack.team + '.irc.slack.com',
		config.slack.user,
		{
			password: config.slack.password,
			userName: config.slack.user
		}),
	core = require('./commands/core')(client, config, eventEmitter);

global.rosieEvent = eventEmitter;
global.rosieOrm = waterline;

require('./commands/logger')(config);
