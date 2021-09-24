const numHours=10;
var dateTime = $('#currentDay');
// console.log("dateTime:" + dateTime(text));

function minuteCounter() {
  var currentTime;
  var lastHour = 
  currentTime = moment().format("MMMM Do, YYYY h:mm A");
  console.log(currentTime);
  dateTime.text(currentTime);

  currentHour = moment().format("hh");
  var lastHour = currentHour;
  console.log("lastHour:" + lastHour+", currentHour:" +currentHour);
 
  function updateTimeBlocks() {
    // Change color for new currentHour to red
    // Change color for lastHour to gray
    console.log("updateTimeBlocks");
  }
  
  // Use the `setInterval()` to go off every minute
  var timeInterval = setInterval(function() {
        
    currentTime = moment().format("MMMM Do, YYYY h:mm A");
    console.log("currentTime:"+currentTime);
    // Set the time display in the header
    dateTime.text(currentTime);
    console.log("dateTime:" + dateTime.text());
    if (lastHour != currentHour) {
      // The hour has rolled over, so handle the timeblock updates
      updateTimeBlocks();
      lastHour = currentHour;
    }
    currentHour = moment().format("hh");
    console.log("lastHour:" + lastHour+", currentHour:" +currentHour);
  }, 60000);  // 1 minute
  }

  function setupRows(){
    var containerEl = $('#container');
    console.log(containerEl.text());
    for (var i=0; i<numHours; i++){
      var divEl = $("<div>").addClass("row time-block").text("AM/PM");
      console.log(divEl.text());
      containerEl.append(divEl);
      console.log("setupRows:"+i);
    }
  }

  minuteCounter();
  setupRows();