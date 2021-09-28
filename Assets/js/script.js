var managedHours = [[7,""],[8,""],[9,""],[10,""],[11,""],[12,""],[1,""],[2,""],[3,""],[4,""],[5,""],[6,""]];
// console.log(managedHours);
const numHours = managedHours.length;
var dateTime = $('#currentDay');
var eventList = "eventList";

function updateTimeBlocks(currentHour) {
  // console.log("updateTimeBlocks " + currentHour);
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
  var trialList = JSON.parse(localStorage.getItem(eventList));
    if (trialList) {
    // If trialList is NOT null, we want to collect everything in it.
    managedHours = trialList;
  }
  // console.log(managedHours);
  // Display all of the saved events in the schedule
  for(var i=0; i<numHours; i++) {
    $("#input"+managedHours[i][0]).val(managedHours[i][1]);
  }
}

function minuteCounter() {
  var currentTime;
  var lastHour = 
  currentTime = moment().format("MMMM Do, YYYY h:mm A");
  // console.log(currentTime);
  dateTime.text(currentTime);

  currentHour = moment().format("hh");
  var lastHour = currentHour;
  // console.log("lastHour:" + lastHour+", currentHour:" +currentHour);
 
  // Use the setInterval() to go off every minute
  var timeInterval = setInterval(function() {
        
    currentTime = moment().format("MMMM Do, YYYY h:mm A");
    // console.log(currentTime);

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

////////// this is what we want each row to be
//   <div class="row time-block">
//   <div class="col col-1 hour">
//     6PM
//   </div>
//   <div id="6" class="col col-8 description future">
//     <textarea id="input6" rows=4 cols=50></textarea>
//   </div>
//   <div onclick="saveEvent(6)" class="col col-1 savebtn">
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16">
//     <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
//     </svg>
//   </div>
// </div>

  function setupRows(numHours){
    var containerEl = $('.container');
    for (var i=0; i<numHours; i++){
      // Get to the right index for this hour
      // console.log("managedHours: " +managedHours);
      // for(var ndx=0; managedHours[ndx][0] != i; ndx++);
      var rowEl = $(document.createElement("div"));
      rowEl.addClass("row time-block");
      containerEl.append(rowEl);

      var hourEl = $(document.createElement("div"));
      hourEl.addClass("col col-1 hour");
      hourEl.text(managedHours[i][0]);
      rowEl.append(hourEl);

      var eventEl = $(document.createElement("div"));
      eventEl.attr("id", managedHours[i][0]);
      eventEl.addClass("col col-8 description future");
      var textEl = $(document.createElement("textarea"));
      textEl.attr("id","input"+managedHours[i][0]);
      textEl.attr("rows","4");
      textEl.attr("cols","50");
      eventEl.append(textEl);
      rowEl.append(eventEl);

      var saveEl = $(document.createElement("div"));
      saveEl.attr("onclick", "saveEvent("+managedHours[i][0]+")");
      saveEl.addClass("col col-1 savebtn");

      var svgEl = $(document.createElement("svg"));
      svgEl.attr("xmlns","http://www.w3.org/2000/svg");
      svgEl.attr("width","16");
      svgEl.attr("height","16");
      svgEl.attr("fill","currentColor");
      svgEl.addClass("bi bi-save");
      svgEl.attr("viewBox","0 0 16 16");
      // Need path
      saveEl.append(svgEl);
      rowEl.append(saveEl);

      console.log(rowEl);
      console.log("setupRows:"+i);
    }
  }

  function clearSched() {
    localStorage.removeItem(eventList);
    $("textarea").val("");
  }

  function saveEvent(hour) {
    // console.log("saveEvent " + $("#" + hour).val());
    var text = $("#input"+hour).val();
    // console.log("text: " + text);
    // Find index of the hour
    for(var ndx=0; managedHours[ndx][0] != hour; ndx++);
    managedHours[ndx][1] = text;
    localStorage.setItem(eventList, JSON.stringify(managedHours));
   }

  var currentHour = moment().format("hh");
  setupRows(numHours);
  updateTimeBlocks(currentHour);
  getStoredEvents();
  minuteCounter();
  