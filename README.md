# Hello World V0
This app allows a user to create an account, see a confirmation page, allows a user to request admin access, and manage users if their request for admin access is approved.

## Starting
```
git clone https://github.com/ecommerce-technician/helloworld-demo
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

### Signup View (/signup)
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
  
### login view (/login)

### confirmation view (/confirmation)
