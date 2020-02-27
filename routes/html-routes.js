// Requiring path to so we can use relative routes to our HTML files
let path = require("path");
let db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
let isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });


  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {

      res.redirect("/members");
    }

    res.sendFile(path.join(__dirname, "../public/login.html"));
  });


  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {

    console.log("/members html route FIRING");
    console.log("Logging user id as ");
    console.log(req.user.id);

    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      let user_id = req.user.id;
      console.log("user_id is " + user_id);
      console.log("user email is " + req.user.email);
      console.log("below is table join: match on user id from members table and all of groups table");
      db.Member.findAll({
        where: {
          UserId: req.user.id
        },
        include: [db.Group]
      }).then(function (dbMember) {
        let resultList = [];

        dbMember.forEach(element => {
          console.log(element.GroupId);
          let resultPair = [];
          resultPair[0] = element.dataValues.Group.name;
          resultPair[1] = element.dataValues.Group.id;
          resultList.push(resultPair);
        })
        console.log("below is group name and group id# list for logged in user");
        console.log(resultList);

        // Create member object for members.handlebars rendering //
        let memberObject = {
          email: req.user.email,
          displayname: req.user.display_name,
          groups: resultList
        };
        console.log("below is log of member object");
        console.log(memberObject);
        // render members.handlebars page and populate with memberObject //
        res.render("members", memberObject);
      });
    };
  })


  // Route to redirct user to /groups page to create new league //
  app.get("/groups", function (req, res) {
    console.log("GET request to take user to page to create new league(/groups) is FIRING!")
    res.render("groups");
  });

  app.get("/league/", function (req, res) {
    console.log("request received to render league page");
    res.render("league");
  })

  // Route to load picks page -- we could pass in the week here and preload the requested
  // (or current?) week possibly?
  app.get("/picks", function (req, res) {
    res.render("picks", {});
  });


  // Route to load picks page -- we could pass in the week here and preload the requested
  // (or current?) week possibly?
  app.get("/picks/:gid", function (req, res) {
    console.log("(from /picks/:gid) The id passed in to render the page is " + req.params.gid);

    let hbsObj = {
      groupID: req.params.gid
    }

    res.render("picks", hbsObj);
  });

  // Route to load picks page -- we could pass in the week here and preload the requested
  // (or current?) week possibly?
  app.get("/league/:gid", function (req, res) {
    console.log("(from /league/:gid) The id passed in to render the page is " + req.params.gid);

    let hbsObj = {
      groupID: req.params.gid
    }

    res.render("league", hbsObj);
  });

    // Route to settings page
  app.get("/settings/:uid", function(req,res) {
    console.log("The user id passed in to render the page is " + req.params.uid);
    
    let hbsObj = {
      userID: req.params.uid
    }

    res.render("settings", hbsObj);
  });



};

