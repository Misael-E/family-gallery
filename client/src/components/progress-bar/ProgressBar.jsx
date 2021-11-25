import React from "react";

const ProgressBar = ({ percent }) => {
	return (
		<div className="progress-container">
			<div
				className="progress-fill"
				style={{ width: `${percent}%` }}
			></div>
			<span className="progress-text">{percent}%</span>
		</div>
	);
};

export default ProgressBar;
