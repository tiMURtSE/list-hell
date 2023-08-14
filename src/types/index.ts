export interface ITab {
	name: string;
	tasks: ITask[];
}

export interface ITask {
	id: string;
	value: string;
	subTasks: ITask[];
	isCompleted: boolean;
}
