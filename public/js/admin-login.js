$(document).ready( function () {
    console.log("here");
    var loggedIn = sessionStorage.getItem('loggedIn');
    console.log(loggedIn);
    if (loggedIn == "true") {
        console.log("enable");
        document.getElementById("closemarket").href = "/markets";
        document.getElementById("closedata").href = "/data";
        document.getElementById("closeassess").href = "/assess";
    }
    else {
        console.log("disable");
        document.getElementById("closemarket").href = "javascript:void(0)";
        document.getElementById("closedata").href = "javascript:void(0)";
        document.getElementById("closeassess").href = "javascript:void(0)";
    }
});