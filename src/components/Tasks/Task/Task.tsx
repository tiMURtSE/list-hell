import { useEffect, useContext, useState, useRef, FormEvent, MouseEvent } from "react";
import { IContext, ITask } from "../../../types";
import Tasks from "../Tasks";
import { LocalStorage } from "../../../utils/LocalStorage";
import { RecursiveArrayTraversal } from "../../../utils/RecursiveArrayTraversal";
import { TabContext } from "../../../hooks/useContext";
import classNames from "classnames";
import styles from "./Task.module.css";
import TextField from "../../UI/TextField/TextField";

type Props = {
	task: ITask;
};

function Task({ task }: Props) {
	const { setTabs, activeTab, setActiveTab } = useContext(TabContext) as IContext;
	const [isValueChanging, setIsValueChanging] = useState(task.isValueChanging);
	const inputRef = useRef<HTMLInputElement>(null);

	const submitNewTaskValue = (event: FormEvent) => {
		event.preventDefault();
		const value = inputRef.current?.value;
		const tasks = activeTab?.tasks;

		if (value && tasks) {
			const updatedTask = { ...task, value, isValueChanging: false } as ITask;
			const updatedTasks = RecursiveArrayTraversal.setNewTaskValue(tasks, updatedTask);
			const updatedTabs = LocalStorage.setTab({ ...activeTab, tasks: updatedTasks });

			setActiveTab({ ...activeTab, tasks: updatedTasks });
			setTabs(updatedTabs);
			setIsValueChanging(!isValueChanging);
		} else {
			const isConfirmed = confirm("Задача без названия будет удалена. Удалить задачу?");

			if (isConfirmed) deleteTask();
		}
	};

	const deleteTask = () => {
		const tasks = activeTab?.tasks;

		if (tasks) {
			const updatedTasks = RecursiveArrayTraversal.deleteTask(tasks, task);
			const updatedTabs = LocalStorage.setTab({ ...activeTab, tasks: updatedTasks });

			setActiveTab({ ...activeTab, tasks: updatedTasks });
			setTabs(updatedTabs);
			setIsValueChanging(!isValueChanging);
		} else {
		}
	};

	const changeTaskValue = (event: MouseEvent) => {
		event.stopPropagation();
		setIsValueChanging(!isValueChanging);
	};

	const completeTask = (event: MouseEvent) => {
		event.stopPropagation();
		event.preventDefault();
		const tasks = activeTab?.tasks;

		if (tasks) {
			const updatedTask = { ...task, isCompleted: !task.isCompleted } as ITask;
			const updatedTasks = RecursiveArrayTraversal.setNewTaskValue(tasks, updatedTask);
			const updatedTabs = LocalStorage.setTab({ ...activeTab, tasks: updatedTasks });

			setActiveTab({ ...activeTab, tasks: updatedTasks });
			setTabs(updatedTabs);
		}
	};

	useEffect(() => {
		const updateNesting = (event: any) => {
			const code = event.code;
			const tasks = activeTab?.tasks;

			if (code === "Tab" && !event.shiftKey && tasks) {
				event.preventDefault();
				const updatedTasks = RecursiveArrayTraversal.updateNesting(tasks, task);
				const updatedTabs = LocalStorage.setTab({ ...activeTab, tasks: updatedTasks });

				setActiveTab({ ...activeTab, tasks: updatedTasks });
				setTabs(updatedTabs);
				setIsValueChanging(!isValueChanging);
			} else if (code === "Tab" && event.shiftKey && tasks) {
				event.preventDefault();
				// const updatedTasks = RecursiveArrayTraversal.reverseUpdateNesting(tasks, task);
				// const updatedTabs = LocalStorage.setTab({ ...activeTab, tasks: updatedTasks });
				// console.log(updatedTasks);
				// // setActiveTab({ ...activeTab, tasks: updatedTasks });
				// // setTabs(updatedTabs);
				// // setIsValueChanging(!isValueChanging);
			} else {
				return;
			}
		};

		if (isValueChanging) document.addEventListener("keydown", updateNesting);

		return () => document.removeEventListener("keydown", updateNesting);
	}, [isValueChanging]);

	return (
		<li
			onClick={changeTaskValue}
			onContextMenu={completeTask}
		>
			{isValueChanging ? (
				<TextField
					defaultValue={task.value}
					ref={inputRef}
					handleSubmit={submitNewTaskValue}
				/>
			) : (
				<span className={classNames({ [styles.striked]: task.isCompleted })}>
					{task.value}
				</span>
			)}

			{Boolean(task.subTasks) && <Tasks tasks={task.subTasks} />}
		</li>
	);
}

export default Task;
