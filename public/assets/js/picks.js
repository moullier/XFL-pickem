// global week and picks variables
let current_week, loggedInUserID;
let groupID, memberID, week_locked;
let picksEntered = [undefined, undefined, undefined, undefined];

// on page load
$(document).ready(function() {
    $("#weekDiv").hide();

    console.log("picksEntered = " + picksEntered);

    // get the group ID that was passed in through handlebars
    groupID = parseInt($("#groupTitle").attr("value"));

    // get the group name for the current group
    $.get("/api/getGroupbyID/" + groupID).then(function(data) {
        console.log(data.name);
        $("#groupTitle").text(data.name);

    });

    // get and store the logged in user's ID
    $.get("/api/user_data").then(function(data) {
        console.log(data);
        loggedInUserID = data.id;

        let queryStr = `/api/get_memberID/${loggedInUserID}/${groupID}`;
        console.log(queryStr);
        $.get(queryStr).then(function(memberData) {
            console.log("memberData is:");
            console.log(memberData);
            memberID = memberData.id;
            console.log(memberID);
        });
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

            $(idHomeString).text(element.home_name);
            $(idAwayString).text(element.away_name);

            i++;
        });

        // check to see if this member already has picks entered for this week
        // and display them if so

        $.get(`/api/user_picks/${memberID}/${current_week}`).then(function(pickData) {
            console.log(pickData);
            console.log("pickData.length = " + pickData.length);

            // presumably, in this case picks exist for this week
            if(pickData.length > 0) {
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
                        if(prediction == winner) {
                            $(pickString).css("background-color", "#90ee90");
                        } else {
                            $(pickString).css("background-color", "#ffcccb");
                            $(pickString).css("text-decoration", "line-through");
                        }
                    }

                    $(pickString).text(team);

                });
            }
        });

    });
}

// each time a new week is selected, reset all variables/displays 
// that should be set back to original status
function resetPage() {
    // reset submit button until all picks selected
    $("#submit-btn").prop('disabled', true);

    $("#weekTitle").text("Week #" + current_week);
    $("#addPicksResult").text("");

    picksEntered = [undefined, undefined, undefined, undefined];
    console.log("picksEntered = ");
    console.log(picksEntered);

    $("#gm1pick").css("background-color", "#ffffff");
    $("#gm2pick").css("background-color", "#ddddd3");
    $("#gm3pick").css("background-color", "#ffffff");
    $("#gm4pick").css("background-color", "#ddddd3");
    for(let i = 1; i<5; i++) {
        $(`#gm${i}pick`).css("text-decoration", "none");
        $(`#gm${i}pick`).text("");
    }

}

$(document).on("click", ".pick-btn", registerPick);

function registerPick() {
    let pickedGame = parseInt($(this).attr("game"));
    let pick = $(this).attr("pick");

    console.log("pickedGame = " + pickedGame);

    
    console.log("pick = " + pick);

    if(pick == "home") {
        picksEntered[pickedGame - 1] = true;
    } else {
        picksEntered[pickedGame - 1] = false;
    }

    console.log("picksEntered = " + picksEntered);
    let finishedPicking = (picksEntered[0] != undefined &&
        picksEntered[1] != undefined &&
        picksEntered[2] != undefined &&
        picksEntered[3] != undefined);
    // console.log(finishedPicking);
    if(finishedPicking)
        $("#submit-btn").prop('disabled', false);        

    let str = "#gm" + pickedGame + pick;
    let team = $(str).text();
    // console.log("team = " + team);

    let pickString = "#gm" + pickedGame + "pick";
    $(pickString).text(team);
}

$(document).on("click", "#submit-btn", submitPicks);

function submitPicks() {

    // picks are stored in picksEntered as booleans corresponding to each of the four games

    console.log(memberID);

    // post all four new pick requests
    // code is asynchronous so they may not complete in order, but that is okay
    for(let i = 0; i < 4; i++) {
        $.post("/api/pick", {
            "week": current_week,
            "game_number": i+1,
            "prediction": picksEntered[i],
            "MemberId": memberID
        }).then(function(data) {
            console.log(data);
        })
    }

    $("#addPicksResult").text("Picks added successfully for week " + current_week)
}