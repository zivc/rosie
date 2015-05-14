module.exports = {
	slack:{
		team:'',
		user:'',
		password:'',
		channels:['*'],
		webApiToken:''
	},
	bot: {
		admins:['ash'],
		trigger:'@rosie'
	},
	orm:{
		host:'localhost',
		user:'root',
		password:'',
		database:'rosie',
		adapter:'sails-mysql'
	}
};
