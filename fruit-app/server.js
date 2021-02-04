const express = require("express");
const app = express(); //app is an object
const methodOverride = require("method-override");

app.use(express.static("public"));

//after app has been defined, use methodOverride.
//We'll be adding a query parameter to our delete form named _method
app.use(methodOverride("_method"));

//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: true }));

app.use("/fruits", require("./controllers/fruitsController.js"));
app.use("/users", require("./controllers/usersController.js"));

app.listen(3000, () => {
  console.log("I am listening");
});
