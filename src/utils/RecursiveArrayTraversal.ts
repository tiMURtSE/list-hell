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

	static addToNestedList = (tasks: ITask[], targetTaskId: string) => {
		const tasksCopy = JSON.parse(JSON.stringify(tasks)) as ITask[];

		for (let i = 0; i < tasksCopy.length; i++) {
			if (tasksCopy[i].id === targetTaskId) {
				tasksCopy[i - 1].subTasks.unshift({ ...tasksCopy[i], subTasks: [] });
				break;
			}

			if (tasksCopy[i].subTasks.length) {
				tasksCopy[i].subTasks = this.addToNestedList(tasksCopy[i].subTasks, targetTaskId);
			}
		}

		return tasksCopy;
	};
}
