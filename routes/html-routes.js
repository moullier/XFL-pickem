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

/// Lynn's Code Below /////

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {

    console.log("/members html route FIRING");
    // let user_id = req.params.id;
    // console.log(user_id);
    console.log(req.user.id);

    res.redirect("/api/user_members/" + req.user.id);

    // res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // Route to redirct user to page to create new group.  Add new league button on members page //
  app.get("/groups", function(req,res) {
    res.render("groups", {});
  });

  // Route to load picks page -- we could pass in the week here and preload the requested
  // (or current?) week possibly?
  app.get("/picks", function(req,res) {
    res.render("picks", {});
  });


  // Route to load picks page -- we could pass in the week here and preload the requested
  // (or current?) week possibly?
  app.get("/picks/:id", function(req,res) {
    console.log("The id passed in to render the page is " + req.params.id);
    
    let hbsObj = {
      groupID: req.params.id
    }

    res.render("picks", hbsObj);
  });





  app.get("/member_page/:id", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {

      let user_id = req.params.id;
      console.log("user_id is " + user_id);

      db.Member.findAll({
        where: {
          UserId: req.params.id
        },
        include: [db.Group]
      }).then(function(dbMember) {
        console.log(dbMember);
        let resultList = [];
        dbMember.forEach(element => {
          resultList.push(element.dataValues.Group.dataValues.name);
        });

        console.log(resultList);

        let membersObject = {
          email: req.user.email,
          displayname: req.user.display_name,
          groups: resultList
        };
        console.log(membersObject);
        console.log(membersObject.displayname);
        res.render("members", {membersObject});
      })
    }
  });









};

