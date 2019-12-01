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
  // set the variables to load from the google API
  var calendarId = "a2ftwayne@gmail.com";
  var apiKey = "AIzaSyAOD2s7_35TG9z_Xxu_cAE1oS6wNzLnZso";
  var userTimeZone = "Indianapolis";

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
        maxResults: 4,
        orderBy: "startTime"
      });
    })
    .then(
      function(response) {
        if (response.result.items) {
          var i = 1;
          var calendarRows = [];
          //Split the response in to an array for fromatting
          response.result.items.forEach(function(entry) {
            var dateAt = moment(entry.start.dateTime)
              .format("L")
              .split("/");
            // Replace the month number with corresponding name
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

            // Declare the variables for each API result
            var startsAt = moment(entry.start.dateTime).format("LT");
            var endsAt = moment(entry.end.dateTime).format("LT");
            var testLink = moment(entry.htmlLink).format("L");
            var imgTitle;
            var evtDesc;

            // Assign the corresponding image and desc based on event title
            if (entry.summary == "FORTNITE FRIDAY") {
              console.log(testLink);
              imgTitle = "fortnite.jpg";
              evtDesc =
                "Join us for our weekly Fortnite scrim tournament. Players will team up in groups of two and will have either 2 hours or 6 games (whichever ends sooner) to make it to the top of the bracket. Cash prizes are awarded to the top 3 contestants. $10 entry fee. Cash prize is dependent on the number of entries.";
            } else if (entry.summary == "SUPER SMASH BRACKETS") {
              imgTitle = "ssb.jpg";
              evtDesc =
                "It's every player for themselves in our weekly Smash Bros. tournaments every Wednesday 5:30pm to 8:30pm. Competitors will be randomly assigned a bracket and face off in 5 stock, 10 minute matches to reach the top. Prizes for the top 3 contestants and there's a $10 entry fee. Prizes are dependent on number of entries.";
            } else if (entry.summary == "LEAUGE OF LEGENDS TOURNAMENT ") {
              imgTitle = "lol.jpg";
              evtDesc =
                "Grab your friends to form a League of Legends team and compete in our Saturday League of Legends tournament. 5 man teams will play through a bracket (best of 1) and the top 3 teams will split the prize pool. Each player has a $10 entry fee, $50 for your team. Prizes dependent on number of entries.";
            } else if (entry.summary == "2v2 TUESDAY - Call of Duty") {
              imgTitle = "cod.jpg";
              evtDesc =
                "Bring your friend to our 2v2 Call of Duty tournament every other Tuesday from 4pm to 9pm. Two man teams will play through the brackets and compete for prizes, our top 3 teams will collect prizes from the prize pool. Entry fee is $20 per team and prizes are based on number of entries.";
            } else if (entry.summary == "2V2 TUESDAY - Counter Strike") {
              imgTitle = "cs.jpg";
              evtDesc =
                "Come participate in our 2v2 Counter Strike tournament every other Tuesday from 4pm to 9pm. Two man teams will play through the brackets and compete for prizes, our top 3 teams will collect prizes from the prize pool. Entry fee is $20 per team and prizes are based on number of entries.";
            }
            // This is where the magic happens
            // We need this elif loop because the card will have it's own divs to style in row
            if (i == 1 || i == 3) {
              calendarRows.push(
                `<div class="container-fluid">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="event-card">
                        <img alt="Event image" src="Assets/${imgTitle}" />
                        <h2 class="evt-title">
                          ${entry.summary}
                        </h2>
                        <hr />
                        <h3>
                          ${monNam} ${dateAt[1]}｜${startsAt} - ${endsAt}
                        </h3>
                        <hr />
                        <p>
                          ${evtDesc}
                        </p>
                        <p>
                          <a class="btn" href="#">Contact us »</a>
                        </p>
                      </div>
                  </div>`
              );
            } else if (i == 2 || i == 4) {
              calendarRows.push(
                `<div class="col-md-6">
                <div class="event-card">
                  <img alt="Event image" src="Assets/${imgTitle}" />
                  <h2>
                  ${entry.summary}
                  </h2>
                  <hr />
                  <h3>
                    ${monNam} ${dateAt[1]}｜${startsAt} - ${endsAt}
                  </h3>
                  <hr />
                  <p>
                    ${evtDesc}
                  </p>
                  <p>
                    <a class="btn" href="#">Contact us »</a>
                  </p>
                </div>
              </div>
            </div>
            </div>`
              );
            }

            i = i + 1;
          });
          // join the calendarRows in the events div
          $("#events").html(calendarRows.join(""));
        }
      },
      // throw an error if occured
      function(reason) {
        console.log("Error: " + reason.result.error.message);
      }
    );
}

// Loads the JavaScript client library and invokes `start` afterwards.
gapi.load("client", printCalendar);

// Set the event listener
if (window.addEventListener) {
  //call init() on page load
  console.log("> Adding TC39 Event Listener...");
  window.addEventListener("load", printCalendar, false);
} else if (window.attachEvent) {
  console.log("> Adding MS Event Listener...");
  window.attachEvent("onload", printCalendar);
}
