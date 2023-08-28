import { LocalStorageData, TabItem, TaskList } from "../types";

export const STORAGE_NAME = "list-hell";

export enum Keys {
	ENTER = "Enter",
	TAB = "Tab",
}

export const tabsFromConsts: TabItem[] = [
	{
		id: "1",
		value: "Сегодня",
		taskListId: "11",
		isValueChanging: false,
	},
	{
		id: "2",
		value: "Неделя",
		taskListId: "22",
		isValueChanging: false,
	},
	{
		id: "3",
		value: "JavaScript",
		taskListId: "33",
		isValueChanging: false,
	},
];

export const tasksFromConsts: TaskList[] = [
	{
		id: "11",
		tasks: [
			{
				id: crypto.randomUUID(),
				value: "Почитать",
				subTasks: [],
				isCompleted: true,
			},
			{
				id: crypto.randomUUID(),
				value: "Сделать проект",
				subTasks: [
					{
						id: crypto.randomUUID(),
						value: "Составить план",
						subTasks: [],
						isCompleted: false,
					},
					{
						id: crypto.randomUUID(),
						value: "Протестировать",
						subTasks: [
							{
								id: crypto.randomUUID(),
								value: "Unit test",
								subTasks: [],
								isCompleted: false,
							},
							{
								id: crypto.randomUUID(),
								value: "Integ test",
								subTasks: [],
								isCompleted: false,
							},
						],
						isCompleted: false,
					},
				],
				isCompleted: false,
			},
		],
	},
	{
		id: "22",
		tasks: [
			{
				id: crypto.randomUUID(),
				value: "Сходить к эдже",
				subTasks: [],
				isCompleted: false,
			},
			{
				id: crypto.randomUUID(),
				value: "Постирать вещи",
				subTasks: [
					{
						id: crypto.randomUUID(),
						value: "Купить порошок",
						subTasks: [],
						isCompleted: false,
					},
					{
						id: crypto.randomUUID(),
						value: "Выбрать вещи",
						subTasks: [],
						isCompleted: true,
					},
				],
				isCompleted: false,
			},
		],
	},
	{
		id: "33",
		tasks: [],
	},
];

export const mockValues: LocalStorageData = {
	tabs: tabsFromConsts,
	taskLists: tasksFromConsts,
};
