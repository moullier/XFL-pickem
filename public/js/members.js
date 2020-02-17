$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-email").text(data.email);
    $(".member-name").text(data.display_name);

    console.log(data);

  });
});

function getGroups() {
  console.log("the button listener works, so that's nice");
}

// Adding a click event listener to all elements with a class of "sidebarBtn"
$(document).on("click", "#group-btn", getGroups);
