// CORS Bypass
jQuery.ajaxPrefilter(function(options) {
  if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

//Global Variables
var bizName;
var G_Lat;
var G_Long;
var G_mapCont;
var G_mapRestName;
var G_distance;

//On click functions for distance search...
//NOTE: Google API restricts a maximum radius of 50,000m, hence duplicate distance at #d25 and #d50
$("#d5").on("click", function(event) {
  G_distance = 8047;
  // console.log("distance" + G_distance)
});
$("#d10").on("click", function(event) {
  G_distance = 16093;
  // console.log("distance" + G_distance)
});
$("#d25").on("click", function(event) {
  G_distance = 40233;
  // console.log("distance" + G_distance)
});
$("#d50").on("click", function(event) {
  G_distance = 40233;
  // console.log("distance" + G_distance)
});

//On Click Function for City,State Search
$("#search").on("click", function(event) {

  var eventCities =  $("#cityState").val().trim();

  $("#google").empty();

function displayGoogleShit() {

  var photoURL;
  //Due to limitations with API restrictions we cycle 4 google API's randomly into the two calls
  var apiArray = ["&key=AIzaSyBn6PzPT-RYHgpew4rKmVGIvENHjQo8-YU", "&key=AIzaSyA8-jku2dgDUp9EeXdbeNBksAM4JhOkAxc", "&key=AIzaSyAT4Nz9s8qxKvGCM80aQt-fCGlW4XzL3zs", "&key=AIzaSyBCHK89OFcTLSGG1uZBV9u-4Tc53NlqfTQ"];
  var apiKey = apiArray[Math.floor(Math.random() * apiArray.length)];    
  // var apiKey = "&key=AIzaSyBn6PzPT-RYHgpew4rKmVGIvENHjQo8-YU";
  // var apiKey2 = "&key=AIzaSyA8-jku2dgDUp9EeXdbeNBksAM4JhOkAxc";
  // var mapsAPIKey= "&key=AIzaSyAT4Nz9s8qxKvGCM80aQt-fCGlW4XzL3zs";
  // var apiKey3= "&key=AIzaSyBCHK89OFcTLSGG1uZBV9u-4Tc53NlqfTQ";
  var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+" + eventCities + "&radius=" + G_distance + apiKey;   

  $.ajax({
      url: queryURL,
      method: "GET"
    })

    .then(function(response) {
      // console.log(info);
      // console.log(response);

      // for (var i =0; i < 10; i++) {

      infoToPage(0);        

      function infoToPage(i) {

         setTimeout(function() {
          
          //Google Map Shit
          G_Lat = parseFloat(response.results[i].geometry.location.lat);
          G_Long = parseFloat(response.results[i].geometry.location.lng);
          // console.log(G_Lat);
          // console.log(G_Long);
          G_mapCont = "G_maps" + i;
          
          var G_maps = $("<div class='G_maps' id='" + G_mapCont +"' >")

        //
         var photoRef = response.results[i].photos[0].photo_reference;
        //  var apiKey = "&key=AIzaSyBn6PzPT-RYHgpew4rKmVGIvENHjQo8-YU"       
          
         photoURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photoRef + apiKey;

          //    create event list 
          var container = $("<div class='eventGoogleResults'>");
          var row1  = $("<tr>");
          var row2  = $("<tr>");
          var row3  = $("<tr>");
          var row4  = $("<tr>");
          var row5  = $("<tr>");

  
          var pic = $("<img>").attr("src", photoURL);
          
          G_mapRestName = response.results[i].name;
          bizName = $("<tr class='restTitle'>").text(response.results[i].name );
          // console.log(response.results[i].name);
          var priceRating = response.results[i].price_level;
            if (priceRating === null || priceRating === undefined) {
              priceRating = "No Price Rating Available";
            };
          var pricing = $("<tr>").text("Price Rating: " + priceRating);
          // console.log(response.results[i].price_level)
          var bizAddess = $("<tr>").text("Address: " + response.results[i].formatted_address)
          // console.log(response.results[i].formatted_address);
          var googleRating = $("<tr>").text("Google Rating: " + response.results[i].rating);
          // console.log(response.results[i].rating);
          var G_mapUrl ="<a href=https://maps.google.com?saddr=Current+Location&daddr=" + G_Lat + "," + G_Long + " target='_blank'>Directions</a>";

          var googPlacesSite = $("<tr>").html("Google Places: " + response.results[i].photos[0].html_attributions + " | " + G_mapUrl);
          // console.log(response.results[i].photos[0].html_attributions);
          

          row1.append(bizName)
          row2.append(pricing)
          row3.append(googleRating)
          row4.append(bizAddess)
          row5.append(googPlacesSite)

          //dynamically create a div in the Google Body
          var infoGoogDiv = $("<div class='infoGoogDiv'>").append(row1, row2, row3, row4, row5);
          var G_row6 = $("<tr class='imgInfo'>");
          G_row6.append(pic, G_maps);
          container.append(G_row6, infoGoogDiv);

          $("#google").append(container);
          //call google map function
         G_initMap(G_Lat,G_Long,G_mapCont);
         

          //safe guards in recursive function
          if (i >= 9) {
            paginateGoog();
              return;
          }
          
          else {
              infoToPage(i + 1);
              
          }


          }, 500);     
          
          
          
      }
      //end of info to page function (recursive)
        
    });
    //end of .then Function
    
  }
  // End of "displayGoogleShit" function
  displayGoogleShit();

  
  
});

//End of OnClick function
function paginateGoog() {
$('#google').easyPaginate({
  paginateElement: 'div.eventGoogleResults',
  elementsPerPage: 3,
  // effect: 'climb'
});

};

//Google Map Generation function called above when information is appended to the DOM
function G_initMap(G_Lat,G_Long,G_mapCont) {
  // console.log(G_mapRestName);
  var map = new google.maps.Map(document.getElementById(G_mapCont), {
    zoom: 15,
    center: {lat: G_Lat, lng: G_Long}
  });

  var markers = new google.maps.Marker({
    position: {lat: G_Lat, lng: G_Long},
    map: map,
    title: G_mapRestName
    
  });
}