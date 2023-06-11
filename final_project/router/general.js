const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", (req, res) => {
   const {username, password} = req.body
 
   if(!username || !password){
       return res.send("Please enter Username ans password")
   }

   for(x in users){
       if(x['userName']===username){
           return res.send("User Already Exists")
       }
   }

   const newUser = {
       username, password
   }
   users.push(newUser)
   res.status(201).send(`User ${username} registered successfully`)
});


// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    // book = JSON.stringify(books)
    // return res.status(300).send(book);


//USING AXIOS ASYNC AWAIT
const book = await axios.get("URL to get all books")
res.send(book)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
// USING AXIOS AND ASYNC-AWAIT
const book = await axios.get("URL to find one book with isbn", {
    params:{
        isbn: isbn    //Sending isbn number to find a book
    }
}).then(response => res.send(response))

});

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    // const { author } = req.params
    // const keys = Object.keys(books)

    // for (let i = 0; i < keys.length; i++) {
    //     let book = books[keys[i]]
    //     if(book['author'] === author){
    //         return res.status(201).send(book)
    //     }
    // }

    // USING AXIOS AND ASYNC-AWAIT
const book = await axios.get("URL to find one book with isbn", {
    params:{
        author: author  //Sending author name number to find a book
    }
}).then(response => res.send(response))
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    // const { title } = req.params
    // const keys = Object.keys(books)

    // for (let i = 0; i < keys.length; i++) {
    //     let book = books[keys[i]]
    //     if(book['title'] === title){
    //         return res.status(201).send(book)
    //     }
    // }

    // USING AXIOS AND ASYNC-AWAIT
const book = await axios.get("URL to find one book with isbn", {
    params:{
        title: title//Sending isbn number to find a book
    }
}).then(response => res.send(response))

});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const {isbn} = req.params
    return res.status(300).json({review: books[isbn]['reviews']});
});

module.exports.general = public_users;
