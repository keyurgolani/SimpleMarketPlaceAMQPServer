var amqp = require('amqplib/callback_api');

module.exports = {
	connect : function(callback) {
		amqp.connect('amqp://localhost', function(err, conn) {
			callback(conn);
		});
	},

	createQueue : function(queue_name, callback) {
		this.connect(function(conn) {
			conn.createChannel(function(err, ch) {
				ch.assertQueue(queue_name, {durable: false});
				ch.prefetch(1);
				console.log(' [x] Awaiting RPC requests on ' + queue_name + ' queue');
				ch.consume(queue_name, function reply(msg) {
					console.log(' [.] RPC request message ' + msg.content);
					callback(ch, msg);
				});
			});
		})
	},

	reply : function(payload, msg, ch, callback) {
		ch.sendToQueue(msg.properties.replyTo,
			new Buffer(JSON.stringify(payload)),
			{correlationId: msg.properties.correlationId});
		ch.ack(msg);
		callback();
	}
}