const multer = require("multer");

const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString() + "-" + file.originalname);
	},
});

const validateFile = (req, file, cb) => {
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
		cb(null, true);
	} else {
		cb({ message: "Unsupported File Type" }, false);
	}
};

const upload = multer({
	storage: storage,
	limits: { fileSize: 1024 * 1024 * 10 },
	fileFilter: validateFile,
});

module.exports = upload;
