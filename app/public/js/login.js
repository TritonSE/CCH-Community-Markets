$(document).ready( function () {
    $("#submit").on("click", function(event) {
        event.preventDefault();
        const email = $("#username").val();
        const password = $("#password").val();
		  
		  //send request to sign in user
		  $.post('/login/login', {email, password}, function(data) {
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
