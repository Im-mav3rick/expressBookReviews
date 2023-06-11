const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
}

const authenticatedUser = (username, password) => { //returns boolean
    for(let i =0;i<users.length; i++){
        if(users[i]['username']===username && users[i]['password']==password){
            return true
        }
    }

    return false
    //write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.put("/review/:isbn", (req, res) => {
    const {isbn} = req.params
    const { review, username} = req.query
    books[isbn]['reviews'][username]=review


    return res.json(books[isbn]);
});
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body
    if (authenticatedUser(username, password)) {
        res.send("User logged in successfully")
    }
    return res.status(300).json("failed");
});

regd_users.delete("/review/:isbn", (req, res) => {
    const {isbn} = req.params
    const {username} = req.query

    delete books[isbn]['reviews'][username]


    return res.json("Review Deleted Successfully");
});

// Add a book review


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
