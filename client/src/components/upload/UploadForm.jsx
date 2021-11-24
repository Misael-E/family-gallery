import { useState } from "react";
import axios from "axios";

const UploadForm = () => {
	const [selectedFiles, setSelectedFiles] = useState();

	const handleFileInputChange = (e) => {
		const files = Array.from(e.target.files);

		files.forEach((file) => {
			const reader = new FileReader();
			reader.onload = () => {
				temp.push(reader.result);
			};
			reader.readAsDataURL(file);
		});
	};

	const handleSubmitFile = async (e) => {
		e.preventDefault();

		if (!selectedFiles) return;

		const params = {
			data: selectedFiles,
		};

		if (selectedFiles.length === 1) {
			await axios.post(
				`${process.env.REACT_APP_HOST}/api/single-upload`,
				selectedFiles
			);
		} else {
			await axios.post(
				`${process.env.REACT_APP_HOST}/api/multiple-upload`,
				selectedFiles
			);
		}
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
