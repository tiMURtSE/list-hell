import { TabItem, TaskItem, TaskList } from "../types";
import { LocalStorage } from "./LocalStorage";
import { createNewTask } from "./createNewTask";

export class DatabaseManager {
	static addTab(newTab: TabItem) {
		const localStorageData = LocalStorage.get();
		const newTaskList = { id: newTab.taskListId, tasks: [] } as TaskList;

		localStorageData.tabs.push(newTab);
		localStorageData.taskLists.push(newTaskList);

		LocalStorage.set(localStorageData);
		return localStorageData.tabs;
	}

	static removeTab(tabToRemove: TabItem) {
		const localStorageData = LocalStorage.get();
		const updatedTabs = localStorageData.tabs.filter((tab) => tab.id !== tabToRemove.id);

		localStorageData.tabs = updatedTabs;
		localStorageData.taskLists = localStorageData.taskLists.filter(
			(taskList) => taskList.id !== tabToRemove.taskListId
		);

		LocalStorage.set(localStorageData);
		return localStorageData.tabs;
	}

	static changeTabValue(updatedTab: TabItem) {
		const localStorageData = LocalStorage.get();
		const updatedTabs = localStorageData.tabs.map((tab) => {
			if (tab.id === updatedTab.id) return updatedTab;

			return tab;
		});

		localStorageData.tabs = updatedTabs;

		LocalStorage.set(localStorageData);
		return localStorageData.tabs;
	}

	static addTask(taskListId: string) {
		const localStorageData = LocalStorage.get();
		const newTask = createNewTask();
		let updatedTasks = [] as TaskItem[];

		localStorageData.taskLists = localStorageData.taskLists.map((taskList) => {
			if (taskList.id === taskListId) {
				taskList.tasks.push(newTask);
				updatedTasks = taskList.tasks;
				return taskList;
			}
			return taskList;
		});

		LocalStorage.set(localStorageData);
		return updatedTasks;
	}

	static setTasks(tasks: TaskItem[], taskListId: string) {
		const localStorageData = LocalStorage.get();

		localStorageData.taskLists = localStorageData.taskLists.map((taskList) => {
			if (taskList.id === taskListId) {
				console.log({ ...taskList, tasks });
				return { ...taskList, tasks };
			}

			return taskList;
		});

		LocalStorage.set(localStorageData);
	}
}
