import { useContext, useEffect, useRef, KeyboardEvent, MouseEvent } from "react";
import { IContext, TaskItem } from "../../../types";
import Tasks from "../Tasks";
import classNames from "classnames";
import styles from "./Task.module.css";
import { TabContext } from "../../../hooks/useContext";
import { RecursiveArrayTraversal } from "../../../utils/RecursiveArrayTraversal";
import { Keys } from "../../../consts";
import { isCaretAtEnd } from "../../../utils/isCaretAtEnd";
import { focusLastItem } from "../../../utils/focusLastItem";

type Props = {
	task: TaskItem;
	subarrayIndexes: number[];
};

function Task({ task, subarrayIndexes }: Props) {
	const { tasks, updateTasks, addNewTask } = useContext(TabContext) as IContext;
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
				removeTask();
			} else {
				setTimeout(() => textFieldElem?.focus(), 0);
			}
		}
	};

	const removeTask = () => {
		const updatedTasks = RecursiveArrayTraversal.removeTask(tasks!, task);

		updateTasks(updatedTasks);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		const code = event.code;
		const isShiftPressed = event.shiftKey;

		if (code === Keys.ENTER) {
			event.preventDefault();
			const textFieldElem = textField.current;

			if (textFieldElem && isCaretAtEnd(textFieldElem)) {
				return addNewTask();
			}

			return textFieldElem?.blur();
		}

		if (code === Keys.TAB) {
			event.preventDefault();

			if (isShiftPressed) {
				const updatedTasks = RecursiveArrayTraversal.reverseUpdateNesting(tasks!, task);

				return updateTasks(updatedTasks);
			} else {
				const updatedTasks = RecursiveArrayTraversal.updateNesting(tasks!, task);

				return updateTasks(updatedTasks);
			}
		}

		if (code === Keys.BACKSPACE) {
			const value = textField.current?.textContent;

			if (!value) {
				const taskId = `my-button-${task.id}`;

				removeTask();
				return focusLastItem(taskId, styles.task);
			}
		}
		if (code === Keys.ARROW_UP) {
		}

		if (code === Keys.ARROW_DOWN) {
		}
	};

	const completeTask = (event: MouseEvent) => {
		event.preventDefault();
		const target = event.target as HTMLElement;

		const updatedTask = { ...task, isCompleted: !task.isCompleted } as TaskItem;
		const updatedTasks = RecursiveArrayTraversal.completeTask(tasks!, updatedTask);

		target.blur();
		updateTasks(updatedTasks);
	};

	const preventFocus = (event: MouseEvent) => {
		const button = event.button;

		if (button === 2) event.preventDefault();
	};

	useEffect(() => {
		if (task) textField.current?.focus();
	}, []);

	return (
		<li className={styles["li"]}>
			<div
				id={`my-button-${task.id}`}
				className={classNames(styles.task, { [styles.striked]: task.isCompleted })}
				ref={textField}
				onBlur={submitNewValue}
				onKeyDown={handleKeyDown}
				onContextMenu={completeTask}
				onMouseDown={preventFocus}
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
