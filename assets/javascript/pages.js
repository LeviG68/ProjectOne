$(document).ready(function(){
    $("#tab").hide();
    $("#googleRest").hide();
    $("#dateEvent").hide();
    

    $("#search").on("click", function(){
        $("#intro").hide();
        $("#tab").show();
        restaurantShow();
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

    // $("#google").DataTable({
    //     "pagingType": "simple"
    // });

    $('#google').easyPaginate({
        paginateElement: 'tr',
        elementsPerPage: 3,
        // effect: 'climb'
    });

    $('#event').easyPaginate({
        paginateElement: 'tr',
        elementsPerPage: 3,
        // effect: 'climb'
    });

// var list = [];
// var pageList = [];
// var currentPage = 1;
// var numberPerPage = 2;
// var numberOfPages = 5;

// function newArray() {
//     var table = $('#google tr').length;
//     for (var i = 0; i < table; i++){
//         // var row = $('#google tr').i;
//         // var obj = {};
//         // obj.push(row + i: row);
//         list.push({i: $('#google tr')});
//     }
//     console.log(list);
    
    
// }
// newArray();

 

// function nextPage() {
//     currentPage += 1;
//     loadList();
// }

// function previousPage() {
//     currentPage -= 1;
//     loadList();
// }

// function loadList() {
//     var begin = ((currentPage - 1) * numberPerPage);
//     var end = begin + numberPerPage;

//     pageList = list.splice(begin, end);
//     drawList();
//     check();
// }
    
// function drawList() {
//     document.getElementById("list").innerHTML = "";
//     for (r = 0; r < pageList.length; r++) {
//         document.getElementById("list").innerHTML += pageList[r] + "<br/>";
//     }
// }

// function check() {
//     document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
//     document.getElementById("previous").disabled = currentPage == 1 ? true : false;
//     document.getElementById("first").disabled = currentPage == 1 ? true : false;
//     document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
// }

// function load() {
//     makeList();
//     loadList();
// }
  
})