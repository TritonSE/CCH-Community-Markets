if (sessionStorage.getItem('loggedIn') != "true") {location.href = "/admin-login";}

// let markets = $('#table_id').DataTable();
let assessmentArray = new Array();
function redirectFunction(choice){
  console.log(choice.text);
  console.log("Function Entered");
  sessionStorage.setItem("marketName",choice.text);
  location.href='marketdata';
}

$(document).ready( function () {
  $('#table_id').DataTable();
});