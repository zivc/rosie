/****************************************************

O)))))))        O))))       O)) O)  O))O))))))))
O))    O))    O))    O))  O))    O))O))O))
O))    O))  O))        O)) O))      O))O))
O) O))      O))        O))   O))    O))O))))))
O))  O))    O))        O))      O)) O))O))
O))    O))    O))     O)) O))    O))O))O))
O))      O))    O))))       O)) O)  O))O))))))))

Copy config.sample.js to config.js and fill it out
then type `node rosie.js` to run

****************************************************

Don't change anything beyond here fam

***************************************************/

var chalk = require('chalk'),
    irc = require('irc'),
    events = require('events'),
    eventEmitter = global.eventEmitter = new events.EventEmitter,
    package = require('./package.json'),
    Q = global.Q = require('q'),
    NOOP = function(){};

try {
    var config = require('./config');
} catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') return console.log(chalk.red('No config.js file found! Did you even read the README.md????'));
}

console.log('   ___  ____  ____________')
console.log('  / _ \\/ __ \\/ __/  _/ __/')
console.log(' / , _/ /_/ /\\ \\_/ // _/  ')
console.log('/_/|_|\\____/___/___/___/  v'+package.version);

process.chdir(__dirname);

global.rosie = {
    version:package.version,
    uptime:new Date(),
    config:config
};

(function() {
    var deferred = Q.defer();
    require('./core/models').initialize(config.orm, function(err, models) {
        if (err) throw err;
        global.rosie.models = models.collections;
        console.log(chalk.green(Object.keys(models).length)+' models loaded');
        deferred.resolve();
    });
    return deferred.promise;
}())
.done(function() {
    client = global.rosie.client = new irc.Client(
        config.slack.team + '.irc.slack.com',
        config.slack.user,
        {
            password: config.slack.password,
            userName: config.slack.user,
            autoConnect:false
        });

    console.log('Connecting to Slack...');
    client.connect(999, function() {
        eventEmitter.emit('rosie:connect');
        console.log(chalk.green('Connected!'));
    });

    /* Raw logger */
    if (config.logging.raw === true) client.addListener('raw', function(message) {
        global.rosie.models.raw.create(message).exec(NOOP);
    });

    client.addListener('message', function(from, to, message) {

        var eventName = 'message';

        if (message.substr(0,config.bot.trigger.length) === config.bot.trigger) eventName = message.split(' ')[1];
        if (to === config.slack.user) eventName = message.split(' ')[0];
        if (!from) from = arguments[3].prefix.split('!')[0].replace('_', ' ');

        if (config.logging.chat === true) global.rosie.models.chat.create({from:from, to:to, message:message});
        eventEmitter.emit('rosie:'+eventName, from, to, eventName === 'message' ? message : (message||'').substr(eventName.length).trim());
    });

    require('./triggers/version')();

});



// global.rosie = rosie = {
//     waterline:new require('waterline')(),
//     models:require('./core/models')()
// };

// 	client = new irc.Client(
// 		config.slack.team + '.irc.slack.com',
// 		config.slack.user,
// 		{
// 			password: config.slack.password,
// 			userName: config.slack.user
// 		}),
// 	core = require('./commands/core')(client, config, eventEmitter);

// global.rosieEvent = eventEmitter;
// global.rosieOrm = waterline;

// require('./commands/logger')(config);
