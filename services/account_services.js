var mongoDao = require('../utils/mongoDao');
var logger = require('../utils/logger');
var bcrypt = require("bcrypt");

module.exports.authenticate = function (payload, callback) {
	mongoDao.fetchOne('UserDetails', {
		'$or': [{
			'username' : payload.username
		},{
			'email' : payload.username
		}]
	}, function(resultDoc) {
		if(resultDoc) {
			if(bcrypt.hashSync(payload.password, resultDoc.salt) === resultDoc.secret) {
				callback({
					'valid' : true,
					'userid' : resultDoc._id
				});
			} else {
				callback({
					'valid' : false
				});
			}
		} else {
			callback({
				'valid' : false
			});
		}
	});
}

module.exports.sendUser = function(payload, callback) {
	mongoDao.fetchOne('UserDetails', {
		'_id' : payload.userid
	}, function(resultDoc) {
		callback(resultDoc);
	});
}

module.exports.updateLastLogin = function(payload, callback) {
	mongoDao.update('UserDetails', {
		'_id'		:	payload.userid
	}, {
		$set : {
			'last_login':	require('fecha').format(Date.now(),'YYYY-MM-DD HH:mm:ss')
		}
	}, function(updateResult) {
		if(updateResult.result.nModified === 1) {
			callback({
				'success' : true
			});
		} else {
			callback({
				'success' : false
			})
		}
	});
}

module.exports.insertNewUser = function(payload, callback) {
	mongoDao.insert('UserDetails', payload, function(resultDoc) {
		if(resultDoc.insertedCount === 1) {
			callback({
				'success' : true
			});
		} else {
			callback({
				'success' : false
			});
		}
	});
}

module.exports.checkEmailAvailable = function(payload, callback) {
	mongoDao.fetchOne('UserDetails', {
		'email' : payload.email
	}, function(resultDoc) {
		if(resultDoc) {
			callback({
				'available' : false
			});
		} else {
			callback({
				'available' : true
			});
		}
	});
}

module.exports.checkUserAvailable = function(payload, callback) {
	mongoDao.fetchOne('UserDetails', {
		'username' : payload.username
	}, function(resultDoc) {
		if(resultDoc) {
			callback({
				'available' : false
			});
		} else {
			callback({
				'available' : true
			});
		}
	});
}