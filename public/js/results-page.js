if (sessionStorage.getItem('loggedIn') != "true") {location.href = "/";}
var level = sessionStorage.getItem("lvl");
var market = sessionStorage.getItem("formname");
var stringMarket = "Thank you for filling the assesment for "+ market + "."
var stringLevel = "The market is classified as level " + level + "."
$(document).ready(function() {
    $('.text-dark').append(stringMarket);
    $('.text-muted').append(stringLevel);
});