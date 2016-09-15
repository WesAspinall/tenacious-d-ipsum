this["layout"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "<option>"
    + this.escapeExpression(((helper = (helper = helpers.paragraph || (depth0 != null ? depth0.paragraph : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"paragraph","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<h1>"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\n<h3>"
    + alias3(((helper = (helper = helpers.subheading || (depth0 != null ? depth0.subheading : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"subheading","hash":{},"data":data}) : helper)))
    + "</h1>\n<select>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.dropdown : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</select>\n";
},"useData":true});