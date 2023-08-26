import { useEffect, useRef } from "react";
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
	const textField = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (task.isValueChanging) textField.current?.focus();
	}, [task.isValueChanging]);

	return (
		<li className={styles.task}>
			<div
				id={`my-button-${task.id}`}
				className={classNames({ [styles.striked]: task.isCompleted })}
				ref={textField}
				onFocus={() => console.log("gets focus")}
				contentEditable
				suppressContentEditableWarning
			>
				{task.value}
			</div>

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
