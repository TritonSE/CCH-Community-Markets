$(document).ready( function () {
    console.log(process.env.projectId);
    console.log("here");
    var loggedIn = sessionStorage.getItem('loggedIn');
    console.log(loggedIn);
    if (loggedIn == "true") {
        console.log("enable");
        document.getElementById("closemarket").href = "/markets";
        document.getElementById("closedata").href = "/data";
    }
    else {
        console.log("disable");
        document.getElementById("closemarket").href = "/admin-login";
        document.getElementById("closedata").href = "/admin-login";
    }
});