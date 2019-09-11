
$(document).ready( function () {
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
