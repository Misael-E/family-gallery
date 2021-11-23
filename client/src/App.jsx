import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
	const [imageList, setImageList] = useState(null);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_HOST}/photo_api/photos`)
			.then((response) => {
				const imgUrl = response;
				console.log(imgUrl);
			})
			.catch((err) => console.log(err));
	}, []);

	console.log(imageList);
	return <div></div>;
};

export default App;
