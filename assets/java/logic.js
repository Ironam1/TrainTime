$(document).ready(function() {
  var timeNow = moment().format("HH:mm");
  console.log(timeNow);
  function addTrain() {
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
      var firstTime = moment(firstDepart, "HH:mm").subtract(1, "years");
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
      $("table")
        .find("tbody")
        .append(
          [
            "<tr>",
            "<td>" + trainName + "</td>",
            "<td>" + destination + "</td>",
            "<td>" + frequency + "</td>",
            "<td>" + nextArr + "</td>",
            "<td>" + tillNextTrain + "</td>",
            "</tr>"
          ].join("")
        );
    });
    function getArr() {}
  }
  addTrain();
});
