import App from "../App";

function activateBottomMenu(this: App, itemIdx: number) {
	if (itemIdx === 2) {
		const {
			isAboutScreen,
			isAddNewTaskVisible,
			isCalendar
		} = this.state;

		if (isAboutScreen) {
			alert("You should be either in home, edit mode, or calendar view.");
			return;
		}

		// Immediately create a new task when the user is on the calendar
		if (isCalendar) {
			this.addNewTaskCustom();
			return;
		}

		// Don't reset the other modes when pressing the "add new task" button
		this.setState({
			isAddNewTaskVisible: !isAddNewTaskVisible
		});

		return;
	}

	this.setState({
		isHome: false,
		isEditMode: false,
		isCalendar: false,
		isAboutScreen: false
	}, () => {
		switch (itemIdx) {
			case 0:
				this.setState({
					isEditMode: true
				});
				break;

			case 1:
				this.setState({
					isHome: true
				});
				break;

			case 3:
				this.setState({
					isCalendar: true
				});
				break;

			case 4:
				this.setState({
					isAboutScreen: true
				});
				break;
		}
	});
}

function bottomMenuClickDOM(this: App, e: React.MouseEvent) {
	const idx = Number(e.currentTarget.getAttribute("idx"));
	this.activateBottomMenu(idx);
}

export {
	activateBottomMenu,
	bottomMenuClickDOM
}