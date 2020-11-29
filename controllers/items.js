const { response } = require("express");
const express = require("express");
const multer = require("multer");
const router = express.Router();

// import file define Item object
const { Item } = require("../models/item");

let newItem;
// Add Item
router.post("/addItem", async (req, res) => {
  //check duplicate id
  let duplicateItem = await Item.find({ id: req.body.id });
  if (duplicateItem.length !== 0) {
    return res.json({ success: false, message: "Duplicate Id" });
  }

  newItem = new Item(req.body);
  res.status(200).json({ success: true, newItem });
});

// //Middleware Xử lí image user gửi lên
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|PNG|JPEG|JPG)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

//Upload Image
router.post("/uploadNewImage", upload.single("image"), async (req, res) => {
  if (req.file) {
    let data = req.file.buffer;
    let buff = Buffer.from(data, "utf-8");
    let base64Data = buff.toString("base64");

    newItem.image = base64Data;
    await newItem.save();
    newItem = new Item();
    res.status(200).json({ success: true });
  }
});

//Delete Item
router.delete("/deleteItem/:id", async (req, res) => {
  const itemId = req.params.id;
  Item.findOneAndDelete({ id: itemId }, (err, deleteItem) => {
    if (err) return res.json({ success: false, message: err });
  });
  res.status(200).json({ success: true });
});

let updatedItem = new Item();
//Get UpdatedItem data
router.post("/getUpdatedItem", (req, res) => {
  const itemId = req.body.itemId;

  // let filterdItem = items.filter((item) => item.id === itemId);
  // filterdItem = filterdItem[0];
  Item.findOne({ id: itemId }, (err, item) => {
    if (err) return res.json({ success: false, message: err });
    // set image cho updatedItem trong th user ko update image
    updatedItem.image = item.image;
    res.status(200).json({ success: true, item });
  });
});

// Save UpdatedItem
router.put("/saveUpdatedItem", (req, res) => {
  const { id, title, brand, summary, price, number } = req.body;
  // update lại các property của item
  updatedItem.id = id;
  updatedItem.title = title;
  updatedItem.brand = brand;
  updatedItem.summary = summary;
  updatedItem.price = price;
  updatedItem.number = number;
  return res.status(200).json({ success: true, item: updatedItem });
});

// Save Updated Image
router.put("/uploadUpdatedImage", upload.single("image"), async (req, res) => {
  if (req.file) {
    let data = req.file.buffer;
    let buff = Buffer.from(data, "utf-8");
    let base64Data = buff.toString("base64");

    updatedItem.image = base64Data;
  }

  const response = await Item.findOneAndDelete({ id: updatedItem.id });
  if (!response) {
    return res.json({ success: false, message: response });
  }
  const response2 = await updatedItem.save();
  if (!response2) {
    return res.json({ success: false, message: response2 });
  }
  updatedItem = new Item();
  res.json({ success: true });
});

// see detail Item
router.get("/getDetailItem/:id", async (req, res) => {
  const itemId = req.params.id;
  Item.findOne({ id: itemId }, (err, item) => {
    if (err) return res.json({ success: false, message: err });
    return res.json({ success: true });
  });
});
module.exports = router;
