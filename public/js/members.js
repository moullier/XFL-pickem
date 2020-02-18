let loggedin_id;

$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-email").text(data.email);
    $(".member-name").text(data.display_name);
    loggedin_id = data.id;
    console.log(loggedin_id);
    console.log(typeof(loggedin_id));

  });
});

function getGroups() {
  console.log("the button listener works, so that's nice");
  $.get("/api/user_members/" + loggedin_id).then(function(data) {
    console.log(data);
    $(".group-names").text(data);
  });

}

// Adding a click event listener to all elements with a class of "sidebarBtn"
$(document).on("click", "#group-btn", getGroups);
