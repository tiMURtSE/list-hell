import { useContext, useRef, FormEvent } from "react";
import { IContext, ITab } from "../../../types";
import { TabContext } from "../../../hooks/useContext";
import { LocalStorage } from "../../../utils/LocalStorage";
import styles from "./TextField.module.css";

type Props = {
	tab: ITab;
};

function TextField({ tab }: Props) {
	const { tabs, setTabs, setActiveTab } = useContext(TabContext) as IContext;
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmitNewTabTitle = (event: FormEvent) => {
		event.preventDefault();
		const title = inputRef.current?.value;

		if (title) {
			const newTab = { ...tab, title, isTitleChanging: false } as ITab;
			const updatedTabs = LocalStorage.setTab(newTab);

			setTabs(updatedTabs);
		} else {
			const isConfirmed = confirm("Темы без названия будет удалена. Удалить тему?");

			if (isConfirmed) deleteTab();
		}
	};

	const deleteTab = () => {
		const updatedTabs = LocalStorage.deleteTab(tab);
		const tabPosition = tabs.findIndex((item) => item.id === tab.id);

		if (tabPosition) {
			setActiveTab(tabs[tabPosition - 1]);
		} else {
			setActiveTab(tabs[tabPosition + 1]);
		}

		setTabs(updatedTabs);
	};

	return (
		<form
			className={styles["form"]}
			onSubmit={handleSubmitNewTabTitle}
		>
			<input
				type="text"
				className={styles["input"]}
				defaultValue={tab.title}
				ref={inputRef}
				onBlur={handleSubmitNewTabTitle}
				autoFocus
			/>
		</form>
	);
}

export default TextField;
