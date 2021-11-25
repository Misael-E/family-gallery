import { Switch, Route } from "react-router-dom";

import Navbar from "./components/navigation/Navbar";

import Home from "./pages/Home";
import Upload from "./pages/Upload";

const App = () => {
	return (
		<div className="container">
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/upload" component={Upload} />
			</Switch>
		</div>
	);
};

export default App;
