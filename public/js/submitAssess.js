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

    //each index represents the amount of times a level occurs.
    // [level 1, level 2, level 3]
    var levelArr = [0,0,0];
    
    //loops through all questions, executes the following function for each question one at a time. 
    $('.answers').each(function(){
        let currentQuestion = $(this);

        //finds checked label
        let answer = currentQuestion.find(':checked');
    
        //if no input
        if(typeof answer.val() == "undefined"){
            count++;
            return;
        }

        //if disabled from selecting no
        if(answer.is(':disabled')){
            count++;
            return;
        }
        
        else{
            //grabs level hidden input corresponding with label in assess.ejs
            var level = answer.parent().find('.points-input').val();
            
            
            if(level == 1){
                levelArr[0]++;
            }

            else if(level == 2){
                levelArr[1]++;
            }

            else if(level == 3){
                levelArr[2]++;
            }
            
            //case when 0
            else{
            }

            count++;
        }



    });

    
    //finds highest value in array and makes index+1 of it the market's level
    highestLevel = Math.max(...levelArr);
    console.log("Market Level: " + (levelArr.indexOf(highestLevel) + 1));

    //logs amount of times each level appeared 
    console.log("Amount of L1: " + levelArr[0]);
    console.log("Amount of L2: " + levelArr[1]);
    console.log("Amount of L3: " + levelArr[2]);

});
