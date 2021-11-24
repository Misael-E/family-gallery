import { useState } from "react";
import axios from "axios";

const UploadForm = () => {
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [fileInputState, setFileInputState] = useState("");

	const handleFileInputChange = (e) => {
		const files = e.target.files;
		setSelectedFiles(files);
		setFileInputState(e.target.value);
	};

	const handleSubmitFile = async (e) => {
		e.preventDefault();
		if (!selectedFiles) return;

		for (const file of selectedFiles) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				uploadImage(reader.result);
			};
			reader.onerror = () => {
				console.error("File Not Valid!");
			};
		}
	};

	const uploadImage = async (base64EncodedImage) => {
		const body = {
			data: base64EncodedImage,
		};

		await axios
			.post(`${process.env.REACT_APP_HOST}/api/upload`, body)
			.then((response) => console.log(response))
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<h1>Upload</h1>
			<form onSubmit={handleSubmitFile} className="form">
				<input
					type="file"
					name="image"
					multiple
					onChange={handleFileInputChange}
					value={fileInputState}
					className="form-input"
				/>
				<button className="btn" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default UploadForm;
