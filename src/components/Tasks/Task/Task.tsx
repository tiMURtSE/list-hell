import { useContext, useEffect, useRef, KeyboardEvent } from "react";
import { IContext, TaskItem } from "../../../types";
import Tasks from "../Tasks";
import classNames from "classnames";
import styles from "./Task.module.css";
import { TabContext } from "../../../hooks/useContext";
import { RecursiveArrayTraversal } from "../../../utils/RecursiveArrayTraversal";
import { Keys } from "../../../consts";

type Props = {
	task: TaskItem;
	subarrayIndexes: number[];
};

function Task({ task, subarrayIndexes }: Props) {
	const { tasks, setTasks, updateTasks } = useContext(TabContext) as IContext;
	const textField = useRef<HTMLDivElement>(null);

	const submitNewValue = () => {
		const textFieldElem = textField.current;
		const value = textFieldElem?.textContent;

		if (value === task.value) return;

		if (value) {
			const updatedTask = { ...task, value } as TaskItem;
			const updatedTasks = RecursiveArrayTraversal.setNewTaskValue(tasks!, updatedTask);

			updateTasks(updatedTasks);
		} else {
			const isConfirmed = confirm("Задача без названия будет удалена. Удалить задачу?");

			if (isConfirmed) {
				deleteTask();
			}

			// return alert("Не указано наименование задачи!");
		}
	};

	const deleteTask = () => {
		const updatedTasks = RecursiveArrayTraversal.deleteTask(tasks!, task);

		updateTasks(updatedTasks);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		const code = event.code;
		const isShiftPressed = event.shiftKey;

		if (code === Keys.ENTER) {
			const textFieldElem = textField.current;

			return textFieldElem?.blur();
		}

		if (code === Keys.TAB) {
			if (isShiftPressed) {
				return;
			} else {
				return;
			}
		}
	};

	useEffect(() => {
		if (!task.value) textField.current?.focus();
	}, []);

	return (
		<li className={styles.task}>
			<div
				id={`my-button-${task.id}`}
				className={classNames({ [styles.striked]: task.isCompleted })}
				ref={textField}
				onBlur={submitNewValue}
				onKeyDown={handleKeyDown}
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
