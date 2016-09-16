import $ from 'jquery';
import '../precompiled/layout';
import context from '../context/context';

let template = Handlebars.templates['layout'];

Handlebars.registerHelper('paragraphs', function(items, options) {
   
    let output = '';
    let randomLength = Math.floor(Math.random() * 0.5 * 400)+400;

    for(let i = 0; i < 8; i++){
        let p = '<p>';
        while(p.length < randomLength){
            let randomIndex = Math.floor(Math.random() * items.length);
            p += (' ' + options.fn(items[randomIndex]));
        };

        p += '</p>';
        output += p;
    };
    
    return output;
});


let templateData = template(context);

$(document).ready(() => {
    document.getElementById('app').innerHTML += templateData;
});
