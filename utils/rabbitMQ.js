var amqp = require('amqplib/callback_api');

function generateUuid() {
  return Math.random().toString() +
		 Math.random().toString() +
		 Math.random().toString();
}

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
	},

	sendMessage : function(queue_name, payload, callback) {
		this.connect(function(conn) {
			conn.createChannel(function(err, ch) {
				ch.assertQueue('', {exclusive: true}, function(err, q) {
					var corr = generateUuid();
					ch.consume(q.queue, function(msg) {
						if (msg.properties.correlationId === corr) {
							callback(JSON.parse(msg.content.toString()));
							var responseWait = setTimeout(function() {
								conn.close();
								// process.exit(0);
							}, 500);
						}
					}, {noAck: true});
					ch.sendToQueue(queue_name, new Buffer(JSON.stringify(payload)), {
						correlationId: corr,
						replyTo: q.queue
					});
				});
			});
		})
	}
}