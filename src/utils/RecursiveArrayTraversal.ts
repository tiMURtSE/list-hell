import { TaskItem } from "../types";

export class RecursiveArrayTraversal {
	static removeTask = (tasks: TaskItem[], taskToDelete: TaskItem) => {
		let tasksCopy = JSON.parse(JSON.stringify(tasks)) as TaskItem[];

		tasksCopy = tasksCopy.filter((task) => {
			if (task.id !== taskToDelete.id) {
				if (task.subTasks.length) {
					task.subTasks = this.removeTask(task.subTasks, taskToDelete);
				}

				return task;
			}
		});

		return tasksCopy;
	};

	static completeTask = (tasks: TaskItem[], taskToComplete: TaskItem) => {
		const tasksCopy = JSON.parse(JSON.stringify(tasks)) as TaskItem[];

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

	static setNewTaskValue = (tasks: TaskItem[], updatedTask: TaskItem) => {
		const tasksCopy = JSON.parse(JSON.stringify(tasks)) as TaskItem[];

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

	static updateNesting = (tasks: TaskItem[], targetTask: TaskItem) => {
		const tasksCopy = JSON.parse(JSON.stringify(tasks)) as TaskItem[];
		const result = [];

		for (let i = 0; i < tasksCopy.length; i++) {
			if (tasksCopy[i].id === targetTask.id) {
				if (i !== 0) {
					tasksCopy[i - 1].subTasks.push(tasksCopy[i]);
					continue;
				}
			}

			if (tasksCopy[i].subTasks.length) {
				tasksCopy[i].subTasks = this.updateNesting(tasksCopy[i].subTasks, targetTask);
			}

			result.push(tasksCopy[i]);
		}

		return result;
	};

	static reverseUpdateNesting = (tasks: TaskItem[], targetTask: TaskItem) => {
		const tasksCopy = JSON.parse(JSON.stringify(tasks)) as TaskItem[];
		const result = [];

		for (let i = 0; i < tasksCopy.length; i++) {
			// INFINITE LOOP
			if (tasksCopy[i].subTasks.length) {
				if (tasksCopy[i].subTasks.some((task) => task.id === targetTask.id)) {
					const targetTaskIndex = tasksCopy[i].subTasks.findIndex(
						(task) => task.id === targetTask.id
					);
					// удалил targetTask
					const targetTaskInSubArray = tasksCopy[i].subTasks.splice(
						targetTaskIndex,
						1
					)[0];
					// удаляю все что ниже targetTask и сразу добавляю в subTasks targetTask'а
					targetTaskInSubArray.subTasks.push(
						...tasksCopy[i].subTasks.splice(targetTaskIndex)
					);

					tasksCopy.splice(i + 1, 0, targetTaskInSubArray);
				} else {
					tasksCopy[i].subTasks = this.reverseUpdateNesting(
						tasksCopy[i].subTasks,
						targetTask
					);
				}
			}

			result.push(tasksCopy[i]);
		}

		return result;
	};

	static reverseUpdateNesting2 = (tasks: TaskItem[], targetTask: TaskItem) => {
		const tasksCopy = JSON.parse(JSON.stringify(tasks)) as TaskItem[];
		const result = [];

		for (let i = 0; i < tasksCopy.length; i++) {
			result.push(tasksCopy[i]);
		}

		return result;
	};
}
