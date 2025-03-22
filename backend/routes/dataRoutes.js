const express = require("express");
const { uploadData } = require("../data/upload");
const { updateData } = require("../data/update");
const { getData } = require("../data/get");
const { getAllData } = require("../data/get");
const { emailler } = require("../data/emailer");
const { deleteData } = require("../data/delete");


const router = express.Router();

// Routes
router.post("/upload", uploadData);
router.post("/update", updateData);
router.get("/get", getData);
router.get("/getAll", getAllData);
router.post("/emailler", emailler);
router.delete("/delete", deleteData);




module.exports = router;