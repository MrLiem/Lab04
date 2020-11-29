// import thư viện có sẵn
const path = require("path");
// import thư viện cài đặt thêm
const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//import middleware xử lý auth
const { auth } = require("./middleware/auth");
//import file
const config = require("./config/key");
const { Item } = require("./models/item");

// Khởi chạy express
const app = express();
const port = process.env.PORT || 3000;

// connect to mongoDB database
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected!!!"))
  .catch((err) => console.log(err));

// set JSON parse cho request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
hbs.registerHelper("isPositive", (number) => number > 0);
// hbs.registerHelper("isAdmin", () => {});

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// route for Page
app.get("/", async (req, res) => {
  let items = await Item.find();
  res.render("mainPage", { items });
});

app.get("/admin", async (req, res) => {
  let items = await Item.find();
  res.render("adminPage", { items });
});

app.get("/login", (req, res) => {
  res.render("loginPage");
});

app.get("/register", (req, res) => {
  res.render("registerPage");
});

app.get("/addItemPage", (req, res) => {
  res.render("addItemPage");
});

app.get("/updateItemPage", (req, res) => {
  res.render("updateItemPage");
});

// route for request add, update, delete item
app.use("/", require("./controllers/items"));
app.use("/api/users/", require("./controllers/users"));

app.listen(port, () => {
  console.log(`server listen on port ${port}`);
});
