var mongoDao = require('../utils/mongoDao');
var logger = require('../utils/logger');

module.exports.sendBidDetails = function(payload, callback) {
	mongoDao.fetchOne('SaleDetails', {
		'sale_id' : payload.sale_id
	}, function(resultDoc) {
		var bidEnd = Math.abs(resultDoc.sale_time + 345600000);
		callback({
			"bids"		:	resultDoc.bids,
			"bidEndTime"	:	bidEnd
		});
	});
}

module.exports.sendItemDetails = function(payload, callback) {
	mongoDao.fetchOne('SaleDetails', {
		'_id' : payload.sale_id
	}, function(resultDoc) {
		console.log(resultDoc);
		var bidEnd = Math.abs(resultDoc.sale_time + 345600000);
		if(!resultDoc.active) {
			callback({
				"item"		:	{},
				"futureTime"	:	null
			});
		} else {
			callback({
				"item"		:	resultDoc,
				"futureTime"	:	bidEnd
			});
		}
	});
}

module.exports.placeBid = function(payload, callback) {
	mongoDao.fetchOne('SaleDetails', {
		'_id' : payload.item_id
	}, function(resultDoc) {
		if(payload.bid_price > Number(resultDoc.sale_price)) {
			mongoDao.update('SaleDetails', {
				'_id' : payload.item_id
			}, {
				$push : {
					'bids' : {
						"bidder_id"		:	payload.user_id,
						"bidder"		:	payload.username,
						"bid_amount"	:	payload.bid_price,
						"bid_qty"		:	payload.bid_qty
					}
				},
				$set : {
					'sale_price'	:	payload.bid_price
				}
			}, function(resultDoc) {
				logger.logBid(payload.user_id, payload.item_id, payload.bid_price, payload.bid_qty);
				callback({
					"status_code"	:	200
				});
			});
		} else {
			callback({
				"status_code"	:	409
			});
		}
	});
}

module.exports.addToCart = function(payload, callback) {
	mongoDao.fetch('UserDetails', {
		'_id'		:	payload.user_id,
	}, function(resultDoc) {
		mongoDao.update('UserDetails', {
			'_id'	:	payload.user_id
		}, {
			$push : {
				'cart' : payload.item
			}
		}, function(resultDoc) {
			logger.logUserCartEntry(payload.user_id, payload.item._id, payload.qty, payload.item.sale_price);
			callback({
				"status_code"	:	200
			});
		});
	});
}

module.exports.sendSold = function(payload, callback) {
	mongoDao.fetch('TransactionDetails', {
		'item._id'	:	payload.item_id
	}, function(resultDoc) {
		callback({
			"total_sold" : resultDoc.length
		});
	});
}

module.exports.addToSuggestion = function(payload, callback) {
	mongoDao.fetchOne('SaleDetails', {
		'_id'	:	payload.item_id
	}, function(item) {
		mongoDao.update('UserDetails', {
			'_id'	:	payload.user_id
		}, {
			$push : {
				'suggestions' : item
			}
		}, function(resultDoc) {
			callback({
				'item' : item
			});
		});
	})
}