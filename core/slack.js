var http = require('https'),
    chalk = require('chalk');

console.log(rosie.client);

module.exports = function(callback) {
    var config = rosie.config;

    http.get('https://slack.com/api/users.list?token='+config.slack.webApiToken, function(res) {
        var body = '';
        res.on('data', function(data) {
            body += data;
        });
        res.on('end', function() {

            var members = JSON.parse(body).members;
            console.log(chalk.green(members.length)+' slack users retrieved');

            members.forEach(function(member) {
                rosie.models.users.findOne({slackid:member.id}).exec(function(err,slackUser) {
                    if (err) throw err;

                    var userObj = {
                        slackid:member.id,
                        name:member.name,
                        real_name:member.profile.real_name,
                        real_name_normalized:member.profile.real_name_normalized,
                        email:member.profile.email,
                        image:member.profile.image_192
                    };

                    if (!slackUser) {
                        rosie.models.users.create(userObj).exec(function(){});
                    } else {
                        rosie.models.users.update(slackUser.id, userObj).exec(function(){});
                    }
                });
                return;
            });

            rosie.client.on('nick', function(oldnick, newnick) {
                rosie.models.users.update({name:oldnick}, {name:newnick}).exec(function(){});
            });

            if (callback) callback(members);

        });
    });

}
