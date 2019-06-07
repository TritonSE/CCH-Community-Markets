function logout(){
    sessionStorage.setItem("loggedIn","false");
    console.log(sessionStorage.getItem("loggedIn"));
}
var loginButton = "<a role=\"button\" href='/admin-login' class='btn btn-outline-warning'>Admin Login</a>"
var logoutButton = "<a role='button' onclick='logout()' href='/' class='btn btn-outline-warning'>Logout</a>"
$(document).ready(function() {
    if (sessionStorage.getItem("loggedIn") == "true"){
        $('.ml-auto').append(logoutButton);
    }
    else if (sessionStorage.getItem("loggedIn") == "false"){
        $('.ml-auto').append(loginButton);
    }
    else{
        $('.ml-auto').append(loginButton);
    }
});

