// Requiring our models and passport as we've configured it
<<<<<<< HEAD
let db = require("../models");
let passport = require("../config/passport");

/// Below is just an example for refrence //

// router.get("/", function (req, res) {
//   burger.selectAll(function (data) {
//       let hbsObject = {
//           burger: data
//       };
//       console.log("Below is the hbsObject log")
//       console.log(hbsObject);
//       // console.log(hbsObject.burger[0].name);
//       res.render("index", hbsObject);
//   })
// });

=======
var db = require("../models");
var passport = require("../config/passport");
>>>>>>> develop

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

      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // GET ROUTES FOR ACCESSING THE DATABASE

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
          UserId: req.params.id
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
              UserId: req.params.id
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


// Get route to return all users in a group
app.get("/api/group_users/:id", function(req, res) {
  console.log("hit the group_users get route");
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {

    let group_id = req.params.id;
    console.log("/api/group_users on the server: ");
    console.log("group_id is " + group_id);

    db.User.findAll({
      include: [
        {
          model: db.Member, 
          include: [
              db.Group
          ],
          where: {
            GroupId: group_id
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



// POST ROUTES

// add a new group
// input is an object with a name value
app.post("/api/group", function(req, res) {
  console.log("post /api/groups/ route");
  console.log(req.body);

  db.Group.create(req.body).then(function(dbGroup) {
    res.json(dbGroup);
  });
});

// add a new group member
// input is an object with "user_id" and "GroupId" keys
app.post("/api/member", function(req, res) {
  console.log("post /api/member/ route");
  console.log(req.body);

  db.Member.create(req.body).then(function(dbMember) {
    res.json(dbMember);
  });
});

// add a new pick
// input is an object with "week", "game_number","prediction" and "MemberId" keys
app.post("/api/pick", function(req, res) {
  console.log("post /api/pick/ route");
  console.log(req.body);

  db.Pick.create(req.body).then(function(dbPick) {
    res.json(dbPick);
  });
});


// add a new result
// input is an object with "week", "game_number", "winner", "winner_name", and "loser_name" keys
app.post("/api/result", function(req, res) {
  console.log("post /api/result/ route");
  console.log(req.body);

  db.Result.create(req.body).then(function(dbResult) {
    res.json(dbResult);
  });
});


// DELETE ROUTES

app.delete("/api/delete_group/:id", function(req, res) {
  console.log("Made it to delete group function");
  
  db.Group.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbPost) {
    res.json(dbPost);
  });
});



// PUT ROUTES

app.put("/api/update_user_dn/:id", function(req, res) {

db.User.save({
  where: {
    id: req.params.id
  }
})


  })
}
