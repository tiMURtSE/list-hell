export interface LocalStorageData {
	tabs: TabItem[];
	taskLists: TaskList[];
}

export interface TabItem {
	id: string;
	value: string;
	taskListId: string;
	isValueChanging: boolean;
}

export interface TaskItem {
	id: string;
	value: string;
	subTasks: TaskItem[];
	isCompleted: boolean;
	isValueChanging: boolean;
}

export interface TaskList {
	id: string;
	tasks: TaskItem[];
}

export interface IContext {
	tabs: TabItem[];
	setTabs: React.Dispatch<React.SetStateAction<TabItem[]>>;
	activeTab: TabItem | null;
	tasks: TaskItem[] | null;
	setTasks: React.Dispatch<React.SetStateAction<TaskItem[] | null>>;
	setActiveTab: React.Dispatch<React.SetStateAction<TabItem | null>>;
	changeActiveTab: (tab: TabItem) => void;
	updateTasks: (tasks: TaskItem[]) => void;
	// isChanging: boolean;
	// setIsChanging: React.Dispatch<React.SetStateAction<boolean>>;
}
