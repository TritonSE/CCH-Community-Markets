$(document).ready( function () {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    $("#submit").on("click", function(event) {
        const email = $("#username").val();
        const password = $("#password").val();

        firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
            sessionStorage.setItem('loggedIn', true);
            location.href="/";
            event.preventDefault();
        }).catch(function(error) {
            sessionStorage.setItem('loggedIn', false);
            $("#username").val("");
            $("#password").val("");
            $(".output").text("Incorrect username or password.");
            event.preventDefault();
        });

        event.preventDefault();

    });
    
});