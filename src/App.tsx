import { useState } from "react";
import styles from "./App.module.css";
import Tab from "./components/Tab/Tab";
import { tabs } from "./consts";
import { ITask } from "./types";

function App() {
	const [selectedTab, setSelectedTab] = useState("");
	const tasks = tabs.find((tab) => tab.name === selectedTab)?.tasks;

	const recursiveMap = (task: ITask) => {
		if (task.subTasks.length) {
			return (
				<li key={task.id}>
					{task.isCompleted ? <del>{task.value}</del> : task.value}

					<ul>{task.subTasks.map((subTask) => recursiveMap(subTask))}</ul>
				</li>
			);
		} else {
			return <li key={task.id}>{task.isCompleted ? <del>{task.value}</del> : task.value}</li>;
		}
	};

	return (
		<div className={styles["container"]}>
			<ul className={styles["tabs"]}>
				{tabs.map((tab) => (
					<Tab
						name={tab.name}
						isSelected={selectedTab === tab.name}
						setSelectedTab={setSelectedTab}
						key={tab.name}
					/>
				))}
			</ul>

			<ul>{tasks && tasks.map((task) => recursiveMap(task))}</ul>
		</div>
	);
}

export default App;
