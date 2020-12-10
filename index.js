// import thư viện có sẵn
const path = require("path");
// import thư viện cài đặt thêm
const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

//import authentication middleware
const { auth } = require("./middleware/auth");

//import file
const config = require("./config/key");
const { Item } = require("./models/item");
const item = require("./models/item");
const { User } = require("./models/user");

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

// set JSON parse and cookie parse cho request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
hbs.registerHelper("isPositive", (number) => number > 0);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

/*--------------ROUTE FOR PAGEs-------------------------------- */

// MAIN PAGE
app.get("/", auth, async (req, res) => {
  let isAdmin = req.isAdmin;
  let isNoneUser = req.isNoneUser;
  let check = {
    isAdmin,
    isNoneUser,
  };

  let items = await Item.find();
  res.render("mainPage", { items, check });
});

// ADMIN PAGE
app.get("/adminPage", auth, async (req, res) => {
  let isAdmin = req.isAdmin;
  let isNoneUser = req.isNoneUser;
  let check = {
    isAdmin,
    isNoneUser,
  };
  const userId = req.user._id;
  const email = req.user.email;
  let items = await Item.find({ userId });
  res.render("adminPage", { items, email, check });
});

// LOGIN PAGE
app.get("/loginPage", (req, res) => {
  let check = {
    isAdmin: false,
    isNoneUser: true,
  };
  res.render("loginPage", { check });
});

// REGISTER PAGE
app.get("/registerPage", (req, res) => {
  let check = {
    isAdmin: false,
    isNoneUser: true,
  };
  res.render("registerPage", { check });
});

// ADD ITEM PAGE
app.get("/addItemPage", auth, (req, res) => {
  let isAdmin = req.isAdmin;
  let isNoneUser = req.isNoneUser;
  let check = {
    isAdmin,
    isNoneUser,
  };
  res.render("addItemPage", { check });
});

// UPDATE ITEM PAGE
app.get("/updateItemPage/:id", auth, (req, res) => {
  let isAdmin = req.isAdmin;
  let isNoneUser = req.isNoneUser;
  let check = {
    isAdmin,
    isNoneUser,
  };
  const itemId = req.params.id;
  Item.findOne({ id: itemId }, (err, item) => {
    if (err) return res.json({ success: false, message: err });
    res.render("updateItemPage", { item, check });
  });
});

// DETAIL ITEM PAGE
app.get("/detailItemPage/:id", auth, async (req, res) => {
  let isAdmin = req.isAdmin;
  let isNoneUser = req.isNoneUser;
  let check = {
    isAdmin,
    isNoneUser,
  };

  // Get itemId from Url params and query
  const itemId = req.params.id;
  Item.findOne({ id: itemId }, (err, item) => {
    if (err) return res.json({ success: false, message: err });
    return res.render("detailItemPage", {
      item,
      check,
    });
  });

  // Add seen Item to user
  if (req.user) {
    const userId = req.user._id;
    const user = await User.findById(userId);
    user.seenItem.push(itemId);
    // Delete duplicate seen item
    user.seenItem = user.seenItem.filter(
      (a, b) => user.seenItem.indexOf(a) === b
    );
    await user.save();
  }
});

// SEEN ITEM PAGE
app.get("/seenItemPage", auth, async (req, res) => {
  let isAdmin = req.isAdmin;
  let isNoneUser = req.isNoneUser;
  let check = {
    isAdmin,
    isNoneUser,
  };

  let items = [];
  if (req.user) {
    let userId = req.user._id;
    const user = await User.findById(userId);
    let seenItem = user.seenItem;
    items = await Item.find({
      id: {
        $in: seenItem,
      },
    });
  }

  return res.render("seenItemPage", { items, check });
});

/*---------------------------------------------- */

/*-----------Route for request add, update, delete item------------------ */
app.use("/items/", require("./controllers/items"));
app.use("/users/", require("./controllers/users"));
/*---------------------------------------------- */

app.listen(port, () => {
  console.log(`server listen on port ${port}`);
});
