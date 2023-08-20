import { ITask } from "../../types";
import styles from "./Tasks.module.css";
import classNames from "classnames";

type Props = {
	tasks: ITask[];
};

function Tasks({ tasks }: Props) {
	return (
		!!tasks.length && (
			<ol>
				{tasks.map((task) => {
					return (
						<li
							className={classNames({ [styles.striked]: task.isCompleted })}
							key={task.value}
						>
							{task.value}

							{!!task.subTasks.length && <Tasks tasks={task.subTasks} />}
						</li>
					);
				})}
			</ol>
		)
	);
}

export default Tasks;
