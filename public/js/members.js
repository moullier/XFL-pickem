let loggedin_id;

$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-email").text(data.email);
    $(".member-name").text(data.id);
    loggedin_id = data.id;
    console.log(loggedin_id);
    console.log(typeof(loggedin_id));

  });
});

function getGroups() {
  $.get("/api/user_members/" + loggedin_id).then(function(data) {
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

    $("#picks-list").append("Picks");
    $("#picks-list").append(newList);

  })
}


function setName() {
  let newDisplayName = $("#name_field").val().trim();
  console.log(newDisplayName);
}

// Adding a click event listener to group-btn
$(document).on("click", "#group-btn", getGroups);

// Adding a click event listener to picks-btn
$(document).on("click", "#picks-btn", getPicks);

// Adding a click event listener to picks-btn
$(document).on("click", "#displayname-btn", setName);