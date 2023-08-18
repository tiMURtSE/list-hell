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

	const [selectedTab, setSelectedTab] = useState(tabs.length ? tabs[0].title : "");
	const currentOpenedTab = tabs ? tabs.find((tab) => tab.title === selectedTab) : null;

	return (
		<MyContext.Provider value={{ tabs, setTabs }}>
			<div className={styles["container"]}>
				<TabList
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
				/>

				<ul>
					{currentOpenedTab?.tasks.length ? (
						currentOpenedTab.tasks.map((task) => recursiveMap(task))
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
