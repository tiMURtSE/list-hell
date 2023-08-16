import { useState } from "react";
import { tabs } from "./consts";
import { recursiveMap } from "./utils/recursiveMap";
import TabList from "./components/TabList/TabList";
import styles from "./App.module.css";

function App() {
	const [selectedTab, setSelectedTab] = useState(tabs[0].title);
	const tab = tabs.find((tab) => tab.title === selectedTab);

	return (
		<div className={styles["container"]}>
			<TabList
				tabs={tabs}
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
			/>

			<ul>
				{tab?.tasks.length ? (
					tab.tasks.map((task) => recursiveMap(task))
				) : (
					<>
						<div>Список пуст</div>
						<input type="text" />
					</>
				)}
			</ul>
		</div>
	);
}

export default App;
