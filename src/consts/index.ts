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
		isTitleChanging: false,
	},
	{
		id: crypto.randomUUID(),
		title: "Неделя",
		tasks: [
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
		isTitleChanging: false,
	},
	{
		id: crypto.randomUUID(),
		title: "JavaScript",
		tasks: [],
		isTitleChanging: false,
	},
];
