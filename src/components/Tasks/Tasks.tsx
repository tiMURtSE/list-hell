import { useRef, useContext, useState, FormEvent } from "react";
import { IContext, ITab, ITask } from "../../types";
import Task from "./Task/Task";
import styles from "./Tasks.module.css";
import classNames from "classnames";
import { TabContext } from "../../hooks/useContext";
import { LocalStorage } from "../../utils/LocalStorage";

type Props = {
	parentId: string;
	tasks: ITask[];
};

function Tasks({ parentId, tasks }: Props) {
	const { setTabs, activeTab, setActiveTab } = useContext(TabContext) as IContext;
	const [isNewTaskCreaing, setIsNewTaskCreaing] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const addNewTask = (event: FormEvent) => {
		event.preventDefault();
		const input = inputRef.current;
		const taskNewValue = input?.value.trim();

		if (taskNewValue) {
			const newTask = {
				id: crypto.randomUUID(),
				value: taskNewValue,
				subTasks: [],
				isCompleted: false,
				isValueChanging: false,
			} as ITask;

			const func = (tasks: ITask[]) => {
				const updatedTasks = JSON.parse(JSON.stringify(tasks)) as ITask[];

				for (const task of updatedTasks) {
					if (activeTab.id === parentId) {
						updatedTasks.push(newTask);
						break;
					}

					if (task.id === parentId) {
						task.subTasks.push(newTask);
						break;
					}

					if (task.subTasks.length) {
						task.subTasks = func(task.subTasks);
					}
				}

				return updatedTasks;
			};

			const updatedTasks = JSON.parse(JSON.stringify(func(activeTab.tasks)));
			const updatedTabs = LocalStorage.setTab({
				...activeTab,
				tasks: updatedTasks,
			}) as ITab[];

			setActiveTab(updatedTabs.filter((tab) => tab.id === activeTab.id)[0]);
			setTabs(updatedTabs);
		}

		if (input) input.value = "";
	};

	return (
		<ol className={styles["list"]}>
			{tasks.map((task) => (
				<Task
					task={task}
					key={task.id}
				/>
			))}

			<div className={styles["wrapper"]}>
				<form onSubmit={addNewTask}>
					<input
						className={styles["input"]}
						type="text"
						ref={inputRef}
						onBlur={addNewTask}
					/>
				</form>
			</div>
		</ol>
	);
}

export default Tasks;
