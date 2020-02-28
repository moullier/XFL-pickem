$(document).ready(function() {
  // Getting references to our form and input
  let signUpForm = $("form.signup");
  let emailInput = $("input#email-input");
  let passwordInput = $("input#password-input");
  let displayNameInput = $("input#display-name-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    let userData = {
      email: emailInput.val().trim(),
      display_name: displayNameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.display_name, userData.password);
    emailInput.val("");
    displayNameInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, display_name, password) {
    $.post("/api/signup", {
      email: email,
      display_name: display_name,
      password: password
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
