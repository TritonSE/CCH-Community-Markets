$(document).ready( function () {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    $("#submit").on("click", function(event) {
        event.preventDefault();
        const email = $("#username").val();
        const password = $("#password").val();
		  
		  //send request to sign in user
		  $.post('/admin-login/login', {email, password}, function(data) {
			 //if sign in was successful
		  	 if(data['success']){
			 	location.href="/";
			 }

			 //sign in not successful
			 else{
			 	$("#username").val("");
				$("#password").val("");
				$(".output").text("Incorrect username or password.");
				event.preventDefault();
			 }
		  });
    });
    
});
