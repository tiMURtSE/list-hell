import { useContext, useEffect, useRef } from "react";
import { IContext, TaskItem } from "../../../types";
import Tasks from "../Tasks";
import classNames from "classnames";
import styles from "./Task.module.css";
import { TabContext } from "../../../hooks/useContext";
import { RecursiveArrayTraversal } from "../../../utils/RecursiveArrayTraversal";
import { LocalStorage } from "../../../utils/LocalStorage";
import { DatabaseManager } from "../../../utils/DatabaseManager";

type Props = {
	task: TaskItem;
	subarrayIndexes: number[];
};

function Task({ task, subarrayIndexes }: Props) {
	const { tasks, setTasks, updateTasks } = useContext(TabContext) as IContext;
	const textField = useRef<HTMLDivElement>(null);

	const handleSubmitNewValue = () => {
		const value = textField.current?.textContent;

		if (value && tasks) {
			const updatedTask = { ...task, value } as TaskItem;
			const updatedTasks = RecursiveArrayTraversal.setNewTaskValue(tasks, updatedTask);

			updateTasks(updatedTasks);
		} else {
			return alert("Не указано наименование задачи!");
		}
	};

	useEffect(() => {
		if (task.isValueChanging) textField.current?.focus();
	}, [task.isValueChanging]);

	return (
		<li className={styles.task}>
			<div
				id={`my-button-${task.id}`}
				className={classNames({ [styles.striked]: task.isCompleted })}
				ref={textField}
				onBlur={handleSubmitNewValue}
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
