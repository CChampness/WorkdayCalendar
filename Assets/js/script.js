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
    // Set the time display in the header
    dateTime.text(currentTime);
    if (lastHour != currentHour) {
      // The hour has rolled over, so handle the timeblock updates
      updateTimeBlocks();
      lastHour = currentHour;
    }
    currentHour = moment().format("hh");
    console.log("lastHour:" + lastHour+", currentHour:" +currentHour);
  }, 60000);  // 1 minute
  }

  function setupRows(numHours){
    var containerEl = $('.container');
    for (var i=0; i<numHours; i++){
      var rowEl = containerEl.append("<div>ROW</div>");
      console.log("row:" + i + " " +rowEl);
      rowEl.addClass(["row", "time-block"]);
      var hourEl = rowEl.append("<div>hours</div>");
      hourEl.addClass(["col", "col-2", "hour"]);
      var eventEl = rowEl.append("<div>event</div>");
      hourEl.addClass(["col", "col-7", "description", "present"]);
      var saveBtnEl = rowEl.append("<div>save</div>");
      saveBtnEl.addClass(["col", "col-1", "saveBtn"]);

      // rowEl.text("AM/PM");
      // console.log(rowEl.text());
      // containerEl.append(rowEl);
      console.log("setupRows:"+i);
    }
  }

  minuteCounter();
  setupRows(numHours);