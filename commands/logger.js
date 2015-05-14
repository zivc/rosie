module.exports = function(event) {

	event.on('rosie:message', function(chat) {

		console.log('>',new Date().getTime() / 1000, chat.from, '=>', chat.to, ':', chat.message);

	});

};
