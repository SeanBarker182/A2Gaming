/* This solution makes use of "simple access" to google, providing only an API Key.
 * This way we can only get access to public calendars. To access a private calendar,
 * we would need to use OAuth 2.0 access.
 *
 * "Simple" vs. "Authorized" access: https://developers.google.com/api-client-library/javascript/features/authentication
 * Examples of "simple" vs OAuth 2.0 access: https://developers.google.com/api-client-library/javascript/samples/samples#authorizing-and-making-authorized-requests
 *
 * We will make use of "Option 1: Load the API discovery document, then assemble the request."
 * as described in https://developers.google.com/api-client-library/javascript/start/start-js
 */
function printCalendar() {
  // The "Calendar ID" from your calendar settings page, "Calendar Integration" secion:
  var calendarId = "a2ftwayne@gmail.com";

  // 1. Create a project using google's wizzard: https://console.developers.google.com/start/api?id=calendar
  // 2. Create credentials:
  //    a) Go to https://console.cloud.google.com/apis/credentials
  //    b) Create Credentials / API key
  //    c) Since your key will be called from any of your users' browsers, set "Application restrictions" to "None",
  //       leave "Website restrictions" blank; you may optionally set "API restrictions" to "Google Calendar API"
  var apiKey = "AIzaSyAOD2s7_35TG9z_Xxu_cAE1oS6wNzLnZso";
  // You can get a list of time zones from here: http://www.timezoneconverter.com/cgi-bin/zonehelp
  var userTimeZone = "Europe/Budapest";

  // Initializes the client with the API key and the Translate API.
  gapi.client
    .init({
      apiKey: apiKey,
      // Discovery docs docs: https://developers.google.com/api-client-library/javascript/features/discovery
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
      ]
    })
    .then(function() {
      // Use Google's "apis-explorer" for research: https://developers.google.com/apis-explorer/#s/calendar/v3/
      // Events: list API docs: https://developers.google.com/calendar/v3/reference/events/list
      return gapi.client.calendar.events.list({
        calendarId: calendarId,
        timeZone: userTimeZone,
        singleEvents: true,
        timeMin: new Date().toISOString(), //gathers only events not happened yet
        maxResults: 5,
        orderBy: "startTime"
      });
    })
    .then(
      function(response) {
        if (response.result.items) {
          var i = 1;
          var calendarRows = [];
          response.result.items.forEach(function(entry) {
            var dateAt = moment(entry.start.dateTime)
              .format("L")
              .split("/");
            if (dateAt[0] == 01) {
              monNam = "JAN";
            } else if (dateAt[0] == 02) {
              monNam = "FEB";
            } else if (dateAt[0] == 03) {
              monNam = "MAR";
            } else if (dateAt[0] == 04) {
              monNam = "APR";
            } else if (dateAt[0] == 05) {
              monNam = "MAY";
            } else if (dateAt[0] == 06) {
              monNam = "JUN";
            } else if (dateAt[0] == 07) {
              monNam = "JUL";
            } else if (dateAt[0] == 08) {
              monNam = "AUG";
            } else if (dateAt[0] == 09) {
              monNam = "SEP";
            } else if (dateAt[0] == 10) {
              monNam = "OCT";
            } else if (dateAt[0] == 11) {
              monNam = "NOV";
            } else if (dateAt[0] == 12) {
              monNam = "DEC";
            } else {
              monNam = "ERROR";
            }
            var startsAt = moment(entry.start.dateTime).format("LT");
            var endsAt = moment(entry.end.dateTime).format("LT");
            calendarRows.push(
              `<h3 class="event-box">
          <a id="date${i}" class="evt-mon">${monNam}</a
          ><a id="title${i}" class="evt-title">${entry.summary}</a><br /><a
            class="even-date"
            >${dateAt[1]}</a
          ><a id="time${i}" class="evt-time">${startsAt} - ${endsAt}</a>
        </h3>
      </div>`
            );
            i = i + 1;
          });
          $("#events").html(calendarRows.join(""));
        }
      },
      function(reason) {
        console.log("Error: " + reason.result.error.message);
      }
    );
}

// Loads the JavaScript client library and invokes `start` afterwards.
gapi.load("client", printCalendar);

if (window.addEventListener) {
  //call init() on page load
  console.log("> Adding TC39 Event Listener...");
  window.addEventListener("load", printCalendar, false);
} else if (window.attachEvent) {
  console.log("> Adding MS Event Listener...");
  window.attachEvent("onload", printCalendar);
}
