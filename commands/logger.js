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
		console.log(err||models);
		Chat = models.chatLog;
	});

	rosieEvent.on('rosie:message', function(chat) {

		Chat.create({
			from:chat.from,
			to:chat.to,
			message:chat.message
		}).exec(function(err,createdMessage) {
			console.log(err||createdMessage);
		});

	});

};
