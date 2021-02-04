const express = require("express");
const router = express.Router();

const users = require("../users");

// INDEX
router.get("/", (req, res) => {
  console.log(users);
  res.render("users/index.ejs", {
    users: users,
  });
});

// GET SIGNUP FORM
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

// GET LOGIN
router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

// POST LOGIN
router.post("/login", (req, res) => {
  console.log(req.body);
  let index = users.findIndex(
    (user) =>
      user.username === req.body.username && user.password === req.body.password
  );

  res.redirect(`/users/profile/${index}`);
});

// POST - CREATE NEW USER FROM SIGNUP
router.post("/", (req, res) => {
  console.log(req.body);
  users.push(req.body);
  res.redirect(`/users/profile/${users.length - 1}`);
});

// GET USERS PROFILE
router.get("/profile/:index", (req, res) => {
  res.render("users/profile.ejs", {
    user: users[req.params.index],
    index: req.params.index,
  });
});

// EDIT PROFILE
router.put("/profile/:index", (req, res) => {
  users[req.params.index] = req.body;
  res.redirect(`/users/profile/${req.params.index}`);
});

// DELETE USER
router.delete("/:index", (req, res) => {
  users.splice(req.params.index, 1); //remove the item from the array
  res.redirect("/users"); //redirect back to index route
});

module.exports = router;
