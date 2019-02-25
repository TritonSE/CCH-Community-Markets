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
    var  levelArr = [0,0,0];

    var levelPotential = [0,0,0]

    var disqualified = false;
    
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
                levelArr[0];
                levelArr[1]++;
            }

            else if(level == 3){
                levelArr[0]++;
                levelArr[1]++;
                levelArr[2]++;
            }

            else if(level == -1){
                return;
            }
            
            //case when 0
            else{
                disqualified = true;
            }

            count++;
        }
        
        var has1 = false;
        var has2 = false;
        var has3 = false;

        currentQuestion.find('.points-input').each(function() {
                let pointlevel = $(this).val()

                if(pointlevel == 1 && !has1){
                    levelPotential[0]++;
                    has1 = true;
                }

                if(pointlevel == 2 && !has2){
                    levelPotential[1]++;
                    has2 = true;
                }

                if(pointlevel == 2 && !has3){
                    levelPotential[2]++;
                    has3 = true;
                }


		    });


    });

    console.log(disqualified)
    let isLevel = [false, false, false]
    for(let i = 0; i < isLevel.length; i++){
        if(levelArr[i] == levelPotential[i]){
            isLevel[i] = true;
        }

        if(isLevel[i]){
            console.log("market is level " + (i+1));
        }
    }

});
