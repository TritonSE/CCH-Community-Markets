$(document).ready( function () {
    console.log("here");
    $('a.nav-link').filter(function(){return this.href==location.href}).parent().addClass("active").siblings().removeClass("active");
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