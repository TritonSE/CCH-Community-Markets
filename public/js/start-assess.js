if (sessionStorage.getItem('loggedIn') != "true") {location.href = "/";}
//once pre-assess is over, displays assessment questions
$('#pre-assess-button').click(function(event) {
    //gets form
    var myform = $('#pre-assess-form')
    
    if(!myform[0].checkValidity()) {
        // If the form is invalid, submit it. The form won't actually submit;
        // this will just cause the browser to display the native HTML5 error messages.
        return;
    }
    
    //if everything is filled then prevent form from submitting and display assessment questions instead
    event.preventDefault();
    $('h2.title').hide();
    $('#pre-assess-container').hide();
    $('.assessment-container').show();
});


