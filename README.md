# Hello World V0
This app allows a user to create an account, see a confirmation page, allows a user to request admin access, and manage users if their request for admin access is approved.

## Starting
```
git clone https://github.com/ecommerce-technician/helloworld-demo-firebase
cd helloworld-demo
npm install
bower install
node helloworld
```

### [starts on localhost:7777](localhost:7777)

## Required Pages
 - ./login
 - ./signup
 - ./confirmation
 - ./admin (registered user report)

## Features
### Signup feature (/signup)
#### Requires users submit form values
 - email
 - password
 - first_name
 - last_name
 - address

#### Address Autocomplete
 - Uses google maps api
 - Autocompletes user entries
 - google places api derives local elements
   - street number
   - street
   - city
   - state
   - zip
  
### login feature (/login)
#### Authentication toState middleware
 - Uses firebase auth for checking firebase login state on both the client & server side
 - Consumes User Factory service provider to check loggedin state each state change
 - Creates token if user successfully authenticated
 - Deletes token & user object if user logs out

#### express  login api endpoint
 - ```/api/v1/user```
 - Adds server side token check
 - sends json with user data & roles defined in db

### confirmation feature (/confirmation)
### admin feature (/admin)

## Bugs
### ToFix
 - autocomplete required needs angular filter
 - remove console.log stuff
### Styling
 - Header menu logic could use some work
 - Refactor auth & app alerts to ng-messages
 - Refactor table to google charts table
### Errors
 - Aria label warnings
