let loggedInUserID;

// on page load
$(document).ready(function () {

    loggedInUserID = $("#groupHeader").attr("value");

   $.get("/api/getallgroups/" + loggedInUserID).then(function(groupData) {
        console.log(groupData);

        groupData.forEach(element => {
            let newLI = $("<li>");
            newLI.text(element.name);
            newLI.addClass("groupList");
            newLI.attr("gid", element.id);
            let trashIcon = $("<i>");
            trashIcon.addClass("fas fa-trash");
            $(newLI).append(trashIcon);
            $("#allGroups").append(newLI);
        });
   });

});

// click listener for group list
$(document).on("click", ".groupList", function () {

    let gid = $(this).attr("gid");
    let groupName = $(this).text();
    console.log(gid + " " + groupName);

    $.get("/api/get_memberID/" + loggedInUserID + "/" + gid).then(function(memberData) {

        let mid = memberData.id;
        console.log("The memberID is " + mid);
        if(window.confirm("Are you sure you want to leave " + groupName + "? Your picks and scores will be deleted as well.")) {
            $.ajax({ url: '/api/delete_member/' + mid, method: 'DELETE', data:{}})
            .then(function() {
                location.reload();
            });
        }
    });
});


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