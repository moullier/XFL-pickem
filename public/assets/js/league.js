$(document).ready(function() {
    $.get("/league/", function() {
        
    })
    newMemberBtn.on("click", function () {
        let newGroupMember = $("#user-input").val().trim();
        console.log("new member button is working!")
        console.log(newGroupMember);
    })



})
    
