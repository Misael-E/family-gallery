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

const addImage = async (req, res, next) => {
	try {
		const multipleBase64Strings = req.body.data;

		await cloudinary.uploader.upload(
			multipleBase64Strings,
			{ upload_preset: "dev_setups" },
			(error, result) => {
				res.json(result);
			}
		);
	} catch (err) {
		logging.error(error);
		res.status(500).json({ err: "Upload Failed" });
	}
};

module.exports = { getImage, addImage };
