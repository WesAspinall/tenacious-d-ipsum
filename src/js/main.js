import $ from 'jquery';
import quotes from '../assets/data';

'use-strict';

(function(){

    function paragraphs() {
        var output = '';

        var selectVal = $('#select').val();
        var randomLength = Math.floor(Math.random()* 0.5 * 666) + 666;

        for(var i = 0; i < selectVal; i++){

            var p = '<p>';
            while(p.length <= randomLength){

                var randomIndex = Math.floor(Math.random() * quotes.length);
                p += (' ' + quotes[randomIndex].quote);    
            }

            p += '</p>';
            output += p;
        }

        $('#output').html(output);
    }



    $(document).ready( function() {

        paragraphs();
        $('#select').change(() => {
            paragraphs();
            $('#select').val()
        });
    });
    
})();
















