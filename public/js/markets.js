if (sessionStorage.getItem('loggedIn') != "true") {location.href = "/admin-login";}

function redirectFunction(choice){
  location.href='marketdata/' + choice.text;
}

$(document).ready( function () {
  $('#table_id').DataTable();
});