import { ITab } from "../types";

export const tabsFromConsts: ITab[] = [
	{
		id: crypto.randomUUID(),
		title: "Сегодня",
		tasks: [
			{
				id: crypto.randomUUID(),
				value: "Почитать",
				subTasks: [],
				isCompleted: false,
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
						subTasks: [],
						isCompleted: false,
					},
				],
				isCompleted: false,
			},
		],
	},
	{
		id: crypto.randomUUID(),
		title: "Неделя",
		tasks: [
			{
				id: crypto.randomUUID(),
				value: "Сходить к эдже",
				subTasks: [],
				isCompleted: true,
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
				isCompleted: true,
			},
		],
	},
	{
		id: crypto.randomUUID(),
		title: "JavaScript",
		tasks: [],
	},
];
