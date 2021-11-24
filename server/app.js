const express = require("express");
const cors = require("cors");
const logging = require("./config/logging");
const galleryRoutes = require("./routes/gallery");

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

/** Custom Routes */
app.use("/api", galleryRoutes);

/** Health Check */
app.get("/healthcheck", (req, res, next) => {
	return res.status(200).json({ message: "Server is running!" });
});

const port = process.env.PORT || 8000;

app.listen(port, () => logging.info(`Server is running on port ${port}`));
