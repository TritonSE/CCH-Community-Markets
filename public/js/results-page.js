
var level = "2";
var market = "99 Ranch";
var stringMarket = "Thank you for filling the assesment for "+ market + "."
var stringLevel = "The market is classified as level " + level + "."
$(document).ready(function() {
    $('.text-dark').append(stringMarket);
    $('.text-muted').append(stringLevel);
});