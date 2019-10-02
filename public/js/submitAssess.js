$('#assess-button').click(function(event) {
    
    //gets form
    var myForm = $('#assessment-form');

    if(! myForm[0].checkValidity()) {
        // If the form is invalid, submit it. The form won't actually submit;
        // this will just cause the browser to display the native HTML5 error messages.
        return;
    }

    // Pull information from form.
    var responses = $('#assessment-form').serializeArray();

    // Get first 4 values if market exists, first 10 values otherwise.
    var userVals = responses[3].value === "NEW MARKET" ? 10 : 4;
    var userInfo = {};
    for (var i = 0; i < userVals; i++) {
        userInfo[responses[i].name] = responses[i].value;
    }

    event.preventDefault();

    //keeps track of current question #
    var count = 1;

    //each index represents the amount of times a level occurs.
    // [level 1, level 2, level 3]
    var  levelArr = [0,0,0];

    var levelPotential = [0,0,0]

    var disqualified = false;

    var questionsList = {}
    var doBetterQuestions = []

    //for when questions hit level zero
    var increaseZeroCase = 0;
    
    //loops through all questions, executes the following function for each question one at a time. 
    $('.answers').each(function(){
        var currentQuestion = $(this);

        //finds checked label
        var answer = currentQuestion.find(':checked');

        var questionKey = answer.attr('name');
        if (typeof questionKey != "undefined") {
            questionKey = questionKey.replace(/[^0-9a-zA-Z, ]/gi, '');
        } else {
            questionKey = "undefined";
        }

        var answerText = answer.val();
        if (typeof answerText != "undefined") {
            answerText = answerText
        } else {
            answerText = "undefined";
        }

        questionsList[questionKey] = answerText;
    
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
                levelArr[0]++;
                levelArr[1]++;
            }

            else if(level == 3){
                levelArr[0]++;
                levelArr[1]++;
                levelArr[2]++;
            }

            else if(level == -1){
                count++;
                return;
            }
            
            //case when 0
            else{
                levelArr[0]++;
                levelArr[1]++;
                levelArr[2]++;
                increaseZeroCase++;
            }

        }
        
        //make sure only to increase potential once for each section
        var has0 = false;
        var has1 = false;
        var has2 = false;
        var has3 = false;
        
        currentQuestion.find('.points-input').each(function() {
                var pointlevel = $(this).val()
                
                if(pointlevel == 1 && !has1){
                    levelPotential[0]++;
                    has1 = true;
                }

                if(pointlevel == 2 && !has2){
                    levelPotential[1]++;
                    has2 = true;
                }

                if(pointlevel == 3 && !has3){
                    levelPotential[2]++;
                    has3 = true;
                }


		});
        
        //increase question count
        count++;

    });
    
    //increasing potential to account for questions where zero option was selected 
    for(var z = 0; z < increaseZeroCase; z++){
        levelPotential[0]++;
        levelPotential[1]++;
        levelPotential[2]++;
    }


    //grab final market value.
    var marketLevel = 0;

    for(var i = 0; i < levelArr.length; i++){
        console.log("total for market " + (i+1) + " is " + levelArr[i])
        console.log("total potential is " + levelPotential[i])
        if(levelArr[i] >= levelPotential[i]){
            //isLevel[i] = true;
            marketLevel = i + 1;
        }
        else{
            if(i==0){
                marketLevel = 0;
                break;
            }
        }

    }

    console.log("Market is level: " + marketLevel);

    //no potential to hit therefore return
    if(marketLevel == 3){
        return false;
    }

    //the next level of the market assuming it's been hit.
    var potentialLevel = marketLevel + 1;

    //grabing missed numbers from each section

    var missedSections = [[],[],[],[]]

    //keep track of current question
    var count =1;
        
    //count of potential market level 
    var countPotential = 0;

    //loop through questions again
    $('.answers').each(function(){
        var currentQuestion = $(this);

        //finds checked label
        var answer = currentQuestion.find(':checked');
    
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
                
            if(level >= marketLevel + 1){
                count++;
                return;
            }
            
            else if(level == -1){
                count++;
                return;
            }
            
            //case when question has value that isn't equal to the marketlevel + 1
            else{
                
                var alreadyPushed = false;
                currentQuestion.find('.points-input').each(function() {
                    var pointlevel = $(this).val()

                    //for when more than one options satisfy marketLevel + 1, no need to push the count twice 

                    if(pointlevel == marketLevel + 1){
                        if(count < 17 && !alreadyPushed){
                            missedSections[0].push(count);
                            alreadyPushed = true;
                        }

                        else if(count > 16 && count < 39 && !alreadyPushed){
                            missedSections[1].push(count);
                            alreadyPushed = true;
                        }
    
                        else if(count > 38 && count < 59 && !alreadyPushed){
                            missedSections[2].push(count);
                            alreadyPushed = true;
                        }

                        else{
                            if(!alreadyPushed){
                                missedSections[3].push(count);
                                alreadyPushed = true;
                            }
                        }
                    
                    }


	            });

            }
                // go to next question
                count++;
        }

    });

    
    // make sure print statements are only called once
    console.log("Checking for questions to fix");
    var section1Echoed = false;
    var section2Echoed = false;
    var section3Echoed = false;
    var section4Echoed = false;
    for(var j = 0; j < missedSections.length; j++){
        if(missedSections[j].length == 0){
            continue;
        }

        else{
                if(j == 0 && !section1Echoed){
                    console.log("Questions that need to be fixed for first section:");
                    section1Echoed = true;
                }

                else if(j==1 && !section2Echoed){
                    console.log("Questions that need to be fixed for second section:");
                    section2Echoed = true;
                }

                else if(j == 2 && !section3Echoed){
                    console.log("Questions that need to be fixed for third section:");
                    section3Echoed = true;

                }

                else{   
                    if(!section4Echoed){
                        console.log("Questions that need to be fixed for fourth section:");
                        section4Echoed = true;
                    }
                }

                var lis = document.getElementById("assessment-q-list").getElementsByTagName("li");
                for(var k = 0; k < missedSections[j].length; k++){
                    var index = missedSections[j][k]
                    console.log(index);
                    doBetterQuestions.push("<span class=\"boldanswer\">" + index.toString() + "</span>" + ": " + lis[index - 1].getElementsByTagName("p")[0].innerText)
                }
        }
    }
    
    if(marketLevel == 0){
        for(var x = 0; x < levelArr.length; x++){
            if(levelArr[x] >= levelPotential[x]){
                marketLevel = x + 1;
            }
        }
    }

    else{
        marketLevel = marketLevel + 1;
    }

    const newMarket = userVals === 4 ? false : true;

    const sendData = {
        new: newMarket,
        level: marketLevel,
        betterQuestions: doBetterQuestions, 
        marketInfo: userInfo, 
        questions: questionsList
    }

    $.post('/submit-assess', {data: JSON.stringify(sendData)});

    var href='results/' + userInfo.marketName + '/' + marketLevel;
    location.href=href;
});
