import { ITab } from "../types";

export class LocalStorage {
	static getTabs() {
		const tabs = localStorage.getItem("tabs");

		if (tabs) {
			const parsedTabs = JSON.parse(tabs) as ITab[];

			return parsedTabs;
		} else {
			return [];
		}
	}

	static addTab(tabTitle: string) {
		const tabs = localStorage.getItem("tabs");
		const newTab = { id: crypto.randomUUID(), title: tabTitle, tasks: [] } as ITab;

		if (tabs) {
			const parsedTabs = JSON.parse(tabs) as ITab[];

			parsedTabs.push(newTab);
			localStorage.setItem("tabs", JSON.stringify(parsedTabs));
			return parsedTabs;
		} else {
			const tabs = [newTab];

			localStorage.setItem("tabs", JSON.stringify(tabs));
			return tabs;
		}
	}

	static setTab(updatedTab: ITab) {
		const tabs = localStorage.getItem("tabs");

		if (tabs) {
			let parsedTabs = JSON.parse(tabs) as ITab[];

			parsedTabs = parsedTabs.map((tab) => {
				if (tab.id === updatedTab.id) {
					return updatedTab;
				}

				return tab;
			});

			localStorage.setItem("tabs", JSON.stringify(parsedTabs));
			return parsedTabs;
		} else {
			return new Error("Ошибка: в хранилище нет такого таба для замены");
		}
	}

	static deleteTab(tabToDelete: ITab) {
		const tabs = localStorage.getItem("tabs");

		if (tabs) {
			let parsedTabs = JSON.parse(tabs) as ITab[];

			parsedTabs = parsedTabs.filter((tab) => tab.id !== tabToDelete.id);
			localStorage.setItem("tabs", JSON.stringify(parsedTabs));
			return parsedTabs;
		} else {
			return new Error("Ошибка: в хранилище нет такого таба для удаления");
		}
	}
}
