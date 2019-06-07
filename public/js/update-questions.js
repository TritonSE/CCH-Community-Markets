//handles disabling buttons if no is pressed on some of the questions
//questions that say if no, skip to ...
//questions are 1, 7, 10, 24, 27, 35
$('input').change(function(){
    var id = $(this).attr("id");
    var currentNumber = id.match(/\d+/g);
    var currentNumber = parseInt(currentNumber);
    if( (currentNumber==1) || (currentNumber==8) || (currentNumber==11) || (currentNumber==25) || (currentNumber==28) || (currentNumber==36)){
    
    var end;

    if(currentNumber==1){
        end = 11;
    }

    else if(currentNumber==8){
        end = 11;
    }

    else if(currentNumber == 11){
        end = 17;
    }

    else if(currentNumber == 25){
        end = 28;
    }

    else if(currentNumber == 28){
        end = 30;
    }

    else{
        end = 40;
    }



    for(var i = currentNumber + 1; i<end; i++){
        if($('#No-'+ currentNumber).is(":checked")){
            $('#Yes-'+i).attr('disabled',true);
            $('#No-'+i).attr('disabled',true); 
        }

        else{
            $('#Yes-'+i).attr('disabled',null);
            $('#No-'+i).attr('disabled', null); 
        
        } 
    }

    if($('#No-' + currentNumber).is(":checked")){
        $('#'+currentNumber+'.if-no').show();
        if(currentNumber == 1){
            $('#0-4').attr("disabled", true);
            $('#1-2-4').attr("disabled", true);
            $('#3-5-4').attr("disabled", true);
            $('#10-4').attr("disabled", true);
            $('#6-9-4').attr("disabled", true);
        }
        
        if(currentNumber == 11){
            $('#0-13').attr("disabled", true);
            $('#1-2-13').attr("disabled", true);
            $('#3-5-13').attr("disabled", true);
            $('#6-9-13').attr("disabled", true);
            $('#10-13').attr("disabled", true);
        }

    }

    else{

        $('#'+currentNumber+'.if-no').hide();
        if(currentNumber == 1){
            $('#0-4').attr("disabled", null);
            $('#1-2-4').attr("disabled", null);
            $('#3-5-4').attr("disabled", null);
            $('#10-4').attr("disabled", null);
            $('#6-9-4').attr("disabled", null);
       } 
        if(currentNumber == 11){
            $('#0-13').attr("disabled", null);
            $('#1-2-13').attr("disabled", null);
            $('#3-5-13').attr("disabled", null);
            $('#6-9-13').attr("disabled", null);
            $('#10-13').attr("disabled", null);
        }


    }
    }
});
