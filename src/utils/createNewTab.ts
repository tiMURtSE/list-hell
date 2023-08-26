import { TabItem } from "../types";

export const createNewTab = () => {
	return {
		id: crypto.randomUUID(),
		value: "",
		taskListId: crypto.randomUUID(),
		isValueChanging: true,
	} as TabItem;
};
