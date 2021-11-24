import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import UploadForm from "./components/upload/UploadForm";

const App = () => {
	const [imageList, setImageList] = useState();

	const fetchImages = async () => {
		try {
			axios
				.get(`${process.env.REACT_APP_HOST}/api/photos`)
				.then((result) => {
					const data = result.data;
					setImageList(data);
				});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchImages();
	}, []);

	return (
		<div>
			<UploadForm />
		</div>
	);
};

export default App;
