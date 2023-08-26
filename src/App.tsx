import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { TabContext } from "./hooks/useContext";
import { LocalStorage } from "./utils/LocalStorage";
import Tabs from "./components/Tabs/Tabs";
import Tasks from "./components/Tasks/Tasks";
import { ReactComponent as PlusIcon } from "./assets/plus.svg";
import { DatabaseManager } from "./utils/DatabaseManager";
import { STORAGE_NAME, mockValues } from "./consts";

LocalStorage.set(mockValues);
const tabsFromLocalStorage = LocalStorage.get().tabs;
const taskListsFromLocalStorage = LocalStorage.get().taskLists;

function App() {
	const [tabs, setTabs] = useState(tabsFromLocalStorage);
	const [activeTab, setActiveTab] = useState(tabs.length ? tabs[0] : null);
	const taskList = taskListsFromLocalStorage.find((list) => list.id === activeTab?.taskListId);
	const [tasks, setTasks] = useState(taskList?.tasks);

	const contextValue = {
		tabs,
		setTabs,
		activeTab,
		setActiveTab,
	};

	const addNewTask = () => {
		if (activeTab) {
			const updatedTasks = DatabaseManager.addTask(activeTab.taskListId);

			setTasks(updatedTasks);
		}
	};

	useEffect(() => {
		if (activeTab) {
			const taskLists = LocalStorage.get().taskLists;
			const taskList = taskLists.find((list) => list.id === activeTab.taskListId);

			setTasks(taskList?.tasks);
		}
	}, [activeTab]);

	return (
		<TabContext.Provider value={contextValue}>
			<div className={styles.container}>
				<Tabs />

				{tasks && (
					<Tasks
						tasks={tasks}
						subarrayIndexes={[]}
					/>
				)}

				<button
					className={styles["new-task-button"]}
					onClick={addNewTask}
				>
					<PlusIcon />
				</button>
			</div>
		</TabContext.Provider>
	);
}

export default App;
