$(document).ready( function () {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    $("#submit").on("click", function(event) {
        event.preventDefault();
        const email = $("#username").val();
        const password = $("#password").val();
		  $.post('/admin-login', {email, password}, function(data){
		  	 if(data['success']){
			 	location.href="/";
			 }

			 else{
			 	alert("Invalid credentials.");
			 }
		  });
    });
    
});
