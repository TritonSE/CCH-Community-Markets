//once pre-assess is over, displays assessment questions
$('#pre-assess-button').click(function(event){
    event.preventDefault();
});
$('#pre-assess-button').click(function(){
    $('h2.title').hide();
    $('#pre-assess-container').hide();
    $('.assessment-container').show();
});
