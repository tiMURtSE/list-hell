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

export interface ContextProps {
	tabs: ITab[];
	setTabs: React.Dispatch<React.SetStateAction<ITab[]>>;
	selectedTab: ITab;
	setSelectedTab: React.Dispatch<React.SetStateAction<ITab>>;
}
