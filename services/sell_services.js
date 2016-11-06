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
	mongoDao.insert('SaleDetails', , function(insertResult) {
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

module.exports.disableSale = function(payload, callback) {
	mongoDao.update('SaleDetails', {
		'_id' : insertResult.insertedIds[0]
	}, {
		$set : {
			'active' : false
		}
	}, function(resultDoc) {
		// Do nothing
	});
}