import { IContext, ITab, ITask } from "../../../types";
import classNames from "classnames";
import styles from "./Task.module.css";
import Tasks from "../Tasks";
import ContextMenu from "../../ContextMenu/ContextMenu";
import { FormEvent, KeyboardEvent, useEffect, useContext, useRef } from "react";
import { TabContext } from "../../../hooks/useContext";
import { LocalStorage } from "../../../utils/LocalStorage";
import { findTaskPosition } from "../../../utils/traverseNestedArray";
import { RecursiveArrayTraversal } from "../../../utils/RecursiveArrayTraversal";

type Props = { task: ITask };

function Task({ task }: Props) {
	// console.log({ value: task.value, isCompleted: task.isCompleted });
	const { setTabs, activeTab, setActiveTab, setIsChanging } = useContext(TabContext) as IContext;
	const { id, value, subTasks, isCompleted } = task;
	const valueField = useRef<HTMLInputElement>(null);
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

	const changeTaskValue = () => {
		const func = (tasks: ITask[]) => {
			const updatedTasks = JSON.parse(JSON.stringify(tasks)) as ITask[];

			for (const task of updatedTasks) {
				if (task.id === id) {
					task.isValueChanging = true;
					break;
				}

				if (task.subTasks.length) {
					task.subTasks = func(task.subTasks);
				}
			}

			return updatedTasks;
		};

		const updatedTasks = JSON.parse(JSON.stringify(func(activeTab.tasks)));
		const updatedTabs = LocalStorage.setTab({ ...activeTab, tasks: updatedTasks }) as ITab[];

		setActiveTab(updatedTabs.filter((tab) => tab.id === activeTab.id)[0]);
		setIsChanging(true);
		setTabs(updatedTabs);
	};

	const deleteTab = () => {
		const func = (tasks: ITask[]) => {
			let updatedTasks = JSON.parse(JSON.stringify(tasks)) as ITask[];

			updatedTasks = updatedTasks.filter((task) => {
				if (task.subTasks.length) {
					task.subTasks = func(task.subTasks);
				}

				if (task.id !== id) return task;
			});

			return updatedTasks;
		};

		const updatedTasks = JSON.parse(JSON.stringify(func(activeTab.tasks)));
		const updatedTabs = LocalStorage.setTab({
			...activeTab,
			tasks: updatedTasks,
		}) as ITab[];

		setActiveTab(updatedTabs.filter((tab) => tab.id === activeTab.id)[0]);
		setTabs(updatedTabs);
	};

	const submitNewTaskValue = (event: FormEvent) => {
		event.preventDefault();

		const newValue = valueField.current?.value;

		if (newValue) {
			const func = (tasks: ITask[]) => {
				const updatedTasks = JSON.parse(JSON.stringify(tasks)) as ITask[];

				for (const task of updatedTasks) {
					if (task.id === id) {
						task.value = newValue;
						task.isValueChanging = false;
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
			setIsChanging(false);
			setTabs(updatedTabs);
		} else {
			deleteTab();
		}
	};

	useEffect(() => {
		const createNestedList = (event: any) => {
			const code = event.code;

			if (code === "Tab") {
				event.preventDefault();
				const taskPosition = findTaskPosition(activeTab.tasks, id);
				if (taskPosition !== 0) {
					const updatedTasks = RecursiveArrayTraversal.addToNestedList(
						activeTab.tasks,
						id
					);

					const updatedTabs = LocalStorage.setTab({
						...activeTab,
						tasks: updatedTasks,
					}) as ITab[];
					setActiveTab(updatedTabs.filter((tab) => tab.id === activeTab.id)[0]);
					setTabs(updatedTabs);
					// deleteTab();
				}
			}
		};

		if (task.isValueChanging) document.addEventListener("keydown", createNestedList);

		return () => document.removeEventListener("keydown", createNestedList);
	}, [task.isValueChanging]);

	return (
		<li className={classNames(styles.task, { [styles.striked]: isCompleted })}>
			{task.isValueChanging ? (
				<form onSubmit={submitNewTaskValue}>
					<input
						type="text"
						defaultValue={task.value}
						ref={valueField}
						onBlur={submitNewTaskValue}
						autoFocus
					/>
				</form>
			) : (
				<span onClick={changeTaskValue}>{value}</span>
			)}

			{!!subTasks.length && (
				<Tasks
					parentId={task.id}
					tasks={subTasks}
				/>
			)}

			<button
				type="button"
				className={styles["context-menu-button"]}
				onClick={showContextMenu}
			>
				:
			</button>

			<ContextMenu
				id={contextMenuId}
				changeItem={changeTaskValue}
				deleteItem={deleteTab}
				completeItem={completeItem}
			/>
		</li>
	);
}

export default Task;
