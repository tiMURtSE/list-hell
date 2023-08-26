import { useState } from "react";
import { TaskItem } from "../../types";
import Task from "./Task/Task";
import styles from "./Tasks.module.css";

type Props = {
	tasks: TaskItem[];
	subarrayIndexes: number[];
};

function Tasks({ tasks, subarrayIndexes }: Props) {
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
