function logout(){
	//send request to logout user
	$.post({'url' : '/admin-login/signOut', credentials: 'include', withCredentials: true}, function(data) {
		location.href='/';
	});
}

var loginButton = "<a role=\"button\" href='/admin-login' class='btn btn-outline-warning'>Admin Login</a>"
var logoutButton = "<a role='button' onclick='logout()' href='/' class='btn btn-outline-warning'>Logout</a>"
$(document).ready(function() {
	//send request to check if user is signed in
	$.post('/admin-login/checkIfSignedIn', function(data) {
		if(data['signedIn'])
			$('.ml-auto').append(logoutButton);

		else
			$('.ml-auto').append(loginButton);
	});
});

