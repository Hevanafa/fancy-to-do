import React from "react";
import { ITaskItem } from "../../App";
import { DBDateFormatter, getReadableDate } from "../../modules/commonDate";
import { GenericOnClickEvent, getImgSrc } from "../../modules/generics";

import "./index.scss";

interface IProps {
	isHome: boolean;
	isEditMode: boolean;

	calendarDate: Date;
	tasks: Map<string, ITaskItem[]>;

	checkTaskDOM: GenericOnClickEvent;
	editTaskDOM: GenericOnClickEvent;
	deleteTaskDOM: GenericOnClickEvent;
}
export default class TaskList extends React.Component<IProps> {
	render() {
		const {
			isHome,
			isEditMode,

			calendarDate,
			tasks,

			checkTaskDOM,
			editTaskDOM,
			deleteTaskDOM
		} = this.props;

		const dateStr = DBDateFormatter.format(calendarDate),
			taskList = tasks.get(dateStr),
			thereIsTask = taskList && taskList.length > 0;

		return (
			<div className="task-list-container">
				{
					thereIsTask
						? <img
							src={getImgSrc("/home/list-bg.png")}
							className="list-bg"
							alt="list" />
						: null
				}

				<div className="heading">
					{getReadableDate(calendarDate)}
				</div>

				<div className="scrollable-area">
					{
						thereIsTask
							? taskList?.map((item, idx) => {
								const hasLongText = item.label.length > 20;
								const className = "list-item"
									+ (item.checked ? " checked" : "")
									+ (hasLongText ? " long-text" : "");

								const btnEdit = (
									<button
										className="btn-transparent btn-edit"
										{...{ idx: idx }}
										onClick={editTaskDOM}>

										{
											item.checked
												? <img
													src={getImgSrc("/home/white-pencil.png")}
													alt="edit" />
												: <img
													src={getImgSrc("/home/pencil.png")}
													alt="edit" />
										}
									</button>
								);

								const btnDelete = (
									<button
										className="btn-transparent btn-delete"
										{...{ idx: idx }}
										onClick={deleteTaskDOM}>
										<img
											src={getImgSrc("/home/delete.png")}
											alt="delete" />
									</button>
								);

								const checkbox = (
									<div
										className="checkbox"
										{...{ idx: idx }}
										onClick={checkTaskDOM}>
										{
											item.checked
												? <img
													src={getImgSrc("/home/white-checkmark.png")}
													alt="white checkmark" />
												: null
										}
									</div>
								);

								return (
									<div
										key={`li_${idx}`}
										className={className}>
										{
											item.checked
												? <>
													<div className="inner-shadow"></div>

													<img
														src={getImgSrc("/home/task-checkmark.png")}
														className="task-checkmark"
														alt="task checkmark" />
												</>
												: null
										}

										<div className="task-label"
											{...{ idx: idx }}
											onClick={
												isEditMode
													? editTaskDOM
													: checkTaskDOM
											}>
											<span>
												{item.label}
											</span>

											{isEditMode ? btnEdit : null}
										</div>

										{isEditMode ? btnDelete : null}

										{isHome ? checkbox : null}
									</div>
								);
							})
							: null
					}
				</div>
			</div>
		);
	}

}