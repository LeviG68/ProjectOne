
$(document).ready(function(){
  jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });

function yelpPage () {
    
}



// API for google fireBase 
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDsMZ84nY4hXBtdEdJCTwerq-Iw8Tph9yk",
    authDomain: "projectone-1d28f.firebaseapp.com",
    databaseURL: "https://projectone-1d28f.firebaseio.com",
    projectId: "projectone-1d28f",
    storageBucket: "projectone-1d28f.appspot.com",
    messagingSenderId: "1026694530340"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var email ;
  var password ;
  // linked to the Sign Up field for the landing page
  $("#submit").on('click', function(){
    event.preventDefault()
     email = $("#email").val().trim();
     password = $("#password").val().trim();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      console.log(error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      }
      console.log(errorCode);
      console.log(errorMessage);
      // ...
      database.ref().push({
        email: email,
        password: password,
      }); 
    });
    
    console.log(email);
    console.log(password);

  
  })
  // linked to the Sign In field for the landing page
  $("#signIn").on('click', function(event){
    console.log('hi mom');
    event.preventDefault();
      email = $("#signInemail").val().trim();
      password = $("#signInpassword").val().trim();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      console.log(error);
       // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
      // ...
      console.log($(this));
    });
    console.log($(this));
    console.log(email);
    console.log(password);
    
  })
  // database.ref().on("child_added", function(childSnapshot){
  //   var email = childSnapshot.val().email

  //   var password = childSnapshot.val().password
  // })
  
});