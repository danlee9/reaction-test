Reaction Test
=========================

MEAN Stack App featuring a simple game testing reaction speed. 

Demonstrates the following points:

```
1. Package management by npm and bower
2. Streaming build system by javascript task runner gulp
3. HTML5 Session storage to store scores for guest users
4. Backend API using express
5. MongoDB and mongoose using Mongolab to store registered users and best scores
6. Bcrypt-nodejs module to hash user paswords when saving to database
7. Authentication using json web tokens
8. Frontend using Angular, Bootstrap, and jQuery
9. $http requests interception using $httpProvider.interceptors
10. Caching using $cacheFactory
11. Route changing on $routeChangeStart with $location
12. Shared services to be used across controllers
13. HTML5 Local storage to store tokens
14. Load data via $http requests to backend
15. App seperation into HTML partials and displayed using ng-include and ng-view
16. Angular routing and route resolves
17. Directives and Isolate Scope
18. Directive Transclusion
19. Directive controllers to be used by linking function in child directives
20. Promises using $q
21. $watch $destroy $rootScope
```
### Server:
```
use node or nodemon to start up
setup to run at localhost:8080
the server will handle http requests to serve up user information
routes handle authentication and posting new users
routes also retrieve, update, or delete user information
middleware to check for access tokens
```

#### Client:

Configuration in app.js and angular routes in app.routes.js

Shared components and home page
```
  mainCtrl.js - checks to see if user is logged in
  navbar.html - navbar displayed across top for single page app
  home.html - html partial for home page
```

Services
```
  authService.js - module that holds services for authentication
  userService.js - service used to make http requests to backend
```

Form
```
  formCtrl.js - controllers for both signing up a new user and logging in a user
  login.html  - html partial for login page
  signup.html - html partial for signup page
  user-form.html - html partial for user form directive
  userForm.js - directive for user form
```

Game
```
  game-area-html - html partial to display
  game.js - directive for reaction test game
  gameCtrl.js - module for controllers for guests and users
  guest.html - html partial for guests playing game
  user.html - html partial for users playing game
```

Profile
```
  profile.html - html partial that displays user profile
  profileCtrl.js - retrieves user data from back end
```

Scores
```
  scores.html - html partial that displays best scores
  scoresCtrl.js - retrieves scores from back end to display to sortable table
```

 Steps to Run Project (must have have nodejs installed)

```
 git clone https://github.com/danlee9/reaction-test.git
 cd reaction-test
 npm install
 bower install
 set environment property in config.js to '/public'
 node server or npm start

 afterwards to serve from build:
 from reaction-test root, gulp build
 set environment in config.js to '/build',
 node server or npm start
```

