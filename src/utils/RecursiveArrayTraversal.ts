import { ITask } from "../types";

export class RecursiveArrayTraversal {
	static deleteTask = (tasks: ITask[], taskToDelete: ITask) => {
		let tasksCopy = JSON.parse(JSON.stringify(tasks)) as ITask[];

		tasksCopy = tasksCopy.filter((task) => {
			if (task.id !== taskToDelete.id) {
				if (task.subTasks.length) {
					task.subTasks = this.deleteTask(task.subTasks, taskToDelete);
				}

				return task;
			}
		});

		return tasksCopy;
	};

	static completeTask = (tasks: ITask[], taskToComplete: ITask) => {
		const tasksCopy = JSON.parse(JSON.stringify(tasks)) as ITask[];

		for (let i = 0; i < tasksCopy.length; i++) {
			if (tasksCopy[i].id === taskToComplete.id) {
				tasksCopy[i] = taskToComplete;
				break;
			}

			if (tasksCopy[i].subTasks.length) {
				tasksCopy[i].subTasks = this.completeTask(tasksCopy[i].subTasks, taskToComplete);
			}
		}

		return tasksCopy;
	};

	static setNewTaskValue = (tasks: ITask[], updatedTask: ITask) => {
		const tasksCopy = JSON.parse(JSON.stringify(tasks)) as ITask[];

		for (let i = 0; i < tasksCopy.length; i++) {
			if (tasksCopy[i].id === updatedTask.id) {
				tasksCopy[i] = updatedTask;
				break;
			}

			if (tasksCopy[i].subTasks.length) {
				tasksCopy[i].subTasks = this.setNewTaskValue(tasksCopy[i].subTasks, updatedTask);
			}
		}

		return tasksCopy;
	};

	static updateNesting = (tasks: ITask[], targetTask: ITask) => {
		const tasksCopy = JSON.parse(JSON.stringify(tasks)) as ITask[];
		const result = [];

		for (let i = 0; i < tasksCopy.length; i++) {
			if (tasksCopy[i].id === targetTask.id) {
				if (i !== 0) {
					tasksCopy[i - 1].subTasks.unshift(tasksCopy[i]);
					break;
				}
			}

			if (tasksCopy[i].subTasks.length) {
				tasksCopy[i].subTasks = this.updateNesting(tasksCopy[i].subTasks, targetTask);
			}

			result.push(tasksCopy[i]);
		}

		return result;
	};

	static reverseUpdateNesting = (tasks: ITask[], targetTask: ITask) => {
		const tasksCopy = JSON.parse(JSON.stringify(tasks)) as ITask[];
		const result = [];

		for (let i = 0; i < tasksCopy.length; i++) {
			if (tasksCopy[i].subTasks.length) {
				if (tasksCopy[i].subTasks.some((task) => task.id === targetTask.id)) {
					tasksCopy.splice(
						i,
						0,
						tasksCopy[i].subTasks.filter((task) => task.id === targetTask.id)[0]
					);
					break;
				} else {
					this.reverseUpdateNesting(tasksCopy[i].subTasks, targetTask);
				}
			}

			// if (tasksCopy[i].subTasks.length) {
			// 	tasksCopy[i].subTasks = this.reverseUpdateNesting(
			// 		tasksCopy[i].subTasks,
			// 		targetTask
			// 	);
			// }

			result.push(tasksCopy);
		}

		return result;
	};
}