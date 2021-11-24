import { useState } from "react";
import { MenuItems } from "./MenuItems";

import { NavLink } from "react-router-dom";

const Navbar = () => {
	const [burger, setBurger] = useState(false);

	const handleClick = () => {
		setBurger(!burger);
	};
	return (
		<nav className="navbar">
			<div className="navbar-logo">Esperanzate</div>
			<div className="menu-icon" onClick={handleClick}>
				<i className={burger ? "fas fa-times" : "fas fa-bars"}></i>
			</div>

			<ul className={burger ? "menu-list" : "menu-list close"}>
				{MenuItems.map(({ title, path }, idx) => {
					return (
						<li key={idx}>
							<NavLink to={path} activeClassName="active">
								{title}
							</NavLink>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navbar;
