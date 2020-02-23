$(document).ready(function() {
    
console.log("is this page working?");
let newGroup = $("input#group-input").val();
let newGroupBtn = $("#newGroupBtn");


newGroupBtn.on("click", function (event) {
    event.preventDefault();
    console.log("new group button works");
    console.log(newGroup);
})

})