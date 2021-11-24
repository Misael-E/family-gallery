const axios = require("axios");
const { cloudinary } = require("../config/cloudinary");
const logging = require("../config/logging");

const getImage = async (req, res, next) => {
	const { resources } = await cloudinary.search
		.expression("folder:esperanzate_gallery")
		.sort_by("public_id", "desc")
		.max_results(30)
		.execute();

	const secureUrls = resources.map((file) => file.secure_url);
	res.send(secureUrls);
};

const addMultipleImage = async (req, res, next) => {
	try {
		const multipleBase64Strings = req.files;

		if (!multipleBase64Strings) {
			return res.status(400).json({ message: "No picture attached!" });
		}

		let multiplePhotosPromise = multipleBase64Strings.map((picture) => {
			cloudinary.uploader.upload(picture, {
				upload_preset: "dev_setups",
			});
		});

		let imageResponses = await Promise.all(multiplePhotosPromise);
		res.json({ images: imageResponses });
	} catch (err) {
		logging.error(error);
		res.status(500).json({ err: "Upload Failed" });
	}
};

const addSingleImage = async (req, res, next) => {
	try {
		const base64String = req.files;
		const uploadResponse = await cloudinary.uploader.upload(base64String, {
			upload_preset: "dev_setups",
		});
		logging.info(uploadResponse);
		res.json({ msg: "Upload Success" });
	} catch (error) {
		logging.error(error);
		res.status(500).json({ err: "Upload Failed" });
	}
};

module.exports = { getImage, addMultipleImage, addSingleImage };
