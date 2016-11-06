var mongoDao = require('../utils/mongoDao');
var logger = require('../utils/logger');

module.exports.sendConditions = function(payload, callback) {
	mongoDao.fetch('Conditions', {}, function(resultDoc) {
		callback({
			'conditions'	:	resultDoc
		});
	});
}

module.exports.sendCategories = function(payload, callback) {
	mongoDao.fetch('Categories', {}, function(resultDoc) {
		callback({
			'categories'	:	resultDoc
		});
	});
}

module.exports.publishSale = function(payload, callback) {
	mongoDao.insert('SaleDetails', payload, function(insertResult) {
		if(insertResult.insertedCount === 1) {
			callback({
				'success'	:	true,
				'inserted_sale'	:	insertResult.insertedIds[0]
			});
		} else {
			callback({
				'success'	:	false
			});
		}
	});
}

module.exports.bidEnd = function(payload, callback) {
	mongoDao.update('SaleDetails', {
		'_id' : payload.sale_id
	}, {
		$set : {
			'active' : false
		}
	}, function(resultDoc) {
		mongoDao.fetchOne('SaleDetails', {
			'_id' : payload.sale_id
		}, function(resultDoc) {
			if(resultDoc.bids.length !== 0) {
				resultDoc.bids.sort(function(a, b) {
					return a.bid_price - b.bid_price;
				});
				mongoDao.update('SaleDetails', {
					'_id' : payload.sale_id
				}, {
					$inc : {
						'sale_qty' : -resultDoc.bids[0].bid_qty
					}
				}, function(resultDoc) {
					mongoDao.insert('TransactionDetails', {
						'sale'				:	payload.sale_id,
						'buyer'				:	resultDoc.bids[0].bidder,
						'transaction_price'	:	resultDoc.bids[0].bid_amount,
						'txn_qty'			:	resultDoc.bids[0].bid_qty
					}, function(resultDoc) {
						if(resultDoc.insertedCount === 1) {
							mongoDao.insert('NotificationDetails', {
								'notification_text'	:	'Your highest bid won! You purchased ' + title,
								'user_id'			:	resultDoc.bids[0].bidder
							}, function(resultDoc) {
								// Do nothing
							});
						}
					});
				});
			}
		});
	});
}