const express = require("express");
const galleryController = require("../controllers/gallery");

const router = express.Router();

router.get("/photos", galleryController.getImage);

router.post("/upload", galleryController.addImage);

module.exports = router;
