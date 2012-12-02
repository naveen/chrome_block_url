(function(App, Page) {

Page.Views.UrlShow = Backbone.View.extend({
    "template": _.template(document.getElementById("template_options_url_show").innerHTML),

    "render": function() {
        $(this.el).html(this.template(this.model));
        return this;
    }
});

})(App, App.module("options"));
