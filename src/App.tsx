import { useState } from "react";
import styles from "./App.module.css";
import { TabContext } from "./hooks/useContext";
import { LocalStorage } from "./utils/LocalStorage";
import TabList from "./components/TabList/TabList";
import Tasks from "./components/Tasks/Tasks";
import { ITask } from "./types";

const tabsFromLocalStorage = LocalStorage.getTabs();

function App() {
	const [tabs, setTabs] = useState(tabsFromLocalStorage);
	const [activeTab, setActiveTab] = useState(tabs[0]);
	const [isChanging, setIsChanging] = useState(false);
	const contextValue = {
		tabs,
		setTabs,
		activeTab,
		setActiveTab,
		isChanging,
		setIsChanging,
	};

	const handleBackgroundClick = () => {
		const newTask = {
			id: crypto.randomUUID(),
			value: "",
			subTasks: [],
			isCompleted: false,
			isValueChanging: true,
		} as ITask;
		const updatedTasks = [...activeTab.tasks, newTask];

		if (isChanging) return;

		setActiveTab({ ...activeTab, tasks: updatedTasks });
	};

	return (
		<TabContext.Provider value={contextValue}>
			<div className={styles.container}>
				<TabList />

				<Tasks
					parentId={activeTab.id}
					tasks={activeTab.tasks}
				/>

				<div
					className={styles["background"]}
					onClick={handleBackgroundClick}
				></div>
			</div>
		</TabContext.Provider>
	);
}

export default App;
