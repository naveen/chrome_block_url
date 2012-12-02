(function(App, Page) {

Page.Collections.Url = Backbone.Collection.extend({
    "model": Page.Models.Url,

    "initialize": function() {
		this.load();

		this.bind("add", this.push);
		this.bind("remove", this.save);
	},

	"push": function(url_object) {
		if(!url_object.is_valid()) {
			this.remove(url_object);
		}

		this.save();
	},

	"load": function() {
		try {
			var collection = JSON.parse(localStorage["urls"]);
			for(var i in collection) {
				this.add(collection[i]);
			}
		} catch(err) { }
	},

	"save": function() {
		var json = this.toJSON();
		localStorage["urls"] = JSON.stringify(json);
	}
});

})(App, App.module("options"));
