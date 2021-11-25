import { useState, useRef } from "react";

import axios from "axios";

import uploadImg from "../../assets/cloud-upload-regular-240.png";
import defaultImgIcon from "../../assets/file-blank-solid-240.png";

const DropFileInput = () => {
	const wrapperRef = useRef(null);

	const [selectedFiles, setSelectedFiles] = useState([]);

	const onDragEnter = () => wrapperRef.current.classList.add("dragover");

	const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

	const onDrop = () => wrapperRef.current.classList.remove("dragover");

	const onFileDrop = (e) => {
		const files = e.target.files;
		setSelectedFiles(Array.from(files));
	};

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		if (!selectedFiles) return;

		for (const file in selectedFiles) {
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

		await axios.post(`/api/upload`, body);
	};

	const fileRemove = (file) => {
		const updatedList = [...selectedFiles];

		updatedList.splice(selectedFiles.indexOf(file), 1);

		setSelectedFiles(updatedList);
	};

	return (
		<div className="main-container">
			<div
				ref={wrapperRef}
				className="drop-file-container"
				onDragEnter={onDragEnter}
				onDragLeave={onDragLeave}
				onDrop={onDrop}
			>
				<div className="drop-file-label">
					<img src={uploadImg} alt="" />
					<p>Drag & Drop your files here</p>
				</div>
				<form onSubmit={handleOnSubmit}>
					<input
						multiple
						type="file"
						value=""
						onChange={onFileDrop}
					/>
				</form>
			</div>
			{selectedFiles.length > 0 ? (
				<div className="file-preview">
					<p className="file-preview-title">Ready to upload</p>
					{selectedFiles.map((item, idx) => (
						<div key={idx} className="file-preview-item">
							<img src={defaultImgIcon} alt="" />
							<div className="item-info">
								<p>{item.name}</p>
								<p>{item.size + " Bytes"}</p>
							</div>
							<span
								className="item-delete"
								onClick={() => fileRemove(item)}
							>
								x
							</span>
						</div>
					))}
				</div>
			) : null}
			<button className="btn" type="submit">
				Submit
			</button>
		</div>
	);
};

export default DropFileInput;
