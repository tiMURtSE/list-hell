import { useState } from "react";
import styles from "./App.module.css";
import { TabContext } from "./hooks/useContext";
import { LocalStorage } from "./utils/LocalStorage";
import Tabs from "./components/Tabs/Tabs";
import Tasks from "./components/Tasks/Tasks";

const tabsFromLocalStorage = LocalStorage.get().tabs;
const taskListsFromLocalStorage = LocalStorage.get().taskLists;

function App() {
	const [tabs, setTabs] = useState(tabsFromLocalStorage);
	const [activeTab, setActiveTab] = useState(tabs.length ? tabs[0] : null);
	const taskList = taskListsFromLocalStorage.filter((list) => list.id === activeTab?.taskListId);
	const contextValue = {
		tabs,
		setTabs,
		activeTab,
		setActiveTab,
	};

	return (
		<TabContext.Provider value={contextValue}>
			<div className={styles.container}>
				<Tabs />

				{taskList && (
					<Tasks
						subarrayIndexes={[]}
						tasks={taskList}
					/>
				)}
			</div>
		</TabContext.Provider>
	);
}

export default App;
