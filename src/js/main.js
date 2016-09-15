import $ from 'jquery';
import '../views/precompiled/layout.js';

const wordbank = require('./wordbank');

let template = Handlebars.templates['layout'];
  
    
let context = {
    title: 'Tenacious D',
    subheading: 'lorem ipsum',
    dropdown: [
        {paragraph: 'how many paragraphs'},
        {paragraph: 1},
        {paragraph: 2},
        {paragraph: 3},
        {paragraph: 4}
    ],
};

$(document).ready(() => {
    document.getElementById('app').innerHTML += templateData;
    $('select').change(() => selectChanged());    
});

function selectChanged() {
    console.log('hello, world');
}


let templateData = template(context);

