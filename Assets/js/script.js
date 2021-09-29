var managedHours = [[7,"AM",""],[8,"AM",""],[9,"AM",""],[10,"AM",""],[11,"AM",""],
                    [12,"PM",""],[1,"PM",""],[2,"PM",""],[3,"PM",""],[4,"PM",""],[5,"PM",""],[6,"PM",""]];
const numHours = managedHours.length;
var currentTime;
var currentHour;
var ampm; // AM or PM of current time
var afterHours;  // Not in managed hours
var eventList = "eventList";
var dateTime = $('#currentDay');

// This function gets called once at the start of every hour
function updateTimeBlocks() {
  // Get the position of the current hour in the array
  var pos=0;
 for(;
    pos < numHours &&
    (managedHours[pos][0] != currentHour ||
     managedHours[pos][1] != ampm);
    pos++);

  // But if currentTime was not in the array of
  // managed hours, and the current time is "after hours".
  if (pos == numHours) {
    afterHours = true;
  } else {
    afterHours = false;
  }

  for(var i=0; i<numHours; i++) {
    var hour = managedHours[i][0];
    if (i < pos || afterHours) {
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
  var trialList = JSON.parse(localStorage.getItem(eventList));
    if (trialList) {
    // If trialList is NOT null, we want to collect everything in it.
    managedHours = trialList;
  }
   // Display all of the saved events in the schedule
  for(var i=0; i<numHours; i++) {
    $("#"+managedHours[i][0]).val(managedHours[i][2]);
  }
}

function minuteCounter() {
  // Initialize current time before doing anything else
  var lastHour = 
  currentTime = moment().format("MMMM Do, YYYY h:mm");
  ampm = moment().format("A");
  dateTime.text(currentTime + " " + ampm);

  currentHour = moment().format("hh");
  var lastHour = currentHour;
   
  // Use the setInterval() function to go off every minute
  var timeInterval = setInterval(function() {
    currentTime = moment().format("MMMM Do, YYYY h:mm");
    ampm = moment().format("A");
 
    // Set the time display in the header
    dateTime.text(currentTime + " " + ampm);
    if (lastHour != currentHour) {
      // The hour has rolled over, so handle the timeblock updates
      updateTimeBlocks();
      lastHour = currentHour;
    }
    currentHour = moment().format("hh");
  }, 60000);  // 1 minute
}

  function setupRows(numHours){
    var containerEl = $(".container");
    for (var i=0; i<numHours; i++){
      var rowEl = $("<div>");
      rowEl.addClass("row time-block");
      containerEl.append(rowEl);

      var hourEl = $("<div>");
      hourEl.addClass("col col-1 hour");
      hourEl.text(managedHours[i][0]+managedHours[i][1]);
      rowEl.append(hourEl);

      var eventEl = $("<textarea type='input'>");
      eventEl.attr("id", managedHours[i][0]);
      eventEl.addClass("col col-8 description past");
      eventEl.attr("id", managedHours[i][0]);
      eventEl.attr("rows","4");
      eventEl.attr("cols","50");
      rowEl.append(eventEl);

      var saveEl = $("<div>");
      saveEl.attr("onclick", "saveEvent("+managedHours[i][0]+")");
      saveEl.addClass("col col-1 savebtn");

      var iconEl = $("<i class='fas fa-save'></i>");              
      saveEl.append(iconEl);
      rowEl.append(saveEl);
    }
  }

  function clearSched() {
    localStorage.removeItem(eventList);
    $("textarea").val("");
  }

  function saveEvent(hour) {
    var text = $("#"+hour).val();
    // Find index of the hour
    for(var ndx=0; managedHours[ndx][0] != hour; ndx++);
    managedHours[ndx][2] = text;
    localStorage.setItem(eventList, JSON.stringify(managedHours));
   }

  minuteCounter();
  setupRows(numHours);
  updateTimeBlocks();
  getStoredEvents();
  