import { ITask } from "../../types";
import Task from "./Task/Task";
import styles from "./Tasks.module.css";

type Props = {
	tasks: ITask[];
};

function Tasks({ tasks }: Props) {
	return (
		<ol className={styles["list"]}>
			{tasks.map((task) => (
				<Task
					task={task}
					key={task.id}
				/>
			))}
		</ol>
	);
}

export default Tasks;
