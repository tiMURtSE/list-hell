import { ITask } from "../types";

export const findTaskPosition = (tasks: ITask[], targetTaskId: string) => {
	let taskPosition;

	for (const task of tasks) {
		if (task.id === targetTaskId) {
			const taskPosition = tasks.findIndex((task) => task.id === targetTaskId);

			return taskPosition;
		}

		if (task.subTasks.length) {
			taskPosition = findTaskPosition(task.subTasks, targetTaskId) as number;
		}
	}

	return taskPosition;
};
