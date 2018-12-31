//makes sure that nav-link clicked stays highlighted
$(function(){
    $('a.nav-link').filter(function(){return this.href==location.href}).parent().addClass("active").siblings().removeClass("active");
});
