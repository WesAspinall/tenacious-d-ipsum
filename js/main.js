import $ from 'jquery';
import data from './wordbank';


const wordbank = require('./wordbank');

let template = Handlebars.templates['dropdown'];
  
    
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

let templateData = template(context);

document.getElementById('app').innerHTML += templateData;
   
