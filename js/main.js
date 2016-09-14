import './groceries.js';
'use-strict';

(function(){

    var template = Handlebars.templates['groceries'];

    var context = {
    groceries: [
      {item: "Potato"},
      {item: "Rice"},
      {item: "Beans"},
      {item: "Chicken"}
    ]
    };

    var templateData = template(context);

    document.getElementById('grocery-list').innerHTML += templateData;    

})();
