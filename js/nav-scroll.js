var $ = require("jquery");
//Navbar scroll color
var navScroll = $(document).ready(function() {
    $(window).scroll(function() {
        // When user scroll more than 60, add .navbar-transparent-onscroll
        if ($(document).scrollTop() > 70) {
            $(".navbar-transparent").addClass("navbar-transparent-onscroll");
        } else {
            $(".navbar-transparent").removeClass("navbar-transparent-onscroll");
        }

    });

});

module.exports = navScroll;