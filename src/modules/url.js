(function(tootlik, Url) {

Url.Model = Backbone.Model.extend({
	//"regex": new RegExp("((http|https)(:\/\/))?(www\.)?([a-z0-9]+[.]{1})+([a-z]{2, 4})", "i"),
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

Url.Collection = Backbone.Collection.extend({
    "model": Url.Model,

    "initialize": function() {
		this.load();

		this.bind("add", this.push);
		this.bind("remove", this.pull);
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

Url.ListView = Backbone.View.extend({
	"el": document.getElementById("url"),

	"initialize": function() {
		this.render();
	},

	"events": {
		"keypress #url_text": "on_keypress",
		"click #url_submit":  "on_submit",
		"click .delete": "on_delete"
	},

    "render": function() {
    	document.getElementById("url_list").innerHTML = "";

        _.each(this.model.models, function (url) {
        	var view = new Url.ListItemView({"model": url});
        	var li = view.render().el;
            document.getElementById("url_list").appendChild(li);
        }, this);

        return this;
    },

	"on_keypress": function(e) {
		if (e.keyCode != 13) return;
		this.on_submit(e);
	},

	"on_submit": function(e) {
		e.preventDefault();

		var url_object = new Url.Model({"created_at": (new Date()).toDateString()});
		url_object.set_name(document.getElementById("url_text").value);

		if(url_object.is_valid()) {
			this.model.add(url_object);

			document.getElementById("url_text").value = "";
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

Url.ListItemView = Backbone.View.extend({
    "template": _.template(document.getElementById("template_url_list_item").innerHTML),

    "render": function() {
        $(this.el).html(this.template(this.model));
        return this;
    }
});

Url.Router = Backbone.Router.extend({
    "routes": { "": "index" },

    "index": function() {
    	var collection = new Url.Collection();
    	var view = new Url.ListView({"model": collection});
    }
});

})(tootlik, tootlik.module("url"));
