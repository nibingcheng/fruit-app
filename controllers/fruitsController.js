const express = require("express");
const router = express.Router();

// const fruits = require("../fruits.js");
const Fruit = require('../models').Fruit;
const User = require('../models').User;

//Sequelize GET route
router.get("/", (req, res) => {
  Fruit.findAll().then((fruits) => {
    res.render("index.ejs", {
      fruits: fruits,
    });
  });
});

//put this above your show.ejs file
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

router.post("/", (req, res) => {
  if (req.body.readyToEat === "on") {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true; //do some data correction
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false; //do some data correction
  }

  Fruit.create(req.body).then((newFruit) => {
    res.redirect("/fruits");
  });
});

router.get("/:id", (req, res) => {
  Fruit.findByPk(req.params.id, {
      include: [{
          model: User,
          attributes: ['name']
      }],
      attributes: ['name', 'color', 'readyToEat']
  })
  .then(fruit => {
      res.render('show.ejs', {
          fruit: fruit
      });
  })
})

router.get("/:id/edit", function (req, res) {
  Fruit.findByPk(req.params.id).then((fruit) => {
    res.render('edit.ejs', { fruit });
  });
});

router.put("/:id", (req, res) => {
  //:index is the index of our fruits array that we want to change
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;

  Fruit.update(req.body, {
    where: { id: req.params.id },
    returning: true
  }).then((fruit) => res.redirect("/fruits"));
});

router.delete("/:id", (req, res) => {
  Fruit.destroy({ where: { id: req.params.id }}).then(() => {
    res.redirect('/fruits')
  });
});

module.exports = router;
