import React from "react";
import { getReadableDate } from "../../modules/commonDate";
import { isDevBuild, lastUpdate, versionStr } from "../../modules/versionInfo";

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
					T3CH_Kitsu (Twitter, Instagram, Facebook)
				</div>

				<div className="about-label">
					UI Design &amp; Programming
				</div>
				<div className="about-text">
					Hevanafa (Twitter, Instagram, Facebook)
				</div>

				<div className="about-text-smaller">
					Please donate to help us build better applications in the future!
				</div>

				<div className="about-text-smaller">
					{
						isDevBuild
						? "Development Build"
						: null
					}<br/>
					Version {versionStr}<br/>
					Last update: {getReadableDate(lastUpdate)}
				</div>
			</div>
		);
	}
}