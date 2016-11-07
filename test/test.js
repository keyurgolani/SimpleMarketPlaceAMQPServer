
var expect = require("chai").expect;
var rabbitMQ = require('../utils/rabbitMQ');
var account_services = require('../services/account_services.js');
var profile_services = require('../services/profile_services.js');


describe('eBay Tests', function() {
	it('Valid User and Password Test', function(done) {
		rabbitMQ.sendMessage('authenticate', {
			'username' : 'keyur',
			'password' : 'admin123'
		}, function(payload) {
			expect(payload.valid).to.equal(true);
			done();
		});
	});
	
	it('Invalid User and Password Test', function(done) {
		rabbitMQ.sendMessage('authenticate', {
			'username' : 'key',
			'password' : 'admin'
		}, function(payload) {
			expect(payload.valid).to.equal(false);
			done();
		});
	});
	
	it('Contact Update Test', function(done) {
		rabbitMQ.sendMessage('updateUserContact', {
			'user_id' : 1,
			'contact' : '16692386056'
		}, function(payload) {
			expect(payload.contact).to.equal('16692386056');
			done();
		});
	});

	it('Checks the availability of an unavailable emailID', function(done) {
		rabbitMQ.sendMessage('checkEmailAvailability', {
			'email' : 'keyurrgolani@gmail.com'
		}, function(payload) {
			expect(payload.available).to.equal(false);
			done();
		});
	});

	it('Checks the availability of an available username', function(done) {
		rabbitMQ.sendMessage('checkUserAvailability', {
			'username' : 'keyurrgolani'
		}, function(payload) {
			expect(payload.available).to.equal(false);
			done();
		});
	});
});