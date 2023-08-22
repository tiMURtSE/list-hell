import { ITask } from "../types";

export class RecursiveArrayTraversal {
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
