import { TabItem } from "../types";

export const createNewTab = () => {
	return {
		id: crypto.randomUUID(),
		value: "",
		taskListId: "",
		isValueChanging: true,
	} as TabItem;
};
