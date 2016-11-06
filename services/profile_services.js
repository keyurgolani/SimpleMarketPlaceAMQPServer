var mongoDao = require('../utils/mongoDao');
var logger = require('../utils/logger');

module.exports.sendUserSold = function(payload, callback) {
	mongoDao.fetch('TransactionDetails', {
		'item.seller_id'	:	payload.user_id
	}, function(resultDoc) {
		callback({
			'soldItems'	:	resultDoc
		});
	});
}

module.exports.sendUserBought = function(payload, callback) {
	mongoDao.fetch('TransactionDetails', {
		'buyer'	:	payload.user_id
	}, function(resultDoc) {
		callback({
			'soldItems'	:	resultDoc
		});
	});
}

module.exports.sendUserSale = function(payload, callback) {
	mongoDao.fetch('SaleDetails', {
		'seller_id'	:	payload.user_id
	}, function(resultDoc) {
		callback({
			'saleItems'	:	resultDoc
		});
	});
}

module.exports.updateContact = function(payload, callback) {
	mongoDao.update('UserDetails', {
		'user'	:	payload.user_id
	}, {
		$set	:	{
			'contact'	:	payload.contact
		}
	}, function(resultDoc) {
		callback({
			'contact'		:	payload.contact
		});
	});
}

module.exports.updateDOB = function(payload, callback) {
	mongoDao.update('UserDetails', {
		'user'	:	payload.user_id
	}, {
		$set	:	{
			'dob'	:	payload.dob
		}
	}, function(resultDoc) {
		callback({
			'dob'		:	payload.dob
		});
	});
}

module.exports.addAddress = function(payload, callback) {
	mongoDao.fetchOne('UserDetails', {
		'_id'	:	payload.user_id
	}, function(resultDoc) {
		mongoDao.update('UserDetails', {
			'_id'	:	payload.user_id
		}, {
			$push	:	{
				'addresses'	:	payload.address
			}
		}, function(resultDoc) {
			callback({
				'status_code'	:	200
			});
		});
	});
}

module.exports.sendProfile = function(payload, callback) {
	mongoDao.fetchOne('UserDetails', {
		'username'	:	payload.user_name
	}, function(resultDoc) {
		callback({
			'user_profile'	:	resultDoc
		});
	});
}