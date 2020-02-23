// global week and picks variables
let current_week, loggedInUserID;
let groupID, memberID;
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


    $.get("/api/week_schedule/" + current_week).then(function(data) {
        console.log(data);

        let i = 1;
        data.forEach(element => {
            let idHomeString = "#gm" + i +"home";
            let idAwayString = "#gm" + i + "away";

            $(idHomeString).text(element.home_name);
            $(idAwayString).text(element.away_name);

            i++;
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


    for(let i = 1; i < 5; i++) {
        let pickString = "#gm" + i + "pick";
        $(pickString).text("");
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