$(document).ready(function () {
    console.log("Groups.js page is FIRING");

    // getting refrences to add new group page 
    let newGroupBtn = $("#newGroupBtn");
    let newMemberBtn = $("#addGroupMemberBtn");

    // On click function to add new group ///
    newGroupBtn.on("click", function () {
        console.log("Button to add new group works!");
        let newGroup = $("#group-input").val().trim();

        // getting logged in id from local storage //
        let loggedin_id = localStorage.getItem("loggedin_id");
        console.log("Below is the log of the new group name to be added");
        console.log(newGroup);
        console.log("loggedin_id is " + loggedin_id);

        $.post("/api/group", {
            name: newGroup,
            uid: loggedin_id
        })
            .then(function () {
                console.log("new group post has been sent");
                // Get request to collect id for new group ///
                $.get("api/groups/" + newGroup).then(function (data) {
                    console.log("Below is the log of the data being returned from the server");
                    console.log(data);
                    let gid = data[0].id;
                    console.log("below is group id");
                    console.log(gid);
                
                    //POST request will add the user who created the group as a member of that group//
                    $.post("/api/member", {
                        GroupId: gid,
                        UserId: loggedin_id
                    })
                    $.get("/league/" + gid, function (req) {
                        window.location = "/league/" + gid;
                    })
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

