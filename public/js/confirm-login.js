$(document).ready( function () {
    var loggedIn = sessionStorage.getItem('loggedIn');
    if (loggedIn == "true") {
        document.getElementById("closemarket").href = "/markets";
        document.getElementById("closedata").href = "/data";
    }
    else {
        document.getElementById("closemarket").href = "/admin-login";
        document.getElementById("closedata").href = "/admin-login";
    }
});