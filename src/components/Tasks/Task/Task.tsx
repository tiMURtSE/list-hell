import {
	useEffect,
	useContext,
	useState,
	useRef,
	FormEvent,
	MouseEvent,
	KeyboardEvent,
} from "react";
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
	const taskRef = useRef<HTMLSpanElement>(null);

	const submitNewTaskValue = (event: FormEvent | KeyboardEvent) => {
		event.preventDefault();
		const task = taskRef.current;

		if (task) {
			task.blur();
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
			} else if (code === "Enter") {
				event.preventDefault();
			} else {
				return;
			}
		};

		if (isValueChanging) document.addEventListener("keydown", updateNesting);

		return () => document.removeEventListener("keydown", updateNesting);
	}, [isValueChanging]);

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
		<li
			className={styles.task}
			onClick={changeTaskValue}
		>
			{
				<span
					className={classNames({ [styles.striked]: task.isCompleted })}
					onKeyDown={handleKeyDown}
					onBlur={submitNewTaskValue}
					ref={taskRef}
					contentEditable
					suppressContentEditableWarning
				>
					{task.value}
				</span>
			}

			{Boolean(task.subTasks) && <Tasks tasks={task.subTasks} />}
		</li>
	);
}

export default Task;
