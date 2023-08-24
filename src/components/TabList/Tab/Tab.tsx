import { ButtonHTMLAttributes, useContext, useRef, FormEvent } from "react";
import { IContext, ITab } from "../../../types";
import styles from "./Tab.module.css";
import classNames from "classnames";
import { TabContext } from "../../../hooks/useContext";
import { LocalStorage } from "../../../utils/LocalStorage";
import TextField from "../../UI/TextField/TextField";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	tab: ITab;
}

function Tab({ tab, ...props }: Props) {
	const { tabs, setTabs, activeTab, setActiveTab } = useContext(TabContext) as IContext;
	const inputRef = useRef<HTMLInputElement>(null);
	const isTabActive = activeTab?.id === tab.id;

	const submitNewTabTitle = (event: FormEvent) => {
		event.preventDefault();
		const title = inputRef.current?.value;

		if (title) {
			const newTab = { ...tab, title, isTitleChanging: false } as ITab;
			const updatedTabs = LocalStorage.setTab(newTab);

			setTabs(updatedTabs);
		} else {
			const isConfirmed = confirm("Темы без названия будет удалена. Удалить тему?");

			if (isConfirmed) removeTab();
		}
	};

	const removeTab = () => {
		const updatedTabs = LocalStorage.deleteTab(tab);
		const tabPosition = tabs.findIndex((item) => item.id === tab.id);

		if (tabPosition) {
			setActiveTab(tabs[tabPosition - 1]);
		} else {
			setActiveTab(tabs[tabPosition + 1]);
		}

		setTabs(updatedTabs);
	};

	const changeTabTitle = () => {
		const newTab = { ...tab, isTitleChanging: true } as ITab;
		const updatedTabs = LocalStorage.setTab(newTab);

		setActiveTab(tab);
		setTabs(updatedTabs);
	};

	return (
		<div className={styles.wrapper}>
			<button
				className={classNames(styles.tab, { [styles.active]: isTabActive })}
				onClick={() => setActiveTab(tab)}
				onDoubleClick={changeTabTitle}
				{...props}
			>
				{tab.isTitleChanging ? (
					<TextField
						defaultValue={tab.title}
						ref={inputRef}
						handleSubmit={submitNewTabTitle}
					/>
				) : (
					<span>{tab.title}</span>
				)}
			</button>
		</div>
	);
}

export default Tab;
