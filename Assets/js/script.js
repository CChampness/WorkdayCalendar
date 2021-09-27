const managedHours = [7,8,9,10,11,12,1,2,3,4,5,6];
const numHours = managedHours.length;
var dateTime = $('#currentDay');
// console.log("dateTime:" + dateTime(text));

function updateTimeBlocks(currentHour) {
  console.log("updateTimeBlocks " + currentHour);
  for(var pos=0; managedHours[pos] != currentHour; pos++);
  for(var i=0; i<numHours; i++) {
    var hour = managedHours[i];
    console.log("hour:"+hour);
    if (i < pos) {
      // Change color for past hours to gray
      console.log("less than hour:"+hour);
      $("#" + hour).removeClass("present");
      $("#" + hour).removeClass("future");
      $("#" + hour).addClass("past");
    } else if (i == pos) {
      // Change color for currentHour to red
      console.log("equal hour:"+hour);
      $("#" + hour).removeClass("past");
      $("#" + hour).removeClass("future");
      $("#" + hour).addClass("present");
    } else {
      // Change color for future hours to green
      console.log("more than hour:"+hour);
      $("#" + hour).removeClass("past");
      $("#" + hour).removeClass("present");
      $("#" + hour).addClass("future");
    }
  }
}

function minuteCounter() {
  var currentTime;
  var lastHour = 
  currentTime = moment().format("MMMM Do, YYYY h:mm A");
  console.log(currentTime);
  dateTime.text(currentTime);

  currentHour = moment().format("hh");
  var lastHour = currentHour;
  console.log("lastHour:" + lastHour+", currentHour:" +currentHour);
 
  // Use the `setInterval()` to go off every minute
  var timeInterval = setInterval(function() {
        
    currentTime = moment().format("MMMM Do, YYYY h:mm A");
    console.log(currentTime);

    // Set the time display in the header
    dateTime.text(currentTime);
    if (lastHour != currentHour) {
      // The hour has rolled over, so handle the timeblock updates
      updateTimeBlocks(currentHour);
      lastHour = currentHour;
    }
    currentHour = moment().format("hh");
    console.log("lastHour:" + lastHour+", currentHour:" +currentHour);
  }, 60000);  // 1 minute
  }

  function setupRows(numHours){
    var containerEl = $('.container');
    for (var i=0; i<numHours; i++){
      var t = $(document.createElement('div'))
      var rowEl = containerEl.append("<div class='row time-block'>newrow</div>").children();
      console.log(rowEl);
      // rowEl.append(t);
      let hourEl = rowEl.append("<div>hour</div>");
      console.log(hourEl);
      console.log(rowEl);
      // let eventEl = rowEl.appendChild("<div>event</div>");
      // let saveBtnEl = rowEl.appendChild("<div>save</div>");

      // var rowEl = containerEl.append("<div class='row time-block'>newrow</div>");
      // var hourEl = rowEl.append("<div class='col col-2 hour'></div>");
      // var eventEl = rowEl.append("<div class='col col-7 description present'>event</div>");
      // var saveBtnEl = rowEl.append("<div class='col col-1 savebtn'>save</div>");
     
      // var rowEl = containerEl.add("div");
      // rowEl.addClass(["row", "time-block"]);
      // var hourEl = rowEl.add("div");
      // hourEl.addClass(["col", "col-2", "hour"]);
      // var eventEl = rowEl.add("div");
      // hourEl.addClass(["col", "col-7", "description", "present"]);
      // var saveBtnEl = rowEl.add("div");
      // saveBtnEl.addClass(["col", "col-1", "saveBtn"]);
      console.log("setupRows:"+i);
    }
  }

  function saveEvent(hour) {
    console.log("saveEvent " + hour);
  }

  var currentHour = moment().format("hh");
  updateTimeBlocks(currentHour);

  minuteCounter();
  // setupRows(numHours);