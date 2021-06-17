import React from "react";
import { getMonthName } from "../../modules/commonDate";
import { GenericOnClickEvent, getImgSrc } from "../../modules/generics";

import "../../styles/modals.scss";

// This component is structured the same as TaskEditorModal
interface IProps {
	calendarDate: Date; // only for starting date, the rest is done by state

	cancelButtonHandler: GenericOnClickEvent;
	confirmButtonHandler: GenericOnClickEvent;
}
interface IState {
	month: number;
	year: number;
	isMonthCoverVisible: boolean;
}
export default class GoToMonthModal extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		const {
			calendarDate
		} = props;

		this.state = {
			month: calendarDate.getMonth() + 1,
			year: calendarDate.getFullYear(),

			isMonthCoverVisible: true
		};
	}

	hideMonthCover() {
		this.setState({
			isMonthCoverVisible: false
		});
	}

	showMonthCover() {
		this.setState({
			isMonthCoverVisible: true
		});
	}

	handleInput(e: React.FormEvent<HTMLInputElement>) {
		const { name, value } = e.currentTarget;

		switch (name) {
			case "month":
				this.setState({
					month: Number(value)
				});
				break;
			case "year":
				this.setState({
					year: Number(value)
				});
				break;
		}
	}

	render() {
		const {
			cancelButtonHandler,
			confirmButtonHandler
		} = this.props;

		const {
			month,
			year,
			isMonthCoverVisible
		} = this.state;

		const dateStr = `${year}/${month}/1`,
			monthName = getMonthName(month - 1);


		return (
			<>
				<div className="blur-overlay"></div>

				<div className="go-to-month-modal">
					<div className="input-grid-2">
						<div className="input-group">
							<input
								type="number"
								name="month"
								placeholder="Month"
								value={month}
								min={1}
								max={12}
								onChange={this.handleInput.bind(this)}

								onFocus={this.hideMonthCover.bind(this)}
								onBlur={this.showMonthCover.bind(this)}
							/>

							{
								isMonthCoverVisible
									? <div className="month-cover">
										{monthName}
									</div>
									: null
							}
						</div>

						<div className="input-group">
							<input
								type="number"
								name="year"
								placeholder="Year"
								value={year}
								max={9999}
								onChange={this.handleInput.bind(this)}
							/>
						</div>
					</div>

					<div className="modal-button-group">
						<button
							className="btn-transparent btn-cancel"
							onClick={cancelButtonHandler}>
							<img
								src={getImgSrc("/task-editor/btn-cancel.png")}
								alt="cancel"
							/>
						</button>
						<button
							className="btn-transparent btn-confirm"
							{...{ "date-str": dateStr }}
							onClick={confirmButtonHandler}>
							<img
								src={getImgSrc("/task-editor/btn-confirm.png")}
								alt="cancel"
							/>
						</button>
					</div>
				</div>
			</>
		);
	}
}