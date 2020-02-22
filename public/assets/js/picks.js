// global week and picks variables
let current_week;
let picksEntered = [undefined, undefined, undefined, undefined];

// on page load
$(document).ready(function() {
    $("#weekDiv").hide();

    console.log("picksEntered = " + picksEntered);
});

$(document).on("click", ".dropdown-item", dropdownClicked);

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

    picksEntered = [undefined, undefined, undefined, undefined];

    for(let i = 0; i < 4; i++) {
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
    console.log("submit picks");
}