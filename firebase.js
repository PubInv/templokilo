// Possibly merge this file into tagscript
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDT6vGeYFgQJbuQvvtVQQHpuoKxcs5TDRE",
    authDomain: "geotagtext.firebaseapp.com",
    databaseURL: "https://geotagtext.firebaseio.com",
    projectId: "geotagtext",
    storageBucket: "geotagtext.appspot.com",
    messagingSenderId: "1071662476331"
};

// probably this should be moved out as a call into builder.html and index.html
firebase.initializeApp(config);

firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode);
    console.log(errorMessage);
});

var ref = firebase.database().ref();
