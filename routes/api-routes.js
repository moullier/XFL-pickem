// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    
    //console.log("** login** req.user on the server: ");
    //console.log(req.user);
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
      // display_name: req.user.display_name
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      display_name: null
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      // console.log("req.user on the server: ");
      // console.log(req.user);

      res.json({
        email: req.user.email,
        id: req.user.id,
        display_name: req.user.display_name
      });
    }
  });

  // Route for getting member info about user (which groups they're in)
  app.get("/api/user_members/:id", function(req, res) {
    console.log("hit the user_members get route");
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {

      let user_id = req.params.id;
      console.log("/api/user_members on the server: ");
      console.log("user_id is " + user_id);

      db.Member.findAll({
        where: {
          user_id: req.params.id
        },
        include: [db.Group]
      }).then(function(dbMember) {
        // console.log(dbMember);
        let resultList = [];
        dbMember.forEach(element => {
          resultList.push(element.dataValues.Group.dataValues.name);
        });

        console.log(resultList);
        res.json(resultList);
      })
    }
  });

  // Route for getting all picks for a specific user
  app.get("/api/user_picks/:id", function(req, res) {
    console.log("hit the user_picks get route");
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {

      let user_id = req.params.id;
      console.log("/api/user_picks on the server: ");
      console.log("user_id is " + user_id);

      db.Pick.findAll({
        include: [
          {
            model: db.Member, 
            include: [
                db.Group
            ],
            where: {
              user_id: req.params.id
            },
          }
        ]
      }).then(function(dbPick) {
        // console.log(dbPick);
        // let resultList = [];
        // dbPick.forEach(element => {
        //   resultList.push(element.dataValues.Group.dataValues.name);
        // });

        // console.log(resultList);
        res.json(dbPick);
      })
    }
  });







}
