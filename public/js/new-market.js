//when new market is selected in pre-assess, form updates with additional fields
$('#market-name-dropdown').change(function(){
    if(this.value == 'NEW MARKET'){
        $('#new-market-input input').each(function(){
            $(this).removeAttr("disabled");
        });
        
        $('#new-market-input select').removeAttr("disabled");
        $('#new-market-input').show();
    }

    else{
        $('#new-market-input').hide();
        $('#new-market-input select').attr("disabled", "");

        $('#new-market-input input').each(function(){
            $(this).attr("disabled", "");
        });
        

    }
});

