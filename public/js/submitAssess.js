$('#assess-button').click(function(event) {

    //gets form
    var myForm = $('#assessment-form');

    if(! myForm[0].checkValidity()) {
        // If the form is invalid, submit it. The form won't actually submit;
        // this will just cause the browser to display the native HTML5 error messages.
        return;
    }

    event.preventDefault();
    
    //keeps track of current question #
    var count = 1;
    
    //loops through all questions, executes the following function for each question one at a time. 
    $('.answers').each(function(){
        let currentQuestion = $(this);

        //finds checked label
        let answer = currentQuestion.find(':checked');
    
        //if skipped
        if(typeof answer.val() == "undefined"){
            count++;
            return;
        }
        
        else{
            console.log("Question #" + count);
            console.log("Value is "+ answer.val());

            //grabs value hidden input corresponding with label in assess.ejs
            console.log("Weight is "+ answer.parent().find('.points-input').val());
            count++;
        }



    });




});
