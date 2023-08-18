export interface ITab {
	id: string;
	title: string;
	tasks: ITask[];
}

export interface ITask {
	id: string;
	value: string;
	subTasks: ITask[];
	isCompleted: boolean;
}

export interface IContext {
	tabs: ITab[];
	setTabs: React.Dispatch<React.SetStateAction<ITab[]>>;
	activeTab: ITab;
	setActiveTab: React.Dispatch<React.SetStateAction<ITab>>;
}
