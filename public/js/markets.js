// let markets = $('#table_id').DataTable();
let assessmentArray = new Array();
function redirectFunction(name){
  sessionStorage.setItem("marketName",name);
  location.href='marketdata';
}
$(document).ready( function () {
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

          var markup = "<tr><td>" + <a onclick="redirectFunction(name);">name</a> + "</td><td>" + address + 
                      "</td><td>" + size + "</td><td>" + zip + 
                      "</td><td>" + level + "</td><td><button class=\"mapButton\"" +
                      "onclick=\"window.open('https://www.google.com/maps/dir/?api=1&destination=University of California, San Diego')\">" + 
                      "<p>Go!</p></button></td></tr>"
          $("#table_id").append(markup);
    });

    $('#table_id').DataTable();
  });
});