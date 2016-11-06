var mongoDao = require('../utils/mongoDao');
var logger = require('../utils/logger');

module.exports.search = function(payload, callback) {
	if(payload.user_id) {
		mongoDao.fetch('SaleDetails', {
			'$or': [{
				'title' : {
					'$regex' : payload.search_string,
					'$options' : 'i'
				},
				'seller_id' : {
					'$ne' : payload.user_id
				}
			},{
				'seller' : payload.search_string,
				'seller_id' : {
					'$ne' : payload.user_id
				}
			}]
		}, function(resultDoc) {
			callback({
				'saleDetails'	:	resultDoc
			});
		});
	} else {
		mongoDao.fetch('SaleDetails', {
			'$or': [{
				'title' : {
					'$regex' : payload.search_string, '$options' : 'i'
				}
			},{
				'seller' : payload.search_string
			}]
		}, function(resultDoc) {
			callback({
				'saleDetails'	:	resultDoc
			});
		});
	}
}

module.exports.sendListing = function(payload, callback) {
	if(payload.user_id){
		mongoDao.fetch('SaleDetails', {
			'seller_id' : {
				'$ne' : payload.user_id
			}
		}, function(resultDoc) {
			callback({
				'saleDetails'	:	resultDoc
			});
		});
	} else {
		mongoDao.fetch('SaleDetails', {}, function(resultDoc) {
			callback({
				'saleDetails'	:	resultDoc
			});
		});
	}
}