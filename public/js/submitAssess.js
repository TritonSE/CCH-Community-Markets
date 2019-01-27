$('#assess-button').click(function(event) {

    
    var myForm = $('#assessment-form');

    if(! myForm[0].checkValidity()) {
        // If the form is invalid, submit it. The form won't actually submit;
        // this will just cause the browser to display the native HTML5 error messages.
        return;
    }

    else{
        event.preventDefault();
    }

    var count = 1;

    $('.answers').each(function(){
        let currentQuestion = $(this);
        let answer = currentQuestion.find(':checked');
    
        if(typeof answer.val() == "undefined"){
            count++;
            return;
        }

        else{
            alert("Question #" + count);
            alert("Value is "+ answer.val());
            alert("Weight is "+ answer.parent().find('.points-input').val());
            count++;
        }



    });




});
