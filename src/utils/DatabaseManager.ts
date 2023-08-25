import { TabItem } from "../types";
import { LocalStorage } from "./LocalStorage";

export class DatabaseManager {
	static addTab(newTab: TabItem) {
		const localStorageData = LocalStorage.get();

		localStorageData.tabs.push(newTab);

		LocalStorage.set(localStorageData);
		return localStorageData.tabs;
	}

	static removeTab(tabToRemove: TabItem) {
		const localStorageData = LocalStorage.get();
		const updatedTabs = localStorageData.tabs.filter((tab) => tab.id !== tabToRemove.id);

		localStorageData.tabs = updatedTabs;

		LocalStorage.set(localStorageData);
		return localStorageData.tabs;
	}

	static changeTabValue(updatedTab: TabItem) {
		const localStorageData = LocalStorage.get();
		const updatedTabs = localStorageData.tabs.map((tab) => {
			if (tab.id === updatedTab.id) return updatedTab;

			return tab;
		});

		localStorageData.tabs = updatedTabs;

		LocalStorage.set(localStorageData);
		return localStorageData.tabs;
	}
}
