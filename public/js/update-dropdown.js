$(document).ready(function() {
    /*
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    });
    */
    
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    
    // Setup database communication.
    var db = firebase.database();
    var ref = db.ref("live_weller");

    // Move to sub-directory.
    var marketsRef = ref.child("markets");
    var form = $('#market-name-dropdown');

    marketsRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        form.append($('<option>',{value: childKey}).text(childKey))
        });
        form.append($('<option>', {value: "NEW MARKET"}).text("NEW MARKET"));
    });
});

