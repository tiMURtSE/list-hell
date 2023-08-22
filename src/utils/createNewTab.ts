import { ITab } from "../types";

export const createNewTab = () => {
	return {
		id: crypto.randomUUID(),
		title: "",
		tasks: [],
		isTitleChanging: true,
	} as ITab;
};
