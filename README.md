# XFL Pick'Em!

https://morning-dawn-76670.herokuapp.com/

## Introduction:

 This project is a web-based application created to provide XFL football fans with the opportunity to compete with friends, colleagues, or other football fans around the world by picking the winners for each weekly XFL games.  Each correct pick earns one point for the player.  The application keeps a tally of current scores.

Upon launching this page, the user is given the opportunity to login to their previously created account.  Or, if they have not yet created an account they can use the sign-up link to enter their email address, desired display name and password.  This portion of the project uses the Passport bcrypt node modules which provide a secure method of storing the users password in the database. Once the user is logged in they are routed to the members' page.  If the user is already a member of any existing leagues, they will see a list of those leagues.  There is also a button that will take the user to a new page where a new league can be created.  Each league has it's own page which will give a list of all the current member, their respective weekly scores, and a place where new members can be added by entering their display name.  It is from this page that the user can click the "Make Picks!" button.  They can then select the week for which they would like to make their guesses.  Once the game has begun, the picks become "locked" and can no longer be changed.  


## Technology:
This website utilizes HTML, CSS, Bootstrap, JavaScript, jQuery, MySQL database, node.js as well as the following node modules:
    * Express
    * Express-Handlebars
    * Express-Session
    * MySQL2
    * Passport
    * Sequelize
    

## Usage Instruction 

Launch: This website can be launched in a browser.

## Credits

This project was created by the following collaborators:

Maria Francis-Moullier, Lynn O'Neill, and Sam Wardell