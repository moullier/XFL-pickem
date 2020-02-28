# project2

https://sequelize.readthedocs.io/en/latest/docs/associations/

Title: XFL Pick'Em!

Introduction: This project is a web-based application created to provide XFL football fans with the opportunity to compete with friends, colleagues, or other football fans around the world by picking the winners for each weekly XFL games.  Each correct pick earns one point for the player.  The application keeps a tally of current scores.

Upon launching this page, the user is given the opportunity to login to their previously created account.  Or, if they have not yet created an account they can use the sign-up link to enter their email address, desired display name and password.  This portion of the project uses the Passport bcrypt node modules which provide a secure method of storing the users password in the database. Once the user is logged in they are routed to the members' page.  If the user is already a member of any existing leagues, they will see a list of those leagues.  There is also a button that will take the user to a new page where a new league can be created.  Each league has it's own page which will give a list of all the current member, their respective weekly scores, and a place where new members can be added by entering their display name.  It is from this page that the user can click the "Make Picks!" button.  They can then select the week for which they would like to make their guesses.  Once the game has begun, the picks become "locked" and can no longer be changed.  


Technology: This website utilizes html, css, Bootstrap css, javascript, jquery, MySql database, node.js as well as the following node modules:
    * Express
    * Express-Handlebars
    * Express-Session
    * MySQL12
    * Passport
    * Sequelize
     

This project was created by the following collaborators:

Maria Moullier, Lynn O'Neill, and Sam Wardell


Launch: This website can be launched in a browser.

![image of picks page](/assets/img/ProjectTwoScreenShot.PNG)

# To Do

(3) Settings page with admin functionality
    This could allow for scoring algorithm change (store scores when the admin enters), but probably don't have time (?)
(2) Don't allow duplicate picks -- update the existing ones instead - DONE - should test more
(1) Change scoring algorithm - pull the whole schedule once instead of each individual game -- might mitigate some of the asynch challenges - DONE
(4) Commissioner is stored in group -- add some visual indicator of who they are, and maybe let them add users on the league page? - added visual indicator
Make sure passport is working well -- error messages and actually locking pages that should be locked to logged in users