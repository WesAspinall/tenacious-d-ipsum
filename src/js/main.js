import $ from 'jquery';
import quotes from '../assets/data';
import IpsumCtrl from './IpsumCtrl';

'use-strict';

(function(){

    let activate = new IpsumCtrl();
    let paragraphs = activate.paragraphs;
    let selectChange = activate.selectChange;

    $(document).ready(function() {
            paragraphs();
            selectChange();
    });
    
})();
