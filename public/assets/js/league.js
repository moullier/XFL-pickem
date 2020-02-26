// global variables
let groupID, memberID, groupName, loggedInUserID, commissionerID;
let scoreArray;
let seasonSchedule;

// on page load
$(document).ready(function() {
    $("#weekDiv").hide();

    // get the group ID that was passed in through handlebars
    groupID = parseInt($("#groupTitle").attr("value"));

    // get the group name for the current group
    $.get("/api/getGroupbyID/" + groupID).then(function(data) {
        commissionerID = data.UserId;
        groupName = data.name;
        $("#groupTitle").text(groupName);
    
    });

    // get the whole season schedule
    $.get("/api/schedule/").then(function(scheduleData) {

        seasonSchedule = scheduleData;

        // get and store the logged in user's ID
        $.get("/api/user_data").then(function(data) {
            // console.log(data);
            loggedInUserID = data.id;

            // get and store the member ID of the logged in user in this group
            let queryStr = `/api/get_memberID/${loggedInUserID}/${groupID}`;
            console.log(queryStr);
            $.get(queryStr).then(function(memberData) {
                console.log("memberData is:");
                console.log(memberData);
                memberID = memberData.id;
                console.log(memberID);

                // build a table of group members
                $.get("/api/group_users/" + groupID).then(function(groupMembersData) {
                    
                    groupMembersData.forEach(element => {
                        
                        // get display name. If no display name is entered, use email instead
                        let userName = element.display_name;
                        if(userName == undefined)
                            userName = element.email;

                        let commishStatus = false;

                        // check if User is commissioner
                        if(commissionerID == element.id) {
                            commishStatus = true;
                        }

                        // getUserScore(element.Members[0].id, str2);
                        calculateWeeklyScores(element.Members[0].id, userName, commishStatus);
                    });
                });
            });
        });
    });
});

function getUserScore(memberID, spanStr) {
    // get all picks the user has made over the course of the season
    $.get("/api/user_picks/" + memberID).then(function(memberPicks) {
        console.log("member " + memberID + " has these picks");
        console.log(memberPicks);
        spanStr = "#" + spanStr;
        $(spanStr).text("0");

        let userScore = 0;

        memberPicks.forEach(element => {
            let pickGame = element.game_number;
            let pickWeek = element.week;
            let pickPrediction = element.prediction;

            console.log("pickGame = " + pickGame + " weekGame = " + pickWeek);

            $.get("/api/game_schedule/" + pickWeek + "/" + pickGame).then(function(gameResult) {
                console.log("GAME RESULT: ");
                console.log(gameResult);
                
                if(gameResult[0].game_occurred) {
                    console.log("the prediction was " + pickPrediction);
                    console.log("the result was " + gameResult[0].winner);
                    if(pickPrediction == gameResult[0].winner) {

                        userScore++;
                        console.log("You got a prediction right!! " + userScore);
                        
                        $(spanStr).text(userScore);
                    }

                }
            });
        });
    });

}

// click listener for Make Picks button
$(document).on("click", "#makePicks-btn", function() {

    let gid = $(this).attr("value")
    $.get("/picks/" + gid, function(req) {
      window.location = "/picks/" + gid;
      console.log("get request sent to redirect to create picks page")
    });
  });



// newMemberBtn.on("click", function () {
//     let newGroupMember = $("#user-input").val().trim();
//     console.log("new member button is working!")
//     console.log(newGroupMember);
// })


function calculateWeeklyScores(memberID, userName, commissioner) {
    console.log("Member ID as passed to calcWeekly: " + memberID);
    console.log(seasonSchedule);

    // pull all picks for the member
    $.get("/api/user_picks/" + memberID).then(function(memberPicks) {

        let userScore = [];
        let gameNum;
        let weekNum;
        let prediction;
        for(let i = 0; i < 10; i++) {
            userScore[i] = 0;
        }

        // iterate through picks
        memberPicks.forEach(element => {
            gameNum = element.game_number;
            weekNum = element.week;
            prediction = element.prediction;

            // iterate through season schedule to find corresponding game
            seasonSchedule.forEach(schedule => {
                if(schedule.week == weekNum && schedule.game_number == gameNum) {
                    if(schedule.game_occurred && schedule.winner == prediction) {
                        console.log(`Pick week ${weekNum} game ${gameNum} is correct!`);
                        userScore[weekNum - 1]++;
                    }
                }

            })

        });

        console.log("It is I, userScore for " + userName + ": " + userScore);

        // build a table row in the weekly table for this member
        let newRow = $("<tr>");
        let TDname = $("<td>");
        let totalScore = 0;
        TDname.text(userName);

        if(commissioner) {
            let crownIcon = $("<i>");
            $(crownIcon).addClass("fas fa-crown");
            
            $(TDname).append(crownIcon);
        }

        newRow.append(TDname);
        for(let i = 0; i < 10; i++) {
            let newTD = $("<td>");
            newTD.text(userScore[i]);
            newRow.append(newTD);
            totalScore += userScore[i];
        }
        
        $("#weeklyTableBody").append(newRow);

        // build a row in the season-long score table for this member
        let seasonRow = $("<tr>");
        let Sname = $("<td>");
        Sname.text(userName);
        
        if(commissioner) {
            let crownIcon = $("<i>");
            $(crownIcon).addClass("fas fa-crown");
            
            $(Sname).append(crownIcon);
        }
        

        seasonRow.append(Sname);
        let newSeasonTD = $("<td>");
        newSeasonTD.text(totalScore);
        seasonRow.append(newSeasonTD);
        $("#tableBody").append(seasonRow);



    });
}

