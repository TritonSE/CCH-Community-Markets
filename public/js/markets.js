if (sessionStorage.getItem('loggedIn') != "true") {location.href = "/admin-login";}

$(document).ready( function () {
  $('#table_id').DataTable();
});