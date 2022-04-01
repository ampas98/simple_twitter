Simple twitter app. Developed for demonstrational purposes  only.
Small overview of the backend can be found [here](./overview.md), and of the fronted [here](./client/overview.md).

## Instructions

 1. Make sure npm, nodejs and postgresql are installed on your computer.
 2. Create a postgres user with name: "me" and password: "password", and a database named "bl_twitter", with the new user having acces to the database, or change the connection to credentials as preffered in the [file setting up the connection](./models/db.js)
 3. Open terminal at the directory with the project, and run script "npm run install-both" to install all dependencies, and then run "npm run setup" to migrate database and seed test data.
 4. Run "npm run start-both" to start both the client and the server.