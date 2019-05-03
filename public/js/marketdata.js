var marketName = sessionStorage.getItem("marketName");

$(document).ready(function() {
    console.log("Redirect Worked");
    console.log(marketName);
    console.log(sessionStorage);
    
    $('.text-dark').append(marketName);
});