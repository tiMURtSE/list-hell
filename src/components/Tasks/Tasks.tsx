import { TaskItem } from "../../types";
import Task from "./Task/Task";
import styles from "./Tasks.module.css";

type Props = {
	tasks: TaskItem[];
	subarrayIndexes: number[];
};

function Tasks({ tasks, subarrayIndexes }: Props) {
	const getIndexes = (index: number) => [...subarrayIndexes, index];

	return (
		<ol className={styles["list"]}>
			{tasks.map((task, index) => (
				<Task
					task={task}
					subarrayIndexes={getIndexes(index)}
					key={task.id}
				/>
			))}
		</ol>
	);
}

export default Tasks;
