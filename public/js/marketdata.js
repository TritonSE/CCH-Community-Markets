var marketName = sessionStorage.getItem("marketName");

$(document).ready(function() {
    $('.text-dark').append(marketName);
});