let loggedin_id;

$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page with display name if there is one, or user ID otherwise
  $.get("/api/user_data").then(function(data) {
    console.log(data);
    $(".member-email").text(data.email);
    if(data.display_name != undefined){
      $(".member-name").text(data.display_name);
    }
    else {
      $(".member-name").text("User ID: " + data.id);
    }
    loggedin_id = data.id;
    console.log(loggedin_id);
    console.log(typeof(loggedin_id));


    // get groups
    $.get("/api/user_members/" + loggedin_id).then(function(data) {
      console.log("************")
      console.log(data);

      let newList = $("<ul>");
      data.forEach(element => {
        let newGroup = $("<li>");
        let newSpan = $("<span>");
        newSpan.text(element.Group.name);
        newSpan.addClass("groupText");
        newSpan.attr("gid", element.GroupId)
        newGroup.append(newSpan);
        newList.append(newGroup);
      });

      $(".group-names").append(newList);
    });



  });
});

function getGroups() {
  $.get("/api/user_members/" + loggedin_id).then(function(data) {
    console.log("below is .get /api/user_members data return");
    console.log(data);
    $(".group-names").text(data);
  });
}

function getPicks() {
  $.get("/api/user_picks/" + loggedin_id).then(function(data) {
    console.log(data);
    let newList = $("<ul>");
    data.forEach(element => {
      let newLi = $("<li>");
      if(element.prediction)
        $(newLi).text(`Week ${element.week}, Game ${element.game_number}: Home winner`);
      else
        $(newLi).text(`Week ${element.week}, Game ${element.game_number}: Away winner`);

      $(newList).append(newLi);
    });

    $("#picks-list").append("Predictions");
    $("#picks-list").append(newList);

  })
}


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

// Adding a click event listener to group-btn
$(document).on("click", "#group-btn", getGroups);

// Adding a click event listener to picks-btn
$(document).on("click", "#picks-btn", getPicks);

// Adding a click event listener to picks-btn
$(document).on("click", "#displayname-btn", setName);

$(document).on("click", "#makePicks-btn", function() {
  console.log("makePicks button is working!");
  $.get("/picks", function(req) {
    window.location = "/picks";
    console.log("get request sent to redirect to create picks page")
  });
});


$(document).on("click", ".groupText", function() {

  let groupId = $(this).attr("gid")
  $.get("/picks/" + groupId, function(req) {
    window.location = "/picks/" + groupId;
    console.log("get request sent to redirect to create picks page")
  });
});





//Lynn's code below ///

$(document).on("click", "#newGroup-btn", function() {
  console.log("new group button is working!");
  $.get("/groups", function(req) {
    window.location = "/groups";
    console.log("get request sent to redirect to create league page")
  })
})