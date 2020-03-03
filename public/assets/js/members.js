let loggedin_id;
let logout = $("#logout");
let adminStatus = false;

$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page with display name if there is one, or user ID otherwise
  $.get("/api/user_data").then(function(data) {
    console.log("below is the user data from members.js");
    console.log(data);

    // check if user is an admin, if so add the link to admin settings in the menu
    adminStatus = data.admin;
    if(adminStatus) {
      let newAdminMenu = $("<li>");
      newAdminMenu.addClass("nav-item");
      let newAdminItem = $("<span>");
      newAdminItem.text("Admin Settings");
      newAdminItem.addClass("nav-link active sam-navbar-link");
      newAdminItem.attr("id", "adminSettingsLink");
      newAdminMenu.append(newAdminItem);
      newAdminMenu.insertAfter("#settingsItem");
    }

    $(".member-email").text(data.email);
    if(data.display_name != undefined){
      $(".member-name").text(data.display_name);
    }
    else {
      $(".member-name").text("User ID: " + data.id);
    }
    loggedin_id = data.id;
    // Set loggedin_id to local storage so that it can be used globally //
    localStorage.setItem("loggedin_id", loggedin_id);
    console.log(loggedin_id);
    console.log(typeof(loggedin_id));


// Adding a click event listener to settingsLink
$(document).on("click", "#settingsLink",  function() {

  console.log("settings link is working");
  $.get("/settings/" + loggedin_id, function(req) {
    window.location = "/settings/" + loggedin_id;
  });
});

// Adding a click event listener to picks-btn
$(document).on("click", "#displayname-btn", setName);



$(document).on("click", "#makePicks-btn", function() {
  console.log("makePicks button is working!");
  $.get("/picks", function(req) {
    window.location = "/picks";
    console.log("get request sent to redirect to create picks page")
  });
});


// click listener on the list of groups that the user is a member of
// clicking one takes the user to the league page
$(document).on("click", ".league-btn", function() {

  let groupId = $(this).attr("data-id")
  $.get("/league/" + groupId, function(req) {
    window.location = "/league/" + groupId;
  });
});



// On click function will redirect user page to create new group ///
$(document).on("click", "#newGroup-btn", function() {
  console.log("new group button is working!");
  $.get("/groups", function(req) {
    window.location = "/groups";
    console.log("get request sent to redirect to create league page")
  })
})

  })

  $(document).on("click", "#logout", function() {
    console.log("logout button works!")
    $.get("/logout", function (req) {
      console.log("logged out");
      window.location = "/login";
    })
  })
})

// Adding a click event listener to membersLink
$(document).on("click", "#membersLink",  function() {

  console.log("members link is working");
  $.get("/members/", function(req) {
    window.location = "/members/";
  });
});

function setName() {
  let newDisplayName = $("#name_field").val().trim();
  console.log(newDisplayName);

  let url = "/api/update_user_dn/" + loggedin_id;
  console.log(url);
  $.ajax({
    url: url,
    type: "PUT",
    contentType: 'application/json',
    dataType: "json",
    data: { 
      "display_name": newDisplayName
    },
    success: function (data) {
      console.log("Success");
    }
    , fail: function () {
      console.log("Failure");
    }
  });
}

// Adding a click event listener to membersLink
$(document).on("click", "#adminSettingsLink",  function() {

  console.log("adminSettingsLink");
  $.get("/adminSettings/", function(req) {
    window.location = "/adminSettings/";
  });
});