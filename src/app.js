// Highly inspired by "bocoup"
// http://weblog.bocoup.com/organizing-your-backbone-js-application-with-modules/

var App = {
	module: function() {
		var modules = {};

		return function(name){
			if(modules[name]){
				return modules[name];
			}

			return modules[name] = { Models: {}, Collections: {}, Views: {} };
		};
	}()
};
