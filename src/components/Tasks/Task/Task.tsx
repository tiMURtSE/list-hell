import {
	useEffect,
	useContext,
	useState,
	useRef,
	FormEvent,
	MouseEvent,
	KeyboardEvent,
} from "react";
import { IContext, ITab, ITask } from "../../../types";
import Tasks from "../Tasks";
import { LocalStorage } from "../../../utils/LocalStorage";
import { RecursiveArrayTraversal } from "../../../utils/RecursiveArrayTraversal";
import { TabContext } from "../../../hooks/useContext";
import classNames from "classnames";
import styles from "./Task.module.css";
import TextField from "../../UI/TextField/TextField";

type Props = {
	task: ITask;
	activeTab: ITab;
};

function Task({ task, activeTab }: Props) {
	const { setTabs, setActiveTab } = useContext(TabContext) as IContext;
	const taskRef = useRef<HTMLDivElement>(null);

	const submitNewTaskValue = (event: FormEvent | KeyboardEvent) => {
		event.preventDefault();
		const taskElement = taskRef.current;
		const value = taskElement?.textContent;
		const tasks = activeTab.tasks;

		if (value) {
			const updatedTask = { ...task, value, isValueChanging: false } as ITask;
			const updatedTasks = RecursiveArrayTraversal.setNewTaskValue(tasks, updatedTask);
			const updatedTabs = LocalStorage.setTab({ ...activeTab, tasks: updatedTasks });

			taskElement.blur();
			setActiveTab({ ...activeTab, tasks: updatedTasks });
			setTabs(updatedTabs);
		} else {
			const isConfirmed = confirm("Задача без названия будет удалена. Удалить задачу?");

			if (isConfirmed) {
				deleteTask();
			} else {
				if (taskElement) {
					setTimeout(() => {
						taskElement.focus();
					}, 0);
				}
			}
		}
	};

	const deleteTask = () => {
		const tasks = activeTab.tasks;
		const updatedTasks = RecursiveArrayTraversal.deleteTask(tasks, task);
		const updatedTabs = LocalStorage.setTab({ ...activeTab, tasks: updatedTasks });

		setActiveTab({ ...activeTab, tasks: updatedTasks });
		setTabs(updatedTabs);
	};

	const completeTask = (event: MouseEvent) => {
		event.stopPropagation();
		event.preventDefault();
		const target = event.target as HTMLElement;
		const tasks = activeTab?.tasks;

		if (tasks) {
			const updatedTask = { ...task, isCompleted: !task.isCompleted } as ITask;
			const updatedTasks = RecursiveArrayTraversal.setNewTaskValue(tasks, updatedTask);
			const updatedTabs = LocalStorage.setTab({ ...activeTab, tasks: updatedTasks });

			setActiveTab({ ...activeTab, tasks: updatedTasks });
			setTabs(updatedTabs);
			target.blur();
		}
	};

	const updateNesting = (event: any) => {
		const code = event.code;
		const tasks = activeTab?.tasks;

		if (code === "Tab" && !event.shiftKey && tasks) {
			event.preventDefault();
			const updatedTasks = RecursiveArrayTraversal.updateNesting(tasks, task);
			const updatedTabs = LocalStorage.setTab({ ...activeTab, tasks: updatedTasks });

			setActiveTab({ ...activeTab, tasks: updatedTasks });
			setTabs(updatedTabs);
		} else if (code === "Tab" && event.shiftKey && tasks) {
			event.preventDefault();
			// const updatedTasks = RecursiveArrayTraversal.reverseUpdateNesting(tasks, task);
			// const updatedTabs = LocalStorage.setTab({ ...activeTab, tasks: updatedTasks });
			// console.log(updatedTasks);
			// // setActiveTab({ ...activeTab, tasks: updatedTasks });
			// // setTabs(updatedTabs);
			// // setIsValueChanging(!isValueChanging);
		} else if (code === "Enter") {
			event.preventDefault();
		} else {
			return;
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		const code = event.code;
		const isShiftPressed = event.shiftKey;

		if (code === "Enter") {
			submitNewTaskValue(event);
		} else if (code === "Tab") {
			if (isShiftPressed) {
			} else {
			}
		}
	};

	return (
		<li className={styles.task}>
			{
				<div
					id={`my-button-${task.id}`}
					className={classNames({ [styles.striked]: task.isCompleted })}
					tabIndex={1}
					autoFocus
					onKeyDown={handleKeyDown}
					onBlur={submitNewTaskValue}
					ref={taskRef}
					contentEditable
					suppressContentEditableWarning
				>
					{task.value}
				</div>
			}

			{Boolean(task.subTasks) && <Tasks tasks={task.subTasks} />}
		</li>
	);
}

export default Task;
