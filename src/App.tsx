import { useState } from "react";
import styles from "./App.module.css";
import { TabContext } from "./hooks/useContext";
import { LocalStorage } from "./utils/LocalStorage";
import Tabs from "./components/Tabs/Tabs";
import Tasks from "./components/Tasks/Tasks";
import { ReactComponent as PlusIcon } from "./assets/plus.svg";
import { DatabaseManager } from "./utils/DatabaseManager";
import { TabItem, TaskItem } from "./types";

const tabsFromLocalStorage = LocalStorage.get().tabs;
const taskListsFromLocalStorage = LocalStorage.get().taskLists;

function App() {
	const [tabs, setTabs] = useState(tabsFromLocalStorage);
	const [activeTab, setActiveTab] = useState(tabs.length ? tabs[0] : null);
	const taskList = taskListsFromLocalStorage.find((list) => list.id === activeTab?.taskListId);
	const [tasks, setTasks] = useState(taskList ? taskList.tasks : null);

	const changeActiveTab = (tab: TabItem) => {
		const taskLists = LocalStorage.get().taskLists;
		const taskList = taskLists.find((list) => list.id === tab.taskListId);

		setActiveTab(tab);
		setTasks(taskList ? taskList.tasks : null);
	};

	const updateTasks = (tasks: TaskItem[]) => {
		if (activeTab) {
			DatabaseManager.setTasks(tasks, activeTab?.taskListId);
			setTasks(tasks);
		}
	};

	const addNewTask = () => {
		if (activeTab) {
			const updatedTasks = DatabaseManager.addTask(activeTab.taskListId);

			setTasks(updatedTasks);
		}
	};

	const contextValue = {
		tabs,
		setTabs,
		tasks,
		setTasks,
		activeTab,
		setActiveTab,
		changeActiveTab,
		updateTasks,
		addNewTask,
	};

	return (
		<TabContext.Provider value={contextValue}>
			<div className={styles.container}>
				<Tabs />

				{/* <div>
					<progress
						className={styles["progress"]}
						value="30"
						max="100"
					></progress>
				</div> */}

				{!!tasks?.length && (
					<Tasks
						tasks={tasks}
						subarrayIndexes={[]}
					/>
				)}

				<button
					className={styles["new-task-button"]}
					onClick={() => addNewTask()}
				>
					<PlusIcon />
				</button>
			</div>
		</TabContext.Provider>
	);
}

export default App;
