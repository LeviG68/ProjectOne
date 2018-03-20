
jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

// var cityState = $("#cityState").val().trim();
// console.log(cityState);
function displayGoogleShit() {
    
    var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+littleton+colorado&key=AIzaSyBn6PzPT-RYHgpew4rKmVGIvENHjQo8-YU"

   

    $.ajax({
        url: queryURL,
        method: "GET"
      })

      .then(function(response) {
        // console.log(info);
        // console.log(response);

        for (var i =0; i < response.results.length; i++) {
            var row = $("<tr>");
            // console.log(response.results[i].name);
            var bizName = $("<td>").text(response.results[i].name);
            // console.log(response.results[i].price_level)
            var pricing = $("<td>").text(response.results[i].price_level);
            // console.log(response.results[i].formatted_address);
            // console.log(response.results[i].rating);
            var googleRating = $("<td>").text(response.results[i].rating);

        row.append(bizName, googleRating, pricing)
        $("#google").append(row);

        }
        
      });
      
}

displayGoogleShit()