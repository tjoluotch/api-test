const User = require('../models/user');
const bcrypt = require('bcryptjs');
var mysql = require('mysql')

// Create and Save a new User
exports.create = (req, res) => {
    //validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Username cannot be empty"
        });
    }
    else if (!req.body.password) {
        return res.status(400).send({
            message: "password cannot be empty"
        });
    }
    else if (!req.body.email) {
        return res.status(400).send({
            message: "email cannot be empty"
        });
    }


    // create a User Account
    const user = new User({
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });

    //using mysql

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'new_schema'
    });
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");


        connection.query("INSERT INTO users (name,password,email) VALUES ('" + req.body.name + "','" + bcrypt.hashSync(req.body.password, 10) + "','" + req.body.email + "'); ", function (err, result) {
            if (err){
                res.status(500).send({
                    message: err.message || "some error occured while getting all users."
                })
            }
            console.log("1 record inserted");
            res.send("Success");
        });
    });
};

    /*  //*********CODE FOR MONGO DB**********

     //save user to database
     user.save()
         .then(data => {
             res.send(data)
     }).catch(err => {
         res.status(500).send({
             message: err.message || "Some error occured while creating the User Account."
         });
     }); */


// Retrieve all Users from the Database
    exports.findAll = (req, res) => {
        User.find()
            .then(users => {
                res.send(users);
            }).catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while getting all users."
            });
        });

    };
