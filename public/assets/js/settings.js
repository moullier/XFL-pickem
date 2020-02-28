// on page load
$(document).ready(function () {

    let loggedInUserID = $("#groupHeader").attr("value");

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

    if(window.confirm("Are you sure you want to leave " + groupName + "? Your picks and scores will be deleted as well.")) {
        $.ajax({ url: '/api/delete_group/' + gid, method: 'DELETE', data:{}})
        .then(function() {
            location.reload();
        });
    }
});
