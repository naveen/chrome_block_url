(function(App, Page) {

Page.Models.Message = Backbone.Model.extend({
    "defaults": {
        "id": null,
        "text": null
    }
});

})(App, App.module("index"));
