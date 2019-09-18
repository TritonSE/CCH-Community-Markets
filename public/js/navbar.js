function logout(){
    sessionStorage.setItem("loggedIn","false");
    console.log(sessionStorage.getItem("loggedIn"));
}

function showAdmins(){

}
let loginButton = "<a role=\"button\" href='/admin-login' class='btn btn-outline-warning'>Admin Login</a>";
let logoutButton = "<a role='button' onclick='logout()' href='/' class='btn btn-outline-warning'>Logout</a>";
let adminPanelButton = "<a role='button' href='/admin-panel' class='btn' style='color: white; background-color: teal !important;margin-right: 15px;'>Admin Panel</a>";

$(document).ready(function() {
    if (sessionStorage.getItem("loggedIn") == "true"){
	 	  $('.ml-auto').append(adminPanelButton);
        $('.ml-auto').append(logoutButton);
    }
    else if (sessionStorage.getItem("loggedIn") == "false"){
        $('.ml-auto').append(loginButton);
    }
    else{
        $('.ml-auto').append(loginButton);
    }
});

