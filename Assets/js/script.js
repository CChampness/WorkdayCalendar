var managedHours = [[7,""],[8,""],[9,""],[10,""],[11,""],[12,""],[1,""],[2,""],[3,""],[4,""],[5,""],[6,""]];
console.log(managedHours);
const numHours = managedHours.length;
var dateTime = $('#currentDay');

function updateTimeBlocks(currentHour) {
  console.log("updateTimeBlocks " + currentHour);
  // Get the position of the current hour in the array
  for(var pos=0; managedHours[pos][0] != currentHour; pos++);
  for(var i=0; i<numHours; i++) {
    var hour = managedHours[i][0];
    if (i < pos) {
      // Change color for past hours to gray
      $("#" + hour).removeClass("present");
      $("#" + hour).removeClass("future");
      $("#" + hour).addClass("past");
    } else if (i == pos) {
      // Change color for currentHour to red
      $("#" + hour).removeClass("past");
      $("#" + hour).removeClass("future");
      $("#" + hour).addClass("present");
    } else {
      // Change color for future hours to green
      $("#" + hour).removeClass("past");
      $("#" + hour).removeClass("present");
      $("#" + hour).addClass("future");
    }
  }
}

function getStoredEvents() {
  var trialList = JSON.parse(localStorage.getItem("eventList"));
    if (trialList) {
    // If trialList is NOT null, we want to collect everything in it.
    managedHours = trialList;
  }
  console.log(managedHours);
  // Display all of the saved events in the schedule
  for(var i=0; i<numHours; i++) {
    $("#input"+managedHours[i][0]).val(managedHours[i][1]);
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
 
  // Use the setInterval() to go off every minute
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
    console.log("saveEvent " + $("#" + hour).val());
    var text = $("#input"+hour).val();
    console.log("text: " + text);
    // Find index of the hour
    for(var pos=0; managedHours[pos][0] != hour; pos++);
    managedHours[pos][1] = text;
    localStorage.setItem("eventList", JSON.stringify(managedHours));
  }

  var currentHour = moment().format("hh");
  updateTimeBlocks(currentHour);
  getStoredEvents();
  minuteCounter();
  