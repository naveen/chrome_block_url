(function(App, Page) {

Page.Views.UrlIndex = Backbone.View.extend({
	"el": document.getElementById("options_url_index"),

	"initialize": function() {
		this.render();
	},

	"events": {
		"keypress #options_url_text": "on_keypress",
		"click #options_url_submit":  "on_submit",
		"click .delete": "on_delete"
	},

    "render": function() {
    	document.getElementById("options_url_list").innerHTML = "";

        _.each(this.model.models, function (url) {
        	var view = new Page.Views.UrlShow({"model": url});
        	var li = view.render().el;
            document.getElementById("options_url_list").appendChild(li);
        }, this);

        return this;
    },

	"on_keypress": function(e) {
		if (e.keyCode != 13) return;
		this.on_submit(e);
	},

	"on_submit": function(e) {
		e.preventDefault();

		var url_object = new Page.Models.Url({"created_at": (new Date()).toDateString()});
		url_object.set_name(document.getElementById("options_url_text").value);

		if(url_object.is_valid()) {
			this.model.add(url_object);

			document.getElementById("options_url_text").value = "";
			this.render();
		}
	},

	"on_delete": function(e) {
		e.preventDefault();

		var cid = e.currentTarget.getAttribute("data-cid");
		var model = this.model.getByCid(cid);
		this.model.remove(model);

		this.render();
	}
});

})(App, App.module("options"));
