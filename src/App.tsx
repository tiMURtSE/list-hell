import { useState } from "react";
import styles from "./App.module.css";
import { TabContext } from "./hooks/useContext";
import { LocalStorage } from "./utils/LocalStorage";
import TabList from "./components/TabList/TabList";
import Tasks from "./components/Tasks/Tasks";

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

	return (
		<TabContext.Provider value={contextValue}>
			<div className={styles.container}>
				<TabList />

				<Tasks tab={activeTab} />
			</div>
		</TabContext.Provider>
	);
}

export default App;
