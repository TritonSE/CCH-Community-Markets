function logout(){
	//send request to logout user
	$.post('/admin-login/signOut', function(data) {
		location.href="/";
	});
}
var loginButton = "<a role=\"button\" href='/admin-login' class='btn btn-outline-warning'>Admin Login</a>"
var logoutButton = "<a role='button' onclick='logout()' href='/' class='btn btn-outline-warning'>Logout</a>"
$(document).ready(function() {
	$.post('/admin-login/checkIfSignedIn', function(data) {
		if(data['signedIn']){
			$('.ml-auto').append(logoutButton);
		}

		else{
			$('.ml-auto').append(loginButton);
		}
	});
});

