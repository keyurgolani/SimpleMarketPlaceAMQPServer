var mongoDao = require('../utils/mongoDao');
var logger = require('../utils/logger');

module.exports.checkout = function(payload, callback) {
	mongoDao.fetchOne('UserDetails', {
		'_id'	:	payload.user_id
	}, function(user) {
		for(var i = 0; i < user.cart.length; i++) {
			mongoDao.insert('TransactionDetails', {
				'item'	:	user.cart[i],
				'buyer'	:	user._id,
				'time'	:	new Date().getTime()
			}, function(resultDoc) {
				mongoDao.update('SaleDetails', {
					'_id'	:	resultDoc.ops[0].item._id
				}, {
					'$inc'	:	{
						'sale_qty'	:	-resultDoc.ops[0].item.sale_qty
					}
				});
			});
		}
	});
	setTimeout(function() {
		if(success) {
			req.session.loggedInUser.cart = [];
			mongoDao.update('UserDetails', {
				'_id' : payload.user_id
			}, {
				'$set'	:	{
					'cart'	:	[]
				}
			}, function(resultDoc) {
				callback({
					'status_code' : 200
				});
			});
		} else {
			callback({
				'status_code' : 500
			});
		}
	}, 0);
}

module.exports.cartAvailability = function(payload, callback) {
	// dao.executeQuery('select sale_details.sale_qty as available_qty, cart_details.cart_qty from sale_details, cart_details where cart_details.sale_item = sale_details.sale_id and cart_details.user = ?', [user_id], function(results) {
	// 	for(var i = 0; i < results.length; i++) {
	// 		if(Number(results[i].available_qty) < Number(results[i].cart_qty)) {
	// 			available = false;
	// 		}
	// 	}
	// });
	callback({
		'available'	:	true
	})
}

module.exports.removeFromCart = function(payload, callback) {
	mongoDao.update('UserDetails', {
		'_id' : payload.user_id
	}, {
		$pull : {
			'cart' : {
				'_id'		:	payload.item_id
			}
		}
	}, function(resultDoc) {
		callback({});
	})
}