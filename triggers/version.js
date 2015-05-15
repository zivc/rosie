module.exports = function() {
    eventEmitter.on('rosie:version', function(from, to, message) {
        rosie.client.say(to === rosie.config.slack.user ? from : to, 'Running *Rosie v'+require('../package.json').version+'* since '+rosie.uptime.toString());
    });
};
