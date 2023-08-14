import { ITab } from "../types";

export const tabs: ITab[] = [
	{
		name: "Сегодня",
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
		name: "Неделя",
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
		name: "JavaScript",
		tasks: [
			{
				id: crypto.randomUUID(),
				value: "Выучить итераторы",
				subTasks: [],
				isCompleted: true,
			},
		],
	},
];
