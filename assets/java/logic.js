$(document).ready(function() {
  var timeNow = moment().format("HH:mm");
  console.log(timeNow);
  var firebaseConfig = {
    apiKey: "AIzaSyB7ht4A5yBgW4YNyrZlz3jCrB4qWPoM594",
    authDomain: "train-times-4030b.firebaseapp.com",
    databaseURL: "https://train-times-4030b.firebaseio.com",
    projectId: "train-times-4030b",
    storageBucket: "train-times-4030b.appspot.com",
    messagingSenderId: "471412711652",
    appId: "1:471412711652:web:5e6a89df906bb2bc"
  };

  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  $("#sign_in").on("click", function() {
    var provider = new firebase.auth.GithubAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(token);
        console.log(user);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        // console.log(error.code);
        // console.log(error.message);
      });
  });

  $("#sign_out").on("click", function() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
      });
  });
  database.ref().on("child_added", function(childSnapshot) {
    var frequency = childSnapshot.val().frequency;
    var firstTime = moment(childSnapshot.val().firstDepart, "hh:mm").subtract(
      1,
      "years"
    );
    var diffTime = moment().diff(moment(firstTime), "minutes");

    var tRemaining = diffTime % frequency;

    var tillNextTrain = frequency - tRemaining;

    var nextArr = moment().add(tillNextTrain, "minutes");
    $("table")
      .find("tbody")
      .append(
        [
          "<tr>",
          "<td>" + childSnapshot.val().trainName + "</td>",
          "<td>" + childSnapshot.val().destination + "</td>",
          "<td>" + childSnapshot.val().frequency + "</td>",
          "<td>" + moment(nextArr).format("hh:mm") + "</td>",
          "<td>" + tillNextTrain + "</td>",
          "</tr>"
        ].join("")
      );
  });

  $("#submit").on("click", function(e) {
    e.preventDefault();
    var trainName = $("#NewTrainName")
      .val()
      .trim();
    var destination = $("#NewDestination")
      .val()
      .trim();
    var frequency = $("#NewFrequency")
      .val()
      .trim();
    var firstDepart = $("#NewFirstDeparture")
      .val()
      .trim();
    var firstTime = moment(firstDepart, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTime), "minutes");
    // console.log("time difference " + diffTime);
    var tRemaining = diffTime % frequency;
    // console.log("remainder " + tRemaining);
    var tillNextTrain = frequency - tRemaining;
    // console.log("NEXT " + tillNextTrain);
    var nextArr = moment().add(tillNextTrain, "minutes");

    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      firstDepart: firstDepart
    });

    $("#NewTrainName").clear();
    $("#NewDestination").clear();
    $("#NewFrequency").clear();
    $("#NewFirstDeparture").clear();
  });
});
