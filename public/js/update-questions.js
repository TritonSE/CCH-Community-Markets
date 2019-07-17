//handles disabling buttons if no is pressed on some of the questions
//questions that say if no, skip to ... on the spreadsheet 
//questions are 1, 8, 11, 25, 28, 36
$('input').change(function(){
    var id = $(this).attr("id")
    var currentNumber = id.match(/\d+/g);
    var currentNumber = parseInt(currentNumber);
    
    //array of questions that require greying out 
    var currentOptions = [1, 8, 11, 25, 28, 36]
    
    /*
     * array of end markers for greying out, index maps to same index in 
     * currentOptions array.
     */
    var endOptions = [11, 11, 17, 28, 30, 40]

    var end = -1
    
    //see whether current number requires greying out of other questions.
    for( let i = 0; i < currentOptions.length; i++ ){
      
      if( currentNumber == currentOptions[i] ){
        //assigns end marker for current question 
        end = endOptions[i];
      }

    }
    
    //if the current number requires greying out
    if( end != -1 ){
      
      //booleans for reversing numOptions (grey/ungrey) and "Skip to ..." label (show/hide)
      var reverseLabel = false
      var reverseNumOptions = false

      //loops through affected questions 
      for(let i = currentNumber + 1; i < end; i++){

        //disables questions if no is selected for current question
        if($('#No-'+ currentNumber).is(":checked")){
          
          //shows "Skip to ..." label 
          if(!reverseLabel){
            reverseLabel = true
            $('#'+currentNumber+'.if-no').show()
          }
              
          //disables number options affected by current number (1) only once
          if( !reverseNumOptions && currentNumber == 1 ){
            reverseNumOptions = true;
            $('#0-4').attr("disabled", true);
            $('#1-2-4').attr("disabled", true);
            $('#3-5-4').attr("disabled", true);
            $('#10-4').attr("disabled", true);
            $('#6-9-4').attr("disabled", true);
            $('#0-7').attr("disabled", true);
            $('#1-2-7').attr("disabled", true);
            $('#3-5-7').attr("disabled", true);
            $('#6-9-7').attr("disabled", true);
            $('#10-7').attr("disabled", true);
          }
          
          //disables number options affected by current number (11) only once 
          if( !reverseNumOptions && currentNumber == 11 ){
            reverseNumOptions = true;
            $('#0-14').attr("disabled", true);
            $('#1-2-14').attr("disabled", true);
            $('#3-5-14').attr("disabled", true);
            $('#6-9-14').attr("disabled", true);
            $('#10-14').attr("disabled", true);
          }
          
          //disables yes/no questions up till end
          $('#Yes-'+i).attr('disabled',true);
          $('#No-'+i).attr('disabled',true);
        } 
          
        //enables questions otherwise
        else{
          
          //hides "Skip to ..." label
          if( !reverseLabel ) {
            reverseLabel = true;
            $('#'+currentNumber+'.if-no').hide();
          }
          
          //enables number options affected by current number (1) only once
          if( !reverseNumOptions && currentNumber == 1 ){
            reverseNumOptions = true;
            $('#0-4').attr("disabled", null);
            $('#1-2-4').attr("disabled", null);
            $('#3-5-4').attr("disabled", null);
            $('#10-4').attr("disabled", null);
            $('#6-9-4').attr("disabled", null);
            $('#0-7').attr("disabled", null);
            $('#1-2-7').attr("disabled", null);
            $('#3-5-7').attr("disabled", null);
            $('#6-9-7').attr("disabled", null);
            $('#10-7').attr("disabled", null);
          }      
          
          //enables number options affected by current number (11) only once
          if( !reverseNumOptions && currentNumber == 11){
            reverseNumOptions = true;
            $('#0-14').attr("disabled", null);
            $('#1-2-14').attr("disabled", null);
            $('#3-5-14').attr("disabled", null);
            $('#6-9-14').attr("disabled", null);
            $('#10-14').attr("disabled", null);
          }
          
          //enables yes/no questions up till end
          $('#Yes-'+i).attr('disabled', null);
          $('#No-'+i).attr('disabled', null);
        }

      }
  }
});
