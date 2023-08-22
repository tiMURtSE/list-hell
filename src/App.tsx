import { useState } from "react";
import styles from "./App.module.css";
import { TabContext } from "./hooks/useContext";
import { LocalStorage } from "./utils/LocalStorage";
import TabList from "./components/TabList/TabList";
import { recursiveMap } from "./utils/recursiveMap";
import Tasks from "./components/Tasks/Tasks";

const tabsFromLocalStorage = LocalStorage.getTabs();

function App() {
	const [tabs, setTabs] = useState(tabsFromLocalStorage);
	const [activeTab, setActiveTab] = useState(tabs[0]);
	const contextValue = {
		tabs,
		setTabs,
		activeTab,
		setActiveTab,
	};

	return (
		<TabContext.Provider value={contextValue}>
			<div className={styles.container}>
				<TabList />

				<Tasks
					parentId={activeTab.id}
					tasks={activeTab.tasks}
				/>
			</div>
		</TabContext.Provider>
	);
}

export default App;
