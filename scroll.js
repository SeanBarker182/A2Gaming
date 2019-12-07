// Author: Sean Barker
// Date:   December 7, 2019
// Description: A2 scroll on Nav

//Function to scroll to page on click
$("a").click(function() {
  var pageId = $(this).attr("data-page");
  $("html, body").animate({ scrollTop: $("#" + pageId).offset().top }, 1000);
});

// Function to hide the Hero Text when nav is open
function clickedIt() {
  var canSee = $("#navbarNavAltMarkup").is(":visible");
  if (canSee != true) {
    document.getElementById("hero").style.visibility = "hidden";
  } else {
    document.getElementById("hero").style.visibility = "visible";
  }
}

document.getElementById("navBut").addEventListener("click", clickedIt);
