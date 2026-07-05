const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid"); 
const methodOverride = require("method-override");


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    { id: uuidv4(), username: "Jinay", content: "I Love Coding!" },
    { id: uuidv4(), username: "Aman", content: "Coding Tutor!" },
    { id: uuidv4(), username: "Apna College", content: "Hard work is the key to success!" },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

//Post Request
// 1. Show the form
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// 2. Process the form data
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts"); //This will By Default give the get request 
});


// What does it do?
// Takes the id from the URL.
// Finds the corresponding post.
// Displays that post on the screen.
//Show Route or View Route
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) return res.send("Post not found");
    res.render("show.ejs", { post });
});


// What does it do?
// Takes the id from the URL.
// Receives the updated data from the form (req.body).
// Finds the post.
// Changes its values.
// Redirects to the posts page.
//Update a specific post
app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { username, content } = req.body;

    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).send("Post not found");

    post.username = username;
    post.content = content;

    res.redirect("/posts"); // Redirect to posts after update
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) return res.send("Post not found");
    res.render("edit.ejs", { post });
});

//Destroy Route
app.get("/posts/:id/delete", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    if (!post) return res.send("Post not found");

    res.render("delete.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    posts = posts.filter(post => post.id !== id); // remove the post in which 
    //when the condition is false donot keep it in the array 
    //assign new array with all of the satisfy the conditions
    res.redirect("/posts"); // redirect to main posts page
});

app.listen(port, () => {
    console.log("Listening to port : " + port);
});


//filter() creates a new array containing only the elements that satisfy the given condition.
