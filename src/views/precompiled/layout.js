(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['layout'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.quote || (depth0 != null ? depth0.quote : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"quote","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div>\n<h1>Tenacious D</h1>\n<h3>lorem ipsum</h3>\n<select id='select'>\n    <option value= \"1\">1</option>\n    <option value= \"2\" selected>2</option>\n    <option value= \"3\">3</option>\n    <option value= \"4\">4</option>\n</select>\n<section>\n"
    + ((stack1 = (helpers.paragraphs || (depth0 && depth0.paragraphs) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.quotes : depth0),{"name":"paragraphs","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</section>\n</div>";
},"useData":true});
})();