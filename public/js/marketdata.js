var marketName = sessionStorage.getItem("marketName");

$(document).ready(function() {
    console.log("Redirect Worked");
    console.log(marketName);
    console.log(sessionStorage);
    
    $('.text-dark').append(marketName);

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

                $('.text-dark').append("<br>");
                $('.text-dark').append("Market Level: " + level);
                $('.text-dark').append("<br>");
                $('.text-dark').append("Address: " + address);
                $('.text-dark').append("<br>");
                $('.text-dark').append("Size: " + size);
                $('.text-dark').append("<br>");

                $('.text-subdark').append("Reviewer: " + firstName + " " + lastName);
                $('.text-subdark').append("<br>");
                $('.text-subdark').append("Email: " + email);
                $('.text-subdark').append("<br>");

                for (var key in questions) {
                    if (key !== "undefined") {
                        $('.text-muted').append(key + ": " + "<span class=\"boldanswer\">" + questions[key] + "</span>");
                        $('.text-muted').append("<br>");
                    }
                }

                
            }
        });
    });
});