
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
  var error ;
  var error2 ;
  // linked to the Sign Up field for the landing page
  $("#submit").on('click', function(event){
    event.preventDefault();
    // console.log("sup");
    
      email = $("#email").val().trim();
      password = $("#password").val().trim();
      console.log(email);
      console.log(password);
      
      firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(error) {
        console.log("then");
      // Handle Errors here.
      //  var errorCode = error.code;
          var errorMessage = error.message;
          // 3/27 cant get the errors to show for create user email and password
          // console.log(error);
          // console.log(errorMessage);
        console.log("Welcome");
        $("#welcome").text("Welcome to Dat[R]");
        welcome();
         
           
      }).catch(function(error) { 
        console.log(error);
        error = error.code;

        console.log(error);

        if (error === "auth/weak-password" || error === 400){
         $("#noSignInPassword").show();
         $("#noSignInPassword").text("Please enter in a Password 6 characters or longer!");
         
         noSignInEmail();
       } 
       if ( password === "" ){
         $("#noSignInPassword").show();
         $("#noSignInPassword").text("Please enter in a Password 6 characters or longer!");
         
         noSignInEmail();
       } 
       if (error === "auth/invalid-email" || email === "") {
         $("#noSignInEmail").text('The email address is badly formatted. Make sure you have @ or .com');
         $("#noSignInEmail").show();
       signInEmail();
 
        }
        if (error === "auth/email-already-in-use") {
          $("#noSignInEmail").text('The email already in use, Please pick another one!');
          $("#noSignInEmail").show();
        signInEmail();
  
         }
      })
      // console.log(errorCode);
      // console.log(errorMessage);
      // ...
      database.ref().push({
        email: email,
        password: password,
      }); 
    });

    
    // console.log(email);
    // console.log(password);

  
  // linked to the Sign In field for the landing page
  $("#signIn").on('click', function(event){
    console.log('hi mom');
    var user = firebase.UserInfo;
    // var credential = result.credential;
     console.log(user);
      console.log(event); 
      event.preventDefault();
        email = $("#signInemail").val().trim();
        password = $("#signInpassword").val().trim();

    if (email === ""){
      $("#emailErrormessage").text("Asshole");
      $("#emailErrormessage").show();
      noshowemail();
    } 
    if (password === ""){
      $("#passWorderror").text("Shit");
      $("#passWorderror").show();
      noshowpassword();
    } 
  
    
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(response){
        console.log('then');
        if (response){
          window.location.href = "index.html";
          
        }
  
        console.log(response);
        
      })
      .catch(function(error) {
        // console.log(success);
        console.log(error);
        
        
        if (error.code=== "auth/user-not-found") {
          $("#emailErrormessage").text('E-mail not found, please verify your E-mail address');
          $("#emailErrormessage").show();
          verifyemail();


        } else if(error.code=== "auth/wrong-password") {
      
          if (($(password).val(""))){
            $("#passWorderror").text("Shit")
            $("#passworderror").show();
            noshowpassword();
          }
          if (error.code=== "auth/wrong-password" && (password)){
            $("#passWorderror").text('Password not found , please verify Password');
            $("#passWorderror").show();
              verifypassword();
          }
          }
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;        
      });  
  });
})


  function verifyemail(){
    setTimeout(function(){
      $("#emailErrormessage").hide();  
      
    }, 3000);
  }
  function verifypassword(){
    setTimeout(function(){
      $("#passWorderror").hide();  
      
    }, 3000);
  }
  function noshowemail(){
    setTimeout(function(){
      $("#emailErrormessage").hide();  
      
    }, 3000);
  }
  function noshowpassword(){
    setTimeout(function(){
      $("#passWorderror").hide();  
      
    }, 3000);
  }
  function noEmail(){
    setTimeout(function(){
      $("#noSignInEmail").hide(); 

    }, 3000);
  }
  function noSignInEmail(){
    setTimeout(function(){
      $("#noSignInPassword").hide(); 

    }, 3000);
  }
  function signInEmail(){
    setTimeout(function(){
      $("#noSignInEmail").hide(); 

    }, 3000);
  }
  function welcome(){
    setTimeout(function(){
      window.location.href = "index.html";

    }, 3000);
  }