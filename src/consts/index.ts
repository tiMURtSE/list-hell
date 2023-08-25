import { TabItem, TaskItem } from "../types";

export const STORAGE_NAME = "list-hell";

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

export const tasksFromConsts: { id: string; taskList: TaskItem[] }[] = [
	{
		id: "fdsfs",
		taskList: [
			{
				id: crypto.randomUUID(),
				value: "Почитать",
				subTasks: [],
				isCompleted: true,
				isValueChanging: false,
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
						isValueChanging: false,
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
								isValueChanging: false,
							},
							{
								id: crypto.randomUUID(),
								value: "Integ test",
								subTasks: [],
								isCompleted: false,
								isValueChanging: false,
							},
						],
						isCompleted: false,
						isValueChanging: false,
					},
				],
				isCompleted: false,
				isValueChanging: false,
			},
		],
	},
	{
		id: "22",
		taskList: [
			{
				id: crypto.randomUUID(),
				value: "Сходить к эдже",
				subTasks: [],
				isCompleted: false,
				isValueChanging: false,
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
						isValueChanging: false,
					},
					{
						id: crypto.randomUUID(),
						value: "Выбрать вещи",
						subTasks: [],
						isCompleted: true,
						isValueChanging: false,
					},
				],
				isCompleted: false,
				isValueChanging: false,
			},
		],
	},
	{
		id: "33",
		taskList: [],
	},
];
