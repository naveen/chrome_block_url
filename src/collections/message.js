(function(App, Page) {

Page.Collections.Message = Backbone.Collection.extend({
    "model": Page.Models.Message,

    "initialize": function() {
		this.load_messages_text();
	},
	
    "get_one": function() {
    	var max_index = this.messages_text.length;    	
    	var rnd_index = Math.random() * max_index;
    	rnd_index = parseInt(rnd_index);
    	
    	console.log(this.messages_text[rnd_index]);
    	var model = new this.model({
    		"id": rnd_index,
    		"text": this.messages_text[rnd_index]
    	});
    	
    	return model;
    },
    
    "load_messages_text": function() {
    	this.messages_text = new Array(
			"Aren't you supposed to be working",
			"Stop playing around",
			""	
		);
    }
});

})(App, App.module("index"));
