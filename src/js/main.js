import $ from 'jquery';
import IpsumCtrl from './IpsumCtrl';

(function() {

    let activate = new IpsumCtrl();
    let paragraphs = activate.paragraphs;
    let selectChange = activate.selectChange;

    $(document).ready(function() {
        paragraphs();
        selectChange();
    });

})();