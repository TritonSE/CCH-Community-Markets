var marketName = sessionStorage.getItem("marketName");

$(document).ready(function() {
    console.log("Redirect Worked");
    console.log(marketName);
    
    $('.text-dark').append(marketName);
});