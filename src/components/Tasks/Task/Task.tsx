import { IContext, ITab, ITask } from "../../../types";
import classNames from "classnames";
import styles from "./Task.module.css";
import Tasks from "../Tasks";
import ContextMenu from "../../ContextMenu/ContextMenu";
import { useContext } from "react";
import { TabContext } from "../../../hooks/useContext";
import { LocalStorage } from "../../../utils/LocalStorage";

type Props = { task: ITask };

function Task({ task }: Props) {
	// console.log({ value: task.value, isCompleted: task.isCompleted });
	const { tabs, setTabs, activeTab, setActiveTab } = useContext(TabContext) as IContext;
	const { id, value, subTasks, isCompleted } = task;
	const contextMenuId = `context-menu-${id}`;

	const showContextMenu = () => {
		const contextMenu = document.getElementById(contextMenuId) as HTMLDialogElement;

		if (contextMenu) {
			contextMenu.showModal();
		}
	};

	const completeItem = () => {
		const func = (tasks: ITask[]) => {
			const updatedTasks = JSON.parse(JSON.stringify(tasks)) as ITask[];
			const isEveryTaskCompleted = updatedTasks.every((task) => task.isCompleted === true);

			for (let task of updatedTasks) {
				if (task.subTasks.length) {
					const subTasks = task.subTasks;

					const { updatedTasks, shouldParentBeCompleted, shouldParentBeUncompleted } =
						func(subTasks);

					if (shouldParentBeCompleted) {
						task.isCompleted = true;
					}

					if (shouldParentBeUncompleted) {
						task.isCompleted = false;
					}

					task.subTasks = updatedTasks;
				}

				if (task.id === id) {
					const isCompletedValue = !task.isCompleted;
					task.isCompleted = isCompletedValue;

					const rec = (tasks: ITask[], isCompletedValue: boolean) => {
						for (const task of tasks) {
							task.isCompleted = isCompletedValue;

							if (task.subTasks) rec(task.subTasks, isCompletedValue);
						}
					};

					rec(task.subTasks, isCompletedValue);
				}
			}

			const isEveryTaskCompletedAfterLoop = updatedTasks.every(
				(task) => task.isCompleted === true
			);
			const shouldParentBeCompleted = !isEveryTaskCompleted && isEveryTaskCompletedAfterLoop;
			const shouldParentBeUncompleted =
				isEveryTaskCompleted && !isEveryTaskCompletedAfterLoop;

			return { updatedTasks, shouldParentBeCompleted, shouldParentBeUncompleted };
		};

		const { updatedTasks } = JSON.parse(JSON.stringify(func(activeTab.tasks)));
		const updatedTabs = LocalStorage.setTab({ ...activeTab, tasks: updatedTasks }) as ITab[];

		setActiveTab(updatedTabs.filter((tab) => tab.id === activeTab.id)[0]);
		setTabs(updatedTabs);
	};

	const changeTabTitle = () => {};

	const deleteTab = () => {};

	return (
		<li className={classNames(styles.task, { [styles.striked]: isCompleted })}>
			{value}

			{!!subTasks.length && <Tasks tasks={subTasks} />}
			<button
				type="button"
				className={styles["context-menu-button"]}
				onClick={showContextMenu}
			>
				:
			</button>

			<ContextMenu
				id={contextMenuId}
				changeItem={changeTabTitle}
				deleteItem={deleteTab}
				completeItem={completeItem}
			/>
		</li>
	);
}

export default Task;
