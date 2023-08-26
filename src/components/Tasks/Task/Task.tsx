import { TaskItem } from "../../../types";
import Tasks from "../Tasks";
import classNames from "classnames";
import styles from "./Task.module.css";

type Props = {
	task: TaskItem;
	localTasks: TaskItem[];
	setLocalTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
	subarrayIndexes: number[];
};

function Task({ task, localTasks, setLocalTasks, subarrayIndexes }: Props) {
	return (
		<li className={styles.task}>
			{
				<div
					id={`my-button-${task.id}`}
					className={classNames({ [styles.striked]: task.isCompleted })}
					tabIndex={1}
					autoFocus
					contentEditable
					suppressContentEditableWarning
				>
					{task.value}
				</div>
			}

			{Boolean(task.subTasks) && (
				<Tasks
					subarrayIndexes={subarrayIndexes}
					tasks={task.subTasks}
				/>
			)}
		</li>
	);
}

export default Task;
