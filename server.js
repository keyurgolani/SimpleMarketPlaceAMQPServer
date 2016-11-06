var rabbitMQChannel = require('./utils/rabbitMQ');
var account_services = require('./services/account_services.js');
var sell_services = require('./services/sell_services.js');
var item_services = require('./services/item_services.js');
var homepage_services = require('./services/homepage_services.js');
var cart_services = require('./services/cart_services.js');
var profile_services = require('./services/profile_services.js');

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
	sell_services.sendCategories(JSON.parse(msg.content.toString()), function(payload) {
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

rabbitMQChannel.createQueue('bidEndProcess', function(ch, msg) {
	sell_services.bidEnd(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('sendBidDetails', function(ch, msg) {
	item_services.sendBidDetails(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('sendItemDetails', function(ch, msg) {
	item_services.sendItemDetails(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('placeBid', function(ch, msg) {
	item_services.placeBid(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('addToCart', function(ch, msg) {
	item_services.addToCart(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('sendSold', function(ch, msg) {
	item_services.sendSold(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('addToSuggestion', function(ch, msg) {
	item_services.addToSuggestion(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('search', function(ch, msg) {
	homepage_services.search(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('sendListing', function(ch, msg) {
	homepage_services.sendListing(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('checkout', function(ch, msg) {
	cart_services.checkout(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('cartAvailability', function(ch, msg) {
	cart_services.cartAvailability(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('removeFromCart', function(ch, msg) {
	cart_services.removeFromCart(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('userSold', function(ch, msg) {
	profile_services.sendUserSold(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('userBought', function(ch, msg) {
	profile_services.sendUserBought(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('userSale', function(ch, msg) {
	profile_services.sendUserSale(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('updateUserContact', function(ch, msg) {
	profile_services.updateContact(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('updateUserDOB', function(ch, msg) {
	profile_services.updateDOB(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('addAddress', function(ch, msg) {
	profile_services.addAddress(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});

rabbitMQChannel.createQueue('sendUserProfile', function(ch, msg) {
	profile_services.sendProfile(JSON.parse(msg.content.toString()), function(payload) {
		rabbitMQChannel.reply(payload, msg, ch, function() {
			// Cleanup
		});
	});
});