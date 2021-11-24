import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navigation/Navbar";

import Home from "./pages/Home";
import Upload from "./pages/Upload";

const App = () => {
	return (
		<div className="container">
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/upload" element={<Upload />} />
			</Routes>
		</div>
	);
};

export default App;
