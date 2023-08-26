import { STORAGE_NAME } from "../consts";
import { TabItem, LocalStorageData } from "../types";

export class LocalStorage {
	static get() {
		const stringifiedData = localStorage.getItem(STORAGE_NAME);

		if (stringifiedData) {
			const data = JSON.parse(stringifiedData) as LocalStorageData;

			return data;
		} else {
			const data = { tabs: [], taskLists: [] } as LocalStorageData;
			const stringifiedData = JSON.stringify(data);

			localStorage.setItem(STORAGE_NAME, stringifiedData);
			return data;
		}
	}

	static set(data: LocalStorageData) {
		const stringifiedData = JSON.stringify(data);

		localStorage.setItem(STORAGE_NAME, stringifiedData);
	}

	/////////////////////////////////////////////////////////////

	static removeTab(tabToRemove: TabItem) {
		const tabs = localStorage.getItem("tabs") as string;

		let parsedTabs = JSON.parse(tabs) as TabItem[];

		parsedTabs = parsedTabs.filter((tab) => tab.id !== tabToRemove.id);
		localStorage.setItem("tabs", JSON.stringify(parsedTabs));
		return parsedTabs;
	}

	static setTab(updatedTab: TabItem) {
		const tabs = localStorage.getItem("tabs") as string;
		let parsedTabs = JSON.parse(tabs) as TabItem[];

		parsedTabs = parsedTabs.map((tab) => {
			if (tab.id === updatedTab.id) {
				return updatedTab;
			}

			return tab;
		});

		localStorage.setItem("tabs", JSON.stringify(parsedTabs));
		return parsedTabs;
	}
}
