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

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().firstDepart);
    var frequency = childSnapshot.val().frequency;
    var firstTime = moment(childSnapshot.val().firstDepart, "hh:mm").subtract(
      1,
      "years"
    );
    var diffTime = moment().diff(moment(firstTime), "minutes");
    console.log("time difference " + diffTime);
    var tRemaining = diffTime % frequency;
    console.log("remainder " + tRemaining);
    var tillNextTrain = frequency - tRemaining;
    console.log("NEXT " + tillNextTrain);
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
    console.log("time difference " + diffTime);
    var tRemaining = diffTime % frequency;
    console.log("remainder " + tRemaining);
    var tillNextTrain = frequency - tRemaining;
    console.log("NEXT " + tillNextTrain);
    var nextArr = moment().add(tillNextTrain, "minutes");
    console.log("ARRIVAL " + moment(nextArr).format("hh:mm"));
    console.log(trainName);
    console.log(destination);
    console.log(firstDepart);
    console.log(frequency);
    // $("table")
    //   .find("tbody")
    //   .append(
    //     [
    //       "<tr>",
    //       "<td>" + trainName + "</td>",
    //       "<td>" + destination + "</td>",
    //       "<td>" + frequency + "</td>",
    //       "<td>" + moment(nextArr).format("hh:mm") + "</td>",
    //       "<td>" + tillNextTrain + "</td>",
    //       "</tr>"
    //     ].join("")
    //   );
    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      firstDepart: firstDepart
    });
  });
});
