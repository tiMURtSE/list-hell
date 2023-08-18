import { createContext, useEffect, useState } from "react";
import { recursiveMap } from "./utils/recursiveMap";
import TabList from "./components/TabList/TabList";
import styles from "./App.module.css";
import { LocalStorage } from "./utils/LocalStorage";
import { tabsFromConsts } from "./consts";
import { ContextProps, ITab } from "./types";

// const tabsFromLocalStorage = LocalStorage.getTabs();
export const MyContext = createContext<ContextProps | null>(null);

function App() {
	const [tabs, setTabs] = useState(tabsFromConsts);
	const [selectedTab, setSelectedTab] = useState(tabs[0]);

	return (
		<MyContext.Provider value={{ tabs, setTabs, selectedTab, setSelectedTab }}>
			<div className={styles["container"]}>
				<TabList />

				<ul>
					{selectedTab ? (
						selectedTab.tasks.map((task) => recursiveMap(task))
					) : (
						<>
							<div>Список пуст</div>
							<input type="text" />
						</>
					)}
				</ul>
			</div>
		</MyContext.Provider>
	);
}

export default App;
