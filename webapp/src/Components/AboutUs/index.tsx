import React from "react";

import "./index.scss";

export default class AboutUs extends React.Component {
	render() {
		return (
			<div className="about-container">
				<div className="heading">
					About Us
				</div>

				<div className="about-label">
					App idea &amp; Wireframe
				</div>
				<div className="about-text">
					T3CH_Kitsu
				</div>

				<div className="about-label">
					UI Design &amp; Programming
				</div>
				<div className="about-text">
					Hevanafa
				</div>
			</div>
		);
	}
}