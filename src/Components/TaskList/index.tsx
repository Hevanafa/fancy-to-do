import React from "react";
import { ITaskItem } from "../../App";
import { DBDateFormatter, getReadableDate } from "../../modules/commonDate";
import { GenericOnClickEvent } from "../../modules/generics";

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
			taskList = tasks.get(dateStr);

		return (
			<div className="task-list-container">
				<div className="heading">
					{getReadableDate(calendarDate)}
				</div>

				<div className="scrollable-area">
					{
						taskList && taskList.length > 0
							? taskList.map((item, idx) => (
								<div
									key={`li_${idx}`}
									className="list-item">
									<div className="task-label">
										<span
											{...{idx: idx}}
											onClick={
											isEditMode
												? editTaskDOM
												: checkTaskDOM
										}>
											{item.label}
										</span>

										{
											isEditMode
												? (
													<>
														<button
															{...{idx: idx}}
															onClick={editTaskDOM}>
																Pencil
														</button>
														<button
															{...{idx: idx}}
															onClick={deleteTaskDOM}>
																Garbage can
														</button>
													</>
												) : null
										}
									</div>

									{
										isHome
											? (
												<div className="checkbox">
													{
														item.checked
															? "Checked"
															: "Not checked"
													}
												</div>
											) : null
									}
								</div>
							))
							: null
					}
				</div>
			</div>
		);
	}

}