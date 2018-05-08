const express = require('express');
const bodyParser = require('body-parser');


const port = 8000;
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url)
    .then(() => {
    console.log("Successfully connected to the mongo database; to test SQL DB, please insert a new user");
}).catch(err => {
    console.log("Could not connect to the database. Exiting software... ");
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to the Application"});
});

require('./app/routes/account.routes')(app);

app.listen(port, () => {
    console.log("Server is on port " + port);
});