const express = require("express");
const upload = require("../util/multer");

const galleryController = require("../controllers/gallery");

const router = express.Router();

router.get("/photos", galleryController.getImage);

router.post(
	"/multiple-upload",
	upload.array("photos", 50),
	galleryController.addMultipleImage
);

router.post(
	"/single-upload",
	upload.single("photo"),
	galleryController.addSingleImage
);

module.exports = router;
