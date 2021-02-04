const express = require("express");
const router = express.Router();

const User = require('../models').User;
const Fruit = require('../models').Fruit;

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
  User.findAll({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  }).then((users) => {
    if (users.length > 0) {
      console.log('username/password combo is correct');
      let user = users[0];
      res.redirect(`/users/profile/${user.id}`);
    } else {
      console.log('username/password combo is not correct');
      res.redirect('/users');
    }
  });
});

// POST - CREATE NEW USER FROM SIGNUP
router.post("/", (req, res) => {
  User.create(req.body).then(newUser => {
    res.redirect(`/users/profile/${newUser.id}`);
  });
});

// GET USERS PROFILE
router.get("/profile/:id", (req, res) => {
  User.findByPk(req.params.id, {
    include: [
      {
        model: Fruit,
        attributes: ["id", "name"],
      },
    ],
  }).then((userProfile) => {
    res.render("users/profile.ejs", {
      user: userProfile,
    });
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
