import React from "react";
import { getImgSrc } from "../../modules/generics";

import "./index.scss";

export default class EmptyTaskMessage extends React.Component {
	render() {
		return (
			<div className="empty-task-msg-container">
				<img
					src={getImgSrc("/home/help.png")}
					alt="help" />

				<div>
					You don’t have any tasks today.<br />
					Create one by pressing the “+” sign below, or review your tasks from the past.
				</div>
			</div>
		)
	}
}