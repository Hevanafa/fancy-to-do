import React from "react";
import { getReadableDate } from "../../modules/commonDate";
import { getImgSrc, openLinkDOM } from "../../modules/generics";
import { isDevBuild, lastUpdate, versionStr } from "../../modules/versionInfo";

import "./index.scss";

export default class AboutUs extends React.Component {
	openLinkDOM = openLinkDOM.bind(this);

	getLinkButton(...params: [string, string]): JSX.Element;
	getLinkButton(url: string, imageName: string) {
		return (
			<button
				className="btn-transparent btn-link"
				{...{ link: url }}
				onClick={openLinkDOM}>
				<img
					src={getImgSrc(`/about-us/${imageName.toLowerCase()}.png`)}
					alt={imageName}
				/>
			</button>
		);
	}

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
					<span>T3CH_Kitsu</span>
					<span>
						{
							[
								["https://twitter.com/T3CH_Kitsu", "Twitter"],
								["https://instagram.com/t3ch_kitsu", "Instagram"],
								["https://m.facebook.com/100054932199428/", "Facebook"]
							].map(group =>
								this.getLinkButton(group[0], group[1])
							)
						}
					</span>
				</div>

				<div className="about-label">
					UI Design &amp; Programming
				</div>
				<div className="about-text">
					<span>
						Hevanafa
					</span>

					<span>
						{
							[
								["https://twitter.com/hevanafa", "Twitter"],
								["https://www.instagram.com/hevanafa", "Instagram"],
								["https://m.facebook.com/dhevansafa.hevanafa", "Facebook"]
							].map(group =>
								this.getLinkButton(group[0], group[1])
							)
						}
					</span>
				</div>

				<div className="about-text-smaller">
					The icons are from Freepik and Flaticon.
				</div>

				<div className="about-text-smaller about-donation">
					<span>
						Please donate to help us build better applications in the future!
					</span>
				</div>

				<div className="about-text-smaller">
					{
						isDevBuild
							? "Development Build"
							: null
					}<br />
					Version {versionStr}<br />
					Last update: {getReadableDate(lastUpdate)}
				</div>
			</div>
		);
	}
}