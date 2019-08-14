//handles disabling buttons if no is pressed on some of the questions
//questions that say if no, skip to ... on the spreadsheet 
//questions are 1, 8, 11, 25, 28, 36
$('input').change(function(){
    var id = $(this).attr("id")
    var currentNumber = id.match(/\d+/g)
    var currentNumber = parseInt(currentNumber)
    
    //map with questions that require greying out as keys and end markers as values
    const options = new Map([
      [1,11],
      [8,11],
      [11, 17],
      [25, 28],
      [28, 30],
      [36, 40]
    ])
    
    //checks to see whether current number requires greying out 
    const end = options.has(currentNumber) ? options.get(currentNumber) : -1
    
    //if the current number requires greying out
    if( end != -1 ){
      
      //booleans for reversing numOptions (grey/ungrey) and "Skip to ..." label (show/hide)
      var reverseLabel = false
      var reverseNumOptions = false

      //loops through affected questions 
      for(let i = currentNumber + 1; i < end; i++){
        
        //sees whether no options was selected for current number
        const  response = ($('#No-' + currentNumber).is(":checked")) ? true : null
        
        //shows "Skip to ..." label 
        if(!reverseLabel){
          reverseLabel = true
          
          //decides whether to show or hide label based on response
          if( response ){
            $('#'+currentNumber+'.if-no').show()
          }
          
          else{
            $('#'+currentNumber+'.if-no').hide()
          }
          
        }
              
        //enables or disables number options affected by current number (1) only once
        if( !reverseNumOptions && currentNumber == 1 ){
          reverseNumOptions = true;
          $('#0-4').attr("disabled", response)
          $('#1-2-4').attr("disabled", response)
          $('#3-5-4').attr("disabled", response)
          $('#10-4').attr("disabled", response)
          $('#6-9-4').attr("disabled", response)
          $('#0-7').attr("disabled", response)
          $('#1-2-7').attr("disabled", response)
          $('#3-5-7').attr("disabled", response)
          $('#6-9-7').attr("disabled", response)
          $('#10-7').attr("disabled", response)
        }
          
        //enables or disables number options affected by current number (11) only once 
        if( !reverseNumOptions && currentNumber == 11 ){
          reverseNumOptions = true
          $('#0-14').attr("disabled", response)
          $('#1-2-14').attr("disabled", response)
          $('#3-5-14').attr("disabled", response)
          $('#6-9-14').attr("disabled", response)
          $('#10-14').attr("disabled", response)
        }
          
        //enables or disables yes/no questions up till end
        $('#Yes-'+i).attr('disabled',response)
        $('#No-'+i).attr('disabled', response)
    } 
          
  }
});
