import { useContext, useState } from "react";
import { IContext, TaskItem } from "../../types";
import Task from "./Task/Task";
import styles from "./Tasks.module.css";
import { TabContext } from "../../hooks/useContext";

type Props = {
	subarrayIndexes: number[];
	tasks: TaskItem[];
};

function Tasks({ subarrayIndexes, tasks }: Props) {
	const { activeTab } = useContext(TabContext) as IContext;
	const [localTasks, setLocalTasks] = useState(tasks);

	return (
		<ol className={styles["list"]}>
			{tasks.map((task, index) => (
				<Task
					task={task}
					localTasks={localTasks}
					setLocalTasks={setLocalTasks}
					subarrayIndexes={new Array(...subarrayIndexes, index)}
					key={task.id}
				/>
			))}
		</ol>
	);
}

export default Tasks;
