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
    var ref = db.ref("live_well");

    // Move to sub-directory.
    var marketsRef = ref.child("markets");
    var form = $('#market-name-dropdown');

    marketsRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        var name = childData.marketInfo.marketName;

        form.append($('<option>',{value: name}).text(name))
        
        
        // ...
        });
        form.append($('<option>', {value: "NEW MARKET"}).text("NEW MARKET"));
    });


});

