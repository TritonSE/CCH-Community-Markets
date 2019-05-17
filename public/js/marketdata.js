if (sessionStorage.getItem('loggedIn') != "true") {location.href = "/";}
var marketName = sessionStorage.getItem("marketName");

$(document).ready(function() {
    console.log("Redirect Worked");
    console.log(marketName);
    
    $('.text-dark_md').append(marketName);

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    
    // Creates connection to database.
    var db = firebase.database();
    // Links to head of database.
    var ref = db.ref("live_weller");
    // Links to markets list.
    var marketsRef = ref.child("markets");

    marketsRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var name = childData.marketInfo.marketName;
            var address = childData.marketInfo.address;
            var size = childData.marketInfo.storeType;
            var zip = childData.marketInfo.zip;
            var level = childData.marketInfo.marketLevel;

            var firstName = childData.personalInfo.firstName;
            var lastName = childData.personalInfo.lastName;
            var email = childData.personalInfo.email;

            var questions = childData.questions;

            if (name === marketName) {

                var element = ".text-dark_md"

                $(element).append("<br>");
                $(element).append("Market Level: " + level);
                $(element).append("<br>");
                $(element).append("Address: " + address);
                $(element).append("<br>");
                $(element).append("Size: " + size);
                $(element).append("<br>");

                $('.text-subdark_md').append("Reviewer: " + firstName + " " + lastName);
                $('.text-subdark_md').append("<br>");
                $('.text-subdark_md').append("Email: " + email);
                $('.text-subdark_md').append("<br>");

                for (var key in questions) {
                    if (key !== "undefined") {
                        $('.text-muted2_md').append(key + ": " + "<span class=\"boldanswer\">" + questions[key] + "</span>");
                        $('.text-muted2_md').append("<br>");
                    }
                }

                
            }
        });
    });
});