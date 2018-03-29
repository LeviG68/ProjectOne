$(document).ready(function(){
    $('#tabsContainer').tabs();
    //     onShow: function(tab) {
    //     $("ul.tabs").tabs();
    //  }
    $("#tabsContainer").hide();
    $("#googleRest").hide();
    $("#dateEvent").hide();
    

    $("#search").on("click", function(){
        $("#intro").hide();
        $("#tabsContainer").show();
        restaurantShow();
        $("#dateEvent").show();
    });

    $("#restTab").on("click", function(){
        restaurantShow();
    });

    function restaurantShow() {
        $("#googleRest").show();
        $("#dateEvent").hide()
    }

    $("#eventTab").on("click", function(){
        $("#dateEvent").show();
        $("#googleRest").hide();
    })

    // Pagination code

    // $('#google').easyPaginate({
    //     paginateElement: 'tr',
    //     elementsPerPage: 3,
    //     // effect: 'climb'
    // });

    // $('#google').easyPaginate({
    //     paginateElement: 'tr',
    //     elementsPerPage: 3,
    //     // effect: 'climb'
    // });

    // $('.tabs').tabs();
   
  
})