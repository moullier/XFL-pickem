// Requiring path to so we can use relative routes to our HTML files
let path = require("path");

// Requiring our custom middleware for checking if a user is logged in
let isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      
      res.redirect("/members");
    }

    res.sendFile(path.join(__dirname, "../public/login.html"));
  });


  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {

    console.log("/members html route FIRING");
    console.log("Logging user id as ");
    console.log(req.user.id);

    res.redirect("/api/user_members/" + req.user.id);
    console.log("Client sent to: /api/user_members/");

    // res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // Route to redirct user to /groups page to create new league //
  app.get("/groups", function(req,res) {
    console.log("GET request to take user to page to create new league(/groups) is FIRING!")
    res.render("groups");
  });

  app.get("/league/", function(req,res) {
    console.log("request received to render league page");
    res.render("league");
  })

  // Route to load picks page -- we could pass in the week here and preload the requested
  // (or current?) week possibly?
  app.get("/picks", function(req,res) {
    res.render("picks", {});
  });


  // Route to load picks page -- we could pass in the week here and preload the requested
  // (or current?) week possibly?
  app.get("/picks/:gid", function(req,res) {
    console.log("The id passed in to render the page is " + req.params.gid);
    
    let hbsObj = {
      groupID: req.params.gid
    }

    res.render("picks", hbsObj);
  });

    // Route to load picks page -- we could pass in the week here and preload the requested
  // (or current?) week possibly?
  app.get("/league/:gid", function(req,res) {
    console.log("The id passed in to render the page is " + req.params.gid);
    
    let hbsObj = {
      groupID: req.params.gid
    }

    res.render("league", hbsObj);
  });

};

