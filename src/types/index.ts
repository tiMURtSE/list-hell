export interface ITab {
	id: string;
	title: string;
	tasks: ITask[];
	isTitleChanging: boolean;
}

export interface ITask {
	id: string;
	value: string;
	subTasks: ITask[];
	isCompleted: boolean;
	isValueChanging: boolean;
}

export interface IContext {
	tabs: ITab[];
	setTabs: React.Dispatch<React.SetStateAction<ITab[]>>;
	activeTab: ITab | null;
	setActiveTab: React.Dispatch<React.SetStateAction<ITab | null>>;
	isChanging: boolean;
	setIsChanging: React.Dispatch<React.SetStateAction<boolean>>;
}
