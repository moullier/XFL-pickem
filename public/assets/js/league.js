// global variables
let groupID, memberID, groupName, loggedInUserID;
let scoreArray;
let addMemberBtn = $("#addMember-btn");

// on page load
$(document).ready(function () {
    $("#weekDiv").hide();

    // get the group ID that was passed in through handlebars
    groupID = parseInt($("#groupTitle").attr("value"));

    // get the group name for the current group
    $.get("/api/getGroupbyID/" + groupID).then(function (data) {
        // console.log(data.name);
        groupName = data.name;
        $("#groupTitle").text(groupName);

    });

    // get and store the logged in user's ID
    $.get("/api/user_data").then(function (data) {
        // console.log(data);
        loggedInUserID = data.id;

        // get and store the member ID of the logged in user in this group
        let queryStr = `/api/get_memberID/${loggedInUserID}/${groupID}`;
        console.log(queryStr);
        $.get(queryStr).then(function (memberData) {
            console.log("memberData is:");
            console.log(memberData);
            memberID = memberData.id;
            console.log(memberID);

            // build a table of group members
            $.get("/api/group_users/" + groupID).then(function (groupMembersData) {

                let i = 1;
                groupMembersData.forEach(element => {
                    let userName = element.display_name;
                    if (userName == undefined)
                        userName = element.email;


                    let newRow = $("<tr>");
                    let newTH = $("<th>");
                    let newSpan1 = $("<span>");
                    let newTD = $("<td>");
                    let newSpan2 = $("<span>");

                    let str = "member" + i + "name";
                    let str2 = "member" + i + "score";
                    $(newSpan1).attr("id", str);
                    $(newSpan2).attr("id", str2);
                    $(newSpan2).attr("")
                    $(newSpan1).text(userName);

                    console.log("ELEMENT")
                    console.log(element);

                    getUserScore(element.Members[0].id, str2);

                    $(newTH).append(newSpan1);
                    $(newTD).append(newSpan2);

                    $(newRow).append(newTH);
                    $(newRow).append(newTD);

                    $("#tableBody").append(newRow);

                    i++;
                });


                console.log("*** MEMBER DATA BELOW");
                console.log(groupMembersData);
            });
        });
    });


    function getUserScore(memberID, spanStr) {
        // get all picks the user has made over the course of the season
        $.get("/api/user_picks/" + memberID).then(function (memberPicks) {
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

                $.get("/api/game_schedule/" + pickWeek + "/" + pickGame).then(function (gameResult) {
                    console.log("GAME RESULT: ");
                    console.log(gameResult);

                    if (gameResult[0].game_occurred) {
                        console.log("the prediction was " + pickPrediction);
                        console.log("the result was " + gameResult[0].winner);
                        if (pickPrediction == gameResult[0].winner) {

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
    $(document).on("click", "#makePicks-btn", function () {

        let gid = $(this).attr("value")
        $.get("/picks/" + gid, function (req) {
            window.location = "/picks/" + gid;
            console.log("get request sent to redirect to create picks page")
        });
    });

    /////  Add new members to group ///////
    addMemberBtn.on("click", function () {
        console.log("new member button is working!");
        let newMemberEmail = $("#newMember-input").val().trim();
        groupID = parseInt($("#groupTitle").attr("value"));
        console.log(newMemberEmail);
        $.get("/api/member/" + newMemberEmail)
            .then(function (data) {
                console.log(data);
                let newMemberUserId = data[0].id;
                console.log("the new member user id is " + newMemberUserId);

                    $.post("/api/new_member/", {
                        GroupId: groupID,
                        UserId: newMemberUserId
                    });
                    console.log("below is the log of the data from post new member ")
                    console.log(data);
                    let gid = groupID;
                    loggedInUserID = data.id;
                    console.log(`%%This is the loggedInUserID ${loggedInUserID}`);
                    // get the group name for the current group
                    $.get("/api/getGroupbyID/" + gid)
                        .then(function (data) {
                            groupName = data.name;
                            console.log("The group name is " + groupName);
                            let loggedin_id = loggedInUserID;
                            let groupId = groupID;
                            $.get("/league/" + groupId + loggedin_id)
                                .then(function (data) {
                                    console.log("Updated league page shoule be rendered.");
                                    // league page will be refreshed and new member will be updated.
                                    window.location = "/league/" + groupId + loggedin_id;
                                })
                        });
                })
            })
    })
