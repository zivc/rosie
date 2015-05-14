module.exports = function(config) {

	var Chat;
	var Waterline = require('waterline');
	var orm = new Waterline();
	var mysqlAdapter = require('sails-mysql');

	var chatLog = Waterline.Collection.extend({
		identity:'chat',
		connection:'rosie',
		autoCreatedAt:true,
		autoUpdatedAt:true,
		autoPK:true,
		attributes:{
			from:{
				type:'string'
			},
			to:{
				type:'string'
			},
			message:{
				type:'string'
			}
		}
	});


	orm.loadCollection(chatLog);
	orm.initialize(config.orm, function(err, models) {
		global.Chat = models.chatLog;
	});

	rosieEvent.on('rosie:message', function(c) {

		Chat.create({
			from:c.from,
			to:c.to,
			message:c.message
		}).exec(function(err,createdMessage) {
			console.log(err||createdMessage);
		});

	});

};
