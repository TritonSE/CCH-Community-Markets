$('#addAdmin-button').click(function(event){
	const form = $('#addAdmin-form');

	if(! form[0].checkValidity()){
		return;
	}
	event.preventDefault();

	const email = $("#email").val();
	const password = $("#password").val();
	const confirmedPassword = $("#confirm-password").val();

	if(password.localeCompare(confirmedPassword) != 0){
		window.alert("Passwords do not match.");
		return;
	}
	
	//password isnt at least six characters long
	else if(password.localeCompare(confirmedPassword) == 0 && password.length < 6){
		window.alert("Password must be at least 6 characters long.");
		return;
	}

	else{
		$.post('/admin-panel/addUser', {email, password}, function(data) {
			if(data['success']){
				window.alert("User successfully added!");
				location.href='/admin-panel';
			}

			else{
				window.alert("User cannot be added please try again.");
			}
		});
	}
	
	const responses = $('#addAdmin-form').serializeArray();
});
