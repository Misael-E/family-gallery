const express = require("express");
const cors = require("cors");
const logging = require("./config/logging");
const galleryRoutes = require("./routes/gallery");

require("dotenv").config();

const { json } = require("body-parser");

const app = express();

app.use(cors());
app.use(json());

/** Custom Routes */
app.use("/photo_api", galleryRoutes);

/** Health Check */
app.get("/healthcheck", (req, res, next) => {
	return res.status(200).json({ message: "Server is running!" });
});

const PORT = 8000;

app.listen(PORT, () => logging.info(`Server is running on port ${PORT}`));
