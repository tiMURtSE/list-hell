import { TaskItem } from "../types";

export const createNewTask = () => {
	return {
		id: crypto.randomUUID(),
		value: "",
		isCompleted: false,
		isValueChanging: true,
		subTasks: [],
	} as TaskItem;
};
