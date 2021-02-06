
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDT6vGeYFgQJbuQvvtVQQHpuoKxcs5TDRE",
    authDomain: "geotagtext.firebaseapp.com",
    databaseURL: "https://geotagtext.firebaseio.com",
    projectId: "geotagtext",
    storageBucket: "geotagtext.appspot.com",
    messagingSenderId: "1071662476331"
};
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

firebase.database().ref('/').once('value').then(function(snapshot) {
   // console.log("snapshot",snapshot);
});


firebase.database().ref('/tags').once('value').then(function(snapshot) {
    //console.log("tags snapshot",snapshot);
    //console.log("tags val snapshot",snapshot.val());
});


firebase.database().ref('/appsrob').once('value').then(function(snapshot) {
    //console.log("appsrob snapshot",snapshot);
    //console.log("tags appsrob snapshot",snapshot.val());
});
