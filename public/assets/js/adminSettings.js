let loggedInUserID;

// on page load
$(document).ready(function () {



    $.get("/api/user_data").then(function(userData) {
        console.log(userData);

        loggedInUserID = userData.id;
    });

});

$(document).on("click", ".dropdown-item", dropdownClicked);

// handles when a week is selected, shows the schedule of games
function dropdownClicked() {
    current_week = parseInt($(this).attr("value"));
    $("#weekDiv").show();

    resetPage();

    // get and display the game schedule for the selected week
    $.get("/api/week_schedule/" + current_week).then(function(data) {
        console.log(data);

        // check if games are completed -- if so, can't add/change picks
        if(data[0].game_occurred) {
            console.log("The game started! This week is locked!")
            $("#lockStatus").text(" - Picks are Locked")
            $("#submit-btn").hide();
            $(".pick-btn").hide();
            week_locked = true;
        } else {
            console.log("Week isn't completed yet")
            $("#lockStatus").text(" - Open for Picks")
            $("#submit-btn").show();
            $(".pick-btn").show();
            week_locked = false;
        }

        let i = 1;
        data.forEach(element => {
            let idHomeString = "#gm" + i +"home";
            let idAwayString = "#gm" + i + "away";

            $(idHomeString).html(`<div style="font-weight: bolder">${element.home_name}<br><img class="${element.home_name}"></div>`);
            $(idAwayString).html(`<div style="font-weight: bolder">${element.away_name}<br><img class="${element.away_name}"></div>`);

            i++;
        });

        // check to see if this member already has picks entered for this week
        // and display them if so

        $.get(`/api/user_picks/${memberID}/${current_week}`).then(function(pickData) {
            console.log(pickData);
            console.log("pickData.length = " + pickData.length);

            // presumably, in this case picks exist for this week
            if(pickData.length > 0) {

                weekPicksAlreadyEntered = true;

                pickData.forEach(element => {
                    let pickString = "#gm" + element.game_number + "pick";
                    let prediction = element.prediction
                    let team;
                    if(prediction) {
                        team = data[element.game_number - 1].home_name;
                    } else {
                        team = data[element.game_number - 1].away_name;
                    }

                    // check to see if week is completed and color code picks right/wrong if so
                    if(week_locked) {
                        console.log(data);
                        let winner = data[element.game_number - 1].winner;
                        if (data[element.game_number - 1].game_occurred) {
                            if(prediction == winner) {
                                $(pickString).css("background-color", "#90ee90");
                            } else {
                                $(pickString).css("background-color", "#ffcccb");
                                $(pickString).css("text-decoration", "line-through");
                            }
                        }
                    }

                    $(pickString).text(team);

                });
            }
        });

    });
}



// Adding a click event listener to settingsLink
$(document).on("click", "#settingsLink",  function() {

    console.log("settings link is working");
    $.get("/settings/" + loggedin_id, function(req) {
      window.location = "/settings/" + loggedin_id;
    });
  });

  // Adding a click event listener to membersLink
$(document).on("click", "#membersLink",  function() {

    console.log("settings link is working");
    $.get("/members/", function(req) {
      window.location = "/members/";
    });
});