import $ from 'jquery';
import quotes from '../assets/data';

var IpsumCtrl = function() {

    this.paragraphs = paragraphs;
    this.selectChange = selectChange;


    function paragraphs() {

        var output = '';
        var selectVal = $('#select').val();

        // length of paragraph is random within
        // the bounds of 666 and 333 characters
        var randomLength = Math.floor(Math.random() * 0.5 * 666) + 666;

        // number of paragraphs determined by
        // the value of #selector
        for (var i = 0; i < selectVal; i++) {
            var p = '<p>';

            while (p.length <= randomLength) {
                // quotes are randomly chosen 
                // from the quotes array
                var randomIndex = Math.floor(Math.random() * quotes.length);
                p += (' ' + quotes[randomIndex].quote);
            }

            p += '</p>';
            output += p;
        }

        //output is placed in #paragraphs
        $('#ipsum').html(output);
    }


    function selectChange() {

       $('#select').change(() => {
            paragraphs();
            $('#select').val();
        });
    }


};

export default IpsumCtrl;