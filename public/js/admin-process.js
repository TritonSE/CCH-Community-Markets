var myConfig = require('./app');

$(document).ready( function () {
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

    if (!firebase.apps.length) {
        firebase.initializeApp(myConfig.config);
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