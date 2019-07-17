//handles disabling buttons if no is pressed on some of the questions
//questions that say if no, skip to ... on the spreadsheet 
//questions are 1, 8, 11, 25, 28, 36
$('input').change(function(){
    var id = $(this).attr("id")
    var currentNumber = id.match(/\d+/g)
    var currentNumber = parseInt(currentNumber)
    
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
      
      //handles questions with yes/no options
      for(let i = currentNumber + 1; i < end; i++){

          //disable buttons if no was selected for current number
          if($('#No-'+ currentNumber).is(":checked")){
              $('#Yes-'+i).attr('disabled',true);
              $('#No-'+i).attr('disabled',true);
          } 
          
          //enable buttons again if yes selected for current number
          else{
            $('#Yes-'+i).attr('disabled',null);
            $('#No-'+i).attr('disabled', null);
          }

      }
      
      //disable number options if necessary 
      if($('#No-' + currentNumber).is(":checked")){
        
        //show the label that says to skip to end
        $('#'+currentNumber+'.if-no').show();

        //disable options for numbers 4 and 7 if current number is 1
        if(currentNumber == 1){
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
        
        //disable options for number 14 if current number is 11
        if(currentNumber == 11){
          $('#0-14').attr("disabled", true);
          $('#1-2-14').attr("disabled", true);
          $('#3-5-14').attr("disabled", true);
          $('#6-9-14').attr("disabled", true);
          $('#10-14').attr("disabled", true);
        }
      }
      
      //enable number options instead
      else{
        
        //hide label that says skip to end
        $('#'+currentNumber+'.if-no').hide();

        //enable options for numbers 4 and 7 if current number is 1
        if(currentNumber == 1){
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
        
        //enable options for number 14 if current number is 11
        if(currentNumber == 11){
            $('#0-14').attr("disabled", null);
            $('#1-2-14').attr("disabled", null);
            $('#3-5-14').attr("disabled", null);
            $('#6-9-14').attr("disabled", null);
            $('#10-14').attr("disabled", null);
        }

    }
  }
});
