import { ITab } from "../../types";
import Task from "./Task/Task";
import styles from "./Tasks.module.css";

type Props = {
	tab: ITab | null;
};

function Tasks({ tab }: Props) {
	const tasks = tab ? tab.tasks : null;

	if (!tasks) return null;

	return (
		<div className={styles["wrapper"]}>
			<ol className={styles["list"]}>
				{tasks.map((task) => (
					<Task
						task={task}
						key={task.id}
					/>
				))}
			</ol>
		</div>
	);
}

export default Tasks;
