$(document).ready(function(){
    $("#tab").hide();
    $("#restaurant").hide();
    $("#dateEvent").hide();
    

    // $("#search").on("click", function(){
    //     restaurantsShow();
    // })

    $("#search").on("click", function restaurantsShow(){
        $("#intro").hide();
        $("#tab").show();
        $("#restaurant").show();
    });

    $('.tabs').tabs();



  });

function yelpPage () {
    
}