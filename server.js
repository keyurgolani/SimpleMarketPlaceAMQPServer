var rabbitMQChannel = require('./utils/rabbitMQ');
var account_services = require('./services/account_services.js');
var sell_services = require('./services/account_services.js');

var mongoDao = require('./utils/mongoDao.js');

mongoDao.connect(function() {
	//Do nothing
});

rabbitMQChannel.createQueue('authenticate', function(ch, msg) {
	account_services.authenticate(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			//Cleanup
		});
	});
});

rabbitMQChannel.createQueue('getUser', function(ch, msg) {
	account_services.sendUser(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			//Cleanup
		});
	});
});

rabbitMQChannel.createQueue('updateLastLoggedIn', function(ch, msg) {
	account_services.updateLastLogin(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			//Cleanup
		});
	});
});

rabbitMQChannel.createQueue('register', function(ch, msg) {
	account_services.insertNewUser(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			//Cleanup
		});
	});
});

rabbitMQChannel.createQueue('checkEmailAvailability', function(ch, msg) {
	account_services.checkEmailAvailable(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			//Cleanup
		});
	});
});

rabbitMQChannel.createQueue('checkUserAvailability', function(ch, msg) {
	account_services.checkUserAvailable(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			//Cleanup
		});
	});
});

rabbitMQChannel.createQueue('conditions', function(ch, msg) {
	sell_services.sendConditions(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('categories', function(ch, msg) {
	sell_services.senndCategories(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('publishSale', function(ch, msg) {
	sell_services.publishSale(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('inactiveSale', function(ch, msg) {
	sell_services.disableSale(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});