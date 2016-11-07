
var expect = require("chai").expect;
var account_services = require('../services/account_services.js');


describe('eBay Login Tests', function() {
	it('Valid User and Password Test', function(done) {
		account_services.authenticate({
			'username' : 'keyur'
			'password' : 'admin123'
		}, function(reply) {
			expect(reply.valid).to.equal(true);
			done();
		});
	});
	
	it('Invalid User and Password Test', function(done) {
		account_services.authenticate({
			'username' : 'key'
			'password' : 'admin'
		}, function(reply) {
			expect(reply.valid).to.equal(false);
			done();
		});
	});
	
	it('Contact Update Test', function(done) {
		request({
			url : "http://127.0.0.1:3000/updateContact",
			method : "POST",
			json : true,
			body : {
				"user" : 1,
				"contact" : "16692386056"
			}
		}, function(err, res, body) {
			expect(body.contact).to.equal(16692386056);
			done();
		});
	});
});