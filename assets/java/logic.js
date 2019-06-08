var timeNow = moment().format("HH:mm");
console.log(timeNow);
$(document).ready(function(){
    $("#submit").on("click", function(e){
        e.preventDefault();
        var trainName = $("#NewTrainName").val().trim();
        var destination = $("#NewDestination").val().trim();
        var frequency = $("#NewFrequency").val().trim();
        var firstDepart = $("#NewFirstDeparture").val();
        console.log(trainName);
        console.log(destination);
        console.log(frequency);
        console.log(firstDepart);
        $(".table").append("<tr/", {
            td: trainName,
            td: destination,
            td: frequency,
            })
    })
})