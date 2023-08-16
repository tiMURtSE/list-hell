import { createContext, useContext, useState } from "react";
import { tabsFromConsts } from "./consts";
import { recursiveMap } from "./utils/recursiveMap";
import TabList from "./components/TabList/TabList";
import styles from "./App.module.css";
import { LocalStorage } from "./utils/LocalStorage";

const tabsFromLocalStorage = LocalStorage.getTabs();
export const MyContext = createContext<any>(tabsFromLocalStorage);

function App() {
	const [tabs, setTabs] = useState(tabsFromLocalStorage);

	const [selectedTab, setSelectedTab] = useState(tabs ? tabs[0].title : "");
	const currentOpenedTab = tabs ? tabs.find((tab) => tab.title === selectedTab) : null;

	return (
		<MyContext.Provider value={{ tabs, setTabs }}>
			<div className={styles["container"]}>
				<TabList
					tabs={tabs}
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
