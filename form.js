// Author: Sean Barker
// Date:   December 07, 2019
// Description: A2 form validation
"use strict"; //Operate in Strict mode

//**Global Variables
var formValidity = true;
var errMsgDiv = document.getElementById("errorMsg");

function validateInput(evt) {
  //Creates the Global Validation and prevents form from submitting
  if (evt.preventDefault) {
    evt.preventDefault(); // prevent form from submitting
  } else {
    evt.returnValue = false; // prevent form from submitting in IE8
  }
  formValidity = true; // reset value for revalidation
  checkValidity();
  if (formValidity === true) {
    document.getElementsByTagName("form")[0].submit(); //Submit the form if validity is True
  }
}
function createEventListeners() {
  //Calls validateInput when submit button is clicked
  console.log(">Entering createEventListeners function");
  var form = document.getElementsByTagName("form")[0];
  if (form.addEventListener) {
    form.addEventListener("submit", validateInput, false);
  } else if (form.attachEvent) {
    form.attachEvent("onsubmit", validateInput);
  }
  console.log(">Leaving createEventListeners function");
}
function checkValidity() {
  //loops through each form field and evaluates if value is valid for submit
  var chkVal = true;
  var nmeVal = document.forms[0].name;
  var email = document.forms[0].email;
  console.log(">Entering checkValidity Function");
  try {
    console.log(
      ">>Entering nmeVal Validation TRY " +
        "form validity: " +
        formValidity +
        " validity: " +
        chkVal
    );
    if (nmeVal.value === "") {
      //Turns background and border red if field is blank changes chkVal to blank
      nmeVal.style.background = "rgb(255,233,233)";
      chkVal = false;
      nmeVal.focus();
    } else {
      //Turns the field white if field is valid
      nmeVal.style.background = "white";
    }
    if (chkVal === false) {
      //throws error if validity is false
      throw "You forgot to put your name!";
    }
    errMsgDiv.style.display = "none";
    errMsgDiv.innerHTML = "";
  } catch (msg) {
    errMsgDiv.style.display = "block";
    errMsgDiv.innerHTML = msg;
    formValidity = false;
    return; // exits the function if local validity is false
  }
  console.log(
    ">>Leaving nmeVal Validation TRY " +
      "form validity: " +
      formValidity +
      " validity: " +
      chkVal +
      " First Name: " +
      nmeVal.value
  );

  try {
    console.log(
      ">>Entering email Validation TRY " +
        "form validity: " +
        formValidity +
        " local validity: " +
        chkVal
    );

    let emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailBoo = emailTest.test(email.value);

    console.log(emailBoo);
    if (emailBoo != true) {
      //Follows the previous try loop to validate email
      email.style.background = "rgb(255,233,233)";
      chkVal = false;
      email.focus();
    } else {
      email.style.background = "white";
    }
    if (chkVal === false) {
      throw "Please enter a valid Email address.";
    }
    errMsgDiv.style.display = "none";
    errMsgDiv.innerHTML = "";
  } catch (msg) {
    errMsgDiv.style.display = "block";
    errMsgDiv.innerHTML = msg;
    formValidity = false;
    return;
  }
  console.log(
    ">>Leaving email Validation TRY " +
      "form validity: " +
      formValidity +
      " Local validity: " +
      chkVal +
      " email: " +
      email.value
  );
  console.log(">Leaving checkValidity Function");
}

function init() {
  //call functions to be executed in the following event listener
  console.log(">Entering init function");
  createEventListeners();

  console.log(">Leaving init function");
}

if (window.addEventListener) {
  //call init() on page load
  console.log("> Adding TC39 Event Listener...");
  window.addEventListener("load", init, false);
} else if (window.attachEvent) {
  console.log("> Adding MS Event Listener...");
  window.attachEvent("onload", init);
}
