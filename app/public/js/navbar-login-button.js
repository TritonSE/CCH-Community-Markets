function logout(){
	//send request to logout user
	$.post({'url' : '/auth/signOut', credentials: 'same-origin', withCredentials: true}, function() {
		location.href='/';
	});
}

var loginButton = "<a role=\"button\" href='/auth' class='btn btn-outline-warning'>Admin Login</a>"
var logoutButton = "<a role='button' onclick='logout()' href='/' class='btn btn-outline-warning'>Logout</a>"
$(document).ready(function() {
	//send request to check if user is signed in
	$.get('/auth/checkIfSignedIn', function(data) {
		if(data['signedIn'])
			$('.ml-auto').append(logoutButton);

		else
			$('.ml-auto').append(loginButton);
	});
});
