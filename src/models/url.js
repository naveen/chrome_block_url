(function(App, Page) {

Page.Models.Url = Backbone.Model.extend({
	"valid_url": new RegExp("^(http(s)?:\/\/)?(www\.)?([a-z0-9]+[.])+([a-z]){2,4}", "i"),

    "defaults": {
        "id": null,
        "name": null,
        "created_at": null
    },

	"set_name": function(name) {
		if(!this.valid_url.test(name)) { return false; }

		name = name.replace(/^(http(s)?:\/\/)?/i, "");
		name = name.replace(/^(www\.)?/i, "");
		name = name.replace(/\/.*/i, "");

		this.attributes.name = name;
	},

    "is_valid": function() {
    	return this.valid_url.test(this.attributes.name);
    }
});

})(App, App.module("options"));
