import { useState } from "react";
import styles from "./App.module.css";
import { TabContext } from "./hooks/useContext";
import { LocalStorage } from "./utils/LocalStorage";
import Tabs from "./components/Tabs/Tabs";
import Tasks from "./components/Tasks/Tasks";
import { ReactComponent as PlusIcon } from "./assets/plus.svg";
import { createNewTask } from "./utils/createNewTask";
import { DatabaseManager } from "./utils/DatabaseManager";

const tabsFromLocalStorage = LocalStorage.get().tabs;
const taskListsFromLocalStorage = LocalStorage.get().taskLists;

function App() {
	const [tabs, setTabs] = useState(tabsFromLocalStorage);
	const [activeTab, setActiveTab] = useState(tabs.length ? tabs[0] : null);
	const taskList = taskListsFromLocalStorage.find((list) => list.id === activeTab?.taskListId);
	const contextValue = {
		tabs,
		setTabs,
		activeTab,
		setActiveTab,
	};

	// const addNewTask = () => {
	// 	if (activeTab) {
	// 		const newTask = createNewTask();
	// 		const updatedTasks = DatabaseManager.addTask(newTask, activeTab.taskListId);
	// 		const updatedTabs = DatabaseManager.changeTabValue({
	// 			...activeTab,
	// 			taskListId: newTask.id,
	// 		});

	// 		setActiveTab({ ...activeTab, taskListId: newTask.id });
	// 		setTabs(updatedTabs);
	// 	}
	// };

	return (
		<TabContext.Provider value={contextValue}>
			<div className={styles.container}>
				<Tabs />

				{/* {taskList && (
					<Tasks
						subarrayIndexes={[]}
						tasks={taskList.taskList}
					/>
				)} */}

				{/* <button
					className={styles["new-task-button"]}
					onClick={addNewTask}
				>
					<PlusIcon />
				</button> */}
			</div>
		</TabContext.Provider>
	);
}

export default App;
