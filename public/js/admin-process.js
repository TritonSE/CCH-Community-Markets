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

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    var urlString = window.location.href;
    var url = new URL(urlString);
    var email = url.searchParams.get('username');
    var password = url.searchParams.get('password');

    firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred);
        sessionStorage.setItem('loggedIn', true);
        $(".jChange").text("Successfully logged in.");
        location.href="/";

    }).catch(function(error) {
        console.log(error);
        sessionStorage.setItem('loggedIn', false);
        $(".jChange").text("Failed to login. Try again.");
        location.href="/admin-login"
    });
});