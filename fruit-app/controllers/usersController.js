const express = require("express");
const router = express.Router();

const users = require("../users");
const User = require('../models').User;

// INDEX
router.get("/", (req, res) => {
  res.render("users/index.ejs");
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
  User.findAll({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  }).then((users) => {
    console.log(users);
    let user = users[0];
    res.redirect(`/users/profile/${user.id}`);
  });
});

// POST - CREATE NEW USER FROM SIGNUP
router.post("/", (req, res) => {
  console.log(req.body);
  users.push(req.body);
  res.redirect(`/users/profile/${users.length - 1}`);
});

// GET USERS PROFILE
router.get("/profile/:id", (req, res) => {
  User.findByPk(req.params.id).then((user) => {
    res.render("users/profile.ejs", { user });
  });
});

// EDIT PROFILE
router.put("/profile/:id", (req, res) => {
  User.update(req.body, {
    where: { id: req.params.id },
    returnin: true
  }).then((user) => res.redirect(`/users/profile/${req.params.id}`));
});

// DELETE USER
router.delete("/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } }).then(() => {
    res.redirect("/users"); //redirect back to index route
  });
});

module.exports = router;
