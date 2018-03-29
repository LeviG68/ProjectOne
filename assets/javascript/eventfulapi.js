//bypass cors
  jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
      }
    });
 
//eventful api call   
var apiKey = "&app_key=8BZTgpMGJnMV5sF4";
var eventCity;
var sort = "&sort_order=popularity"; 
var distance;
var postalCode;
var eventFound = false;
// console.log(eventCity)
var catId = [
            "music",
            "comedy",
            // "family_fun_kids",
            // "festivals_parades",
            "movies_film",
            "art",
            "attractions",
            "singles_solcial",
            // "outdoors_recreation",
            "performing_arts",
            "sports"
            ]

var lat;
var lng;
var geoCode;
var errorMessage;
var eventVenueName;
var mapUrl;


  // get distance value
  $("#d5").on("click", function(event) {
    distance = 5;
    console.log("distance" + distance)
  });
  $("#d10").on("click", function(event) {
    distance = 10;
    console.log("distance" + distance)
  });
  $("#d25").on("click", function(event) {
    distance = 25;
    console.log("distance" + distance)
  });
  $("#d50").on("click", function(event) {
    distance = 50;
    console.log("distance" + distance)
  });


$("#search").on("click", function(event) {
  $("#event").empty();
  // console.log("click worked")
  eventCity =  $("#cityState").val().trim();

  // postalCode =  $("#zip").val().trim();

  if (!distance){
    errorMessage = $("#error").text("Please select a distance to increase the accuracy of your results and try your search again!");
    $("#error").show();
    function verifyDistance() {
      setTimeout(function(){
        $("#error").hide();;
         }, 3000);
    }
    verifyDistance();
  }

  

  var queryURL = "http://api.eventful.com/json/events/search?" + apiKey + "&location=" +  eventCity + "&category=" + catId + "&date=Today" + sort + "&within=" + distance;


// onclick search for an event       
    $("#search").on("click", function(event) {
      $("#event").empty();
// if a distance is not selected poulate an error message but still allow search      
          if (!distance){
              errorMessage = $("#error").text("Please select a distance to increase the accuracy of your results and try your search again!");
                $("#error").show();
                  function verifyDistance() {
                    setTimeout(function(){
                    $("#error").hide();;
                  }, 3000);
                }
              verifyDistance();
            }
  
    eventCity =  $("#cityState").val().trim();
    
    var queryURL = "http://api.eventful.com/json/events/search?" + apiKey + "&location=" +  eventCity + "&category=" + catId + "&date=Today" + sort + "&within=" + distance;

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
          var data = response;
          var result = JSON.parse(response);
        
        // when serach is clicked if there are no results or no city, state is typed it, pop an error and stop serach 
          if (result.events == null || eventCity=="") {    
              errorMessage = $("#error").text("Please enter a vaild City, State and try your search again");
              $("#error").show();
                function verifyCitystate() {
                  setTimeout(function(){
                    $("#error").hide();;
                  }, 3000);
                }
                verifyCitystate();
            }
            else {
              for (j=0; j < data.length; j++) {
                lat = parseFloat(result.events.event[j].latitude);
                lng = parseFloat(result.events.event[j].longitude);
                geoCode =result.events.event[j].geocode_type;
                var eveUrl = result.events.event[j].url;
                var venueUrl = result.events.event[j].venue_url
                //create event list 
                  var container = $("<div id='eventResults'>");
                  var row1  = $("<tr>");
                  var row2  = $("<tr>");
                  var row3  = $("<tr>");
                  var row4  = $("<tr>");
                  var row5  = $("<tr>");
                  var mapcont = "map" + j;
                  var maps = $("<div class='maps' id='" + mapcont +"' >");
                  var eventTitle =  result.events.event[j].title;
                  var event =  $("<tr class='restTitle'>").html(eventTitle)
                  var eventUrl = "<a href="  + eveUrl + " target='_blank'>Event Website</a>" + " | ";
                  eventVenueName = result.events.event[j].venue_name;
                  var eventVenue = $("<tr>").html("Where: " + eventVenueName);
                  var venueUrl = "<a href="  + venueUrl + " target='_blank'>Venue Website</a>" + " | ";
                  mapUrl ="<a href=https://maps.google.com?saddr=Current+Location&daddr=" + lat + "," + lng + " target='_blank'>Directions</a>";

                  var eventCity = result.events.event[j].city_name + ", ";
                // if event city is null or missing or null dispaly a space  
                      if (eventCity === null) {
                            eventCity =" ";
                        }
                      else {
                          eventCity = result.events.event[j].city_name + ", ";
                        }

                  var eventState = result.events.event[j].region_abbr + ", ";
                // if event city is null or missing or null dispaly a space  
                      if (eventState === null) {
                            eventState =" ";
                        }
                      else {
                          eventState =  result.events.event[j].region_abbr + ", ";
                        }

                  var eventZipCode = result.events.event[j].postal_code;
                // if event zip is null or missing or null dispaly a space 
                      if (eventZipCode === null) {
                          eventZipCode =" ";
                        }
                      else {
                          eventZipCode =  result.events.event[j].postal_code;
                        }
                  
                  var eventAddr = result.events.event[j].venue_address;
                  // if event adress is null or missing or null dispaly a space 
                      if (eventAddr === null) {
                          eventAddr =" ";
                        }
                      else {
                          eventAddr = result.events.event[j].venue_address + ", ";
                        }

                  var eventStart = moment(result.events.event[j].start_time).format("MMMM DD YYYY, h:mm A");
                  var eventAdress = $("<tr>").text("Address: " + eventAddr + eventCity + eventState + eventZipCode);
                  var eventDateTime = $("<tr>").text("When: " + eventStart);
                  var eventImg = result.events.event[j].image;
                  var eventImage;
                  //create a list of images to use when is not provided by the eventful api
                  var palceholderpics = [
                    "assets/images/pexels-photo-89485.jpeg",
                    "assets/images/pexels-photo-421927.jpeg",
                    "assets/images/pexels-photo-450597.jpeg",
                    "assets/images/pexels-photo-700975.jpeg",
                    "assets/images/pexels-photo-771881.jpeg",
                    "assets/images/pexels-photo-90440.jpeg",
                    "assets/images/pexels-photo-92870.jpeg",
                    "assets/images/pexels-photo-178996.jpeg",
                    "assets/images/pexels-photo-357275.jpeg",
                    "assets/images/pexels-photo-247620.jpeg",
                    "assets/images/pexels-photo-269126.jpeg",
                    "assets/images/pexels-photo-128428.jpeg",
                    "assets/images/pexels-photo-261828.jpeg",
                    "assets/images/woman-bench-stand-by-blonde-157622.jpeg",
                    "assets/images/cup-tee-teacup-glass-cup-39471.jpeg",
                    "assets/images/pexels-photo-897232.jpeg"
                  ]
                  var randPic = palceholderpics[Math.floor(Math.random() * palceholderpics.length)];

              //check for an image, if there is not one, place a stock image
                  if (eventImg != null) {
                        eventImage = $("<img>").attr("src","http:" + result.events.event[j].image.medium.url);
                      }
                    else {
                        eventImage = $("<img>").attr("src", randPic);
                      }
                    
              //display results 
                    row1.append(event)
                    row2.append(eventVenue)
                    row3.append(eventAdress)
                    row4.append(eventDateTime)
                    row5.append(eventUrl, venueUrl, mapUrl)
                    var infoDiv = $("<div class='infoDiv'>").append(row1, row2, row3,row4, row5)
                    var row6  = $("<tr class='imgInfo'>");
                    row6.append(eventImage, maps)
                    container.append(row6, infoDiv)
                    $("#event").append(container);
                // create map for each result            
                    initMap(lat, lng, mapcont);
              }
            }
          });
        });
      });      

// create a map from googel maps for each event
    function initMap(lat,lng,mapcont) {
      var maper = new google.maps.Map(document.getElementById(mapcont), {
        zoom: 15,
        center: {lat: lat, lng: lng}
        });
    
      var marker = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: maper,
        title: eventVenueName
        });
      }