import { useContext } from "react";
import { IContext, ITask } from "../../types";
import Task from "./Task/Task";
import styles from "./Tasks.module.css";
import { TabContext } from "../../hooks/useContext";

type Props = {
	tasks: ITask[];
};

function Tasks({ tasks }: Props) {
	const { activeTab } = useContext(TabContext) as IContext;

	if (!activeTab) return null;

	return (
		<ol className={styles["list"]}>
			{tasks.map((task) => (
				<Task
					task={task}
					activeTab={activeTab}
					key={task.id}
				/>
			))}
		</ol>
	);
}

export default Tasks;
