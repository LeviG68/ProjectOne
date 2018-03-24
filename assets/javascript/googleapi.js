
jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

// var cityState = $("#cityState").val().trim();
// console.log(cityState);
$("#search").on("click", function(event) {

    var eventCity =  $("#cityState").val().trim();

    $("#google").empty();

function displayGoogleShit() {

    var photoURL;
    var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+" + eventCity + "&key=AIzaSyBn6PzPT-RYHgpew4rKmVGIvENHjQo8-YU";
    
    // var postalCode =  $("#zip").val().trim();
   

    $.ajax({
        url: queryURL,
        method: "GET"
      })

      .then(function(response) {
        // console.log(info);
        console.log(response);

        // for (var i =0; i < 10; i++) {

        infoToPage(0);
        function infoToPage(i) {

           setTimeout(function() {

           var photoRef = response.results[i].photos[0].photo_reference;
           var apiKey = "&key=AIzaSyBn6PzPT-RYHgpew4rKmVGIvENHjQo8-YU"       
            
           photoURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photoRef + apiKey;

        //    create event list 
            var container = $("<div class='eventGoogleResults'>");
            var row1  = $("<tr>");
            var row2  = $("<tr>");
            var row3  = $("<tr>");
            var row4  = $("<tr>");
            var row5  = $("<tr>");

            var pic = $("<img>").attr("src", photoURL);
            // console.log(response.results[i].name);
            var bizName = $("<tr class='restTitle'>").text(response.results[i].name );
            // console.log(response.results[i].price_level)
            var pricing = $("<tr>").text("Price Rating: " + response.results[i].price_level);
            // console.log(response.results[i].formatted_address);
            var bizAddess = $("<tr>").text("Address: " + response.results[i].formatted_address)
            // console.log(response.results[i].rating);
            var googleRating = $("<tr>").text("Google Rating: " + response.results[i].rating);
            // var googPlaceBlank = response.results[i].photos[0].html_attributions;
            // $(googPlaceBlank).attr("target", "blank");
            // var googPlacesSite = $("<tr>").html("Google Places Link: " + googPlaceBlank);
            var googPlacesSite = $("<tr>").html("Google Places Link: " + response.results[i].photos[0].html_attributions);
            // console.log(response.results[i].photos[0].html_attributions);

            row1.append(bizName)
            row2.append(pricing)
            row3.append(googleRating)
            row4.append(bizAddess)
            row5.append(googPlacesSite)
            var infoGoogDiv = $("<div class='infoGoogDiv'>").append(row1, row2, row3, row4, row5);
            
            container.append(pic, infoGoogDiv);

            $("#google").prepend(container);


            if (i >= 10) {
                return;
            }
            
            else {
                infoToPage(i + 1);
            }

            }, 1000);
            

        }
        
      });
      
    }
    displayGoogleShit()
});

