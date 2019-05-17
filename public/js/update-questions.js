//handles disabling buttons if no is pressed on some of the questions
//questions that say if no, skip to ...
//questions are 1, 7, 10, 24, 27, 35
$('input').change(function(){
    var id = $(this).attr("id");
    var currentNumber = id.match(/\d+/g);
    var currentNumber = parseInt(currentNumber);
    if( (currentNumber==1) || (currentNumber==7) || (currentNumber==10) || (currentNumber==24) || (currentNumber==27) || (currentNumber==35)){
    
    var end;

    if(currentNumber==1){
        end = 10;
    }

    else if(currentNumber==7){
        end = 10;
    }

    else if(currentNumber == 10){
        end = 16;
    }

    else if(currentNumber == 24){
        end = 27;
    }

    else if(currentNumber == 27){
        end = 29;
    }

    else{
        end = 39;
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
        
        if(currentNumber == 10){
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
        if(currentNumber == 10){
            $('#0-13').attr("disabled", null);
            $('#1-2-13').attr("disabled", null);
            $('#3-5-13').attr("disabled", null);
            $('#6-9-13').attr("disabled", null);
            $('#10-13').attr("disabled", null);
        }


    }
    }
});
