import { useState } from "react";
import { MenuItems } from "./MenuItems";

import { NavLink } from "react-router-dom";

const Navbar = () => {
	const [burger, setBurger] = useState(false);

	const handleClick = () => {
		setBurger(!burger);
	};

	return (
		<div className="navbar">
			<div className="logo">Esperanzate</div>
			<nav>
				<ul className={burger ? "menu-list" : "menu-list close"}>
					{MenuItems.map(({ title, path }, idx) => {
						return (
							<li key={idx}>
								<NavLink
									exact
									to={path}
									activeClassName="active"
								>
									{title}
								</NavLink>
							</li>
						);
					})}
				</ul>
			</nav>
			<div className="menu-icon" onClick={handleClick}>
				<i className={burger ? "fas fa-bars" : "fas fa-times"} />
			</div>
		</div>
	);
};

export default Navbar;
