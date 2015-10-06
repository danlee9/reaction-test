describe('authService', function() {
	beforeEach(module('authService'));

	it('should set and get tokens to and from local storage', inject(function(AuthToken) {
		expect(AuthToken.getToken()).toBe(null);

		AuthToken.setToken('test', 'blah');

		expect(AuthToken.getToken()).toEqual('test');
	}));
});