import { useState } from "react";
import styles from "./App.module.css";
import { TabContext } from "./hooks/useContext";
import { LocalStorage } from "./utils/LocalStorage";
import TabList from "./components/TabList/TabList";
import Tasks from "./components/Tasks/Tasks";
import { ReactComponent as PlusIcon } from "./assets/plus.svg";
import { createNewTask } from "./utils/createNewTask";

const tabsFromLocalStorage = LocalStorage.getTabs();

function App() {
	const [tabs, setTabs] = useState(tabsFromLocalStorage);
	const [activeTab, setActiveTab] = useState(tabs.length ? tabs[0] : null);
	const contextValue = {
		tabs,
		setTabs,
		activeTab,
		setActiveTab,
	};

	const addNewTask = () => {
		const newTask = createNewTask();
		const tasks = activeTab?.tasks;

		if (tasks) {
			const updatedTasks = [...tasks, newTask];
			const updatedTabs = LocalStorage.setTab({ ...activeTab, tasks: updatedTasks });

			setActiveTab({ ...activeTab, tasks: updatedTasks });
			setTabs(updatedTabs);
		}
	};

	return (
		<TabContext.Provider value={contextValue}>
			<div className={styles.container}>
				<TabList />

				{activeTab?.tasks && <Tasks tasks={activeTab.tasks} />}

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
