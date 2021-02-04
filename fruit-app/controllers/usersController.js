const express = require("express");
const router = express.Router();

const users = require("../users");
const User = require('../models').User;

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
