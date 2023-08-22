import { useContext, useState, useRef, FormEvent } from "react";
import { IContext, ITask } from "../../../types";
import Tasks from "../Tasks";
import { LocalStorage } from "../../../utils/LocalStorage";
import { RecursiveArrayTraversal } from "../../../utils/RecursiveArrayTraversal";
import { TabContext } from "../../../hooks/useContext";

type Props = {
	task: ITask;
};

function Task({ task }: Props) {
	const { setTabs, activeTab, setActiveTab } = useContext(TabContext) as IContext;
	const [isValueChanging, setIsValueChanging] = useState(task.isValueChanging);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmitNewTaskValue = (event: FormEvent) => {
		event.preventDefault();
		const value = inputRef.current?.value;

		if (value && activeTab) {
			const tasks = activeTab.tasks;
			const updatedTask = { ...task, value, isValueChanging: false } as ITask;
			const updatedTasks = RecursiveArrayTraversal.setNewTaskValue(tasks, updatedTask);
			const updatedTabs = LocalStorage.setTab({ ...activeTab, tasks: updatedTasks });

			setActiveTab({ ...activeTab, tasks: updatedTasks });
			setTabs(updatedTabs);
			setIsValueChanging(!isValueChanging);
		} else {
			const isConfirmed = confirm("Темы без навзания будет удалена. Удалить тему?");

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

	const changeTaskValue = () => {
		setIsValueChanging(!isValueChanging);
	};

	return (
		<li onClick={changeTaskValue}>
			{isValueChanging ? (
				<form onSubmit={handleSubmitNewTaskValue}>
					<input
						type="text"
						defaultValue={task.value}
						ref={inputRef}
						onBlur={handleSubmitNewTaskValue}
						autoFocus
					/>
				</form>
			) : (
				<span>{task.value}</span>
			)}

			{Boolean(task.subTasks) && <Tasks tasks={task.subTasks} />}
		</li>
	);
}

export default Task;
