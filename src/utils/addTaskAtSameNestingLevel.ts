import { TaskItem } from "../types";

export const addTaskAtSameNestingLevel = (
	tasks: TaskItem[],
	newTask: TaskItem,
	previousTaskId: string
) => {
	const tasksCopy = JSON.parse(JSON.stringify(tasks)) as TaskItem[];

	for (let i = 0; i < tasksCopy.length; i++) {
		if (tasksCopy[i].id === previousTaskId) {
			newTask.subTasks.push(...tasksCopy[i].subTasks.splice(0));
			tasksCopy.splice(i + 1, 0, newTask);
			break;
		}

		if (tasksCopy[i].subTasks.length) {
			tasksCopy[i].subTasks = addTaskAtSameNestingLevel(
				tasksCopy[i].subTasks,
				newTask,
				previousTaskId
			);
		}
	}

	return tasksCopy;
};
