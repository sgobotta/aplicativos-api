# feathers-backend

> 

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/feathers-backend; npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Services

URI | METHOD | URL PARAMS | DATA PARAMS | REQUIRE AUTH
--- | --- | --- | --- | ---
**/users** | FIND | (optionally) id, password, username, facebookId  | |  Yes
**/users** | DELETE | id | |  Yes
**/users** | UPDATE | id | ```{"email": String, "password": String, "username": String, "facebookId": String, "accessToken": String}``` |  Yes
**/users** | CREATE | | ```{"email": String, "password": String, "username": String, "facebookId": String, "accessToken": String}``` |  Yes
**/votes** | FIND | (optionally) name, province, percentage, voteType  | |  No
**/votes** | DELETE | id | |  No
**/votes** | UPDATE | id | ```{"name": String, "province": String, "percentage": String, "voteType": String"}``` |  No
**/votes** | CREATE | | ```{"name": String (required), "province": String (required), "percentage": String (required), "voteType": String (required)"}``` |  No
**/orders** | FIND | (optionally) name, province, percentage, voteType  | |  Yes
**/orders** | DELETE | id | |  Yes
**/orders** | UPDATE | id | ```{"title": String (required), "author": ObjectId (refer Users, required), "participants": String (required), "isActive": Boolean (required), "expiresAt": Date (required)}``` |  Yes
**/orders** | CREATE | | ```{"title": String (required), "author": ObjectId (refer Users, required), "participants": [OrderParticipants], "isActive": Boolean (required), "expiresAt": Date (required)}``` |  Yes

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
