import { ButtonHTMLAttributes, useContext, useRef, FormEvent } from "react";
import { IContext, TabItem } from "../../../types";
import styles from "./Tab.module.css";
import classNames from "classnames";
import { TabContext } from "../../../hooks/useContext";
import TextField from "../../UI/TextField/TextField";
import { DatabaseManager } from "../../../utils/DatabaseManager";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	tab: TabItem;
}

function Tab({ tab, ...props }: Props) {
	const { tabs, setTabs, activeTab, setActiveTab } = useContext(TabContext) as IContext;
	const inputRef = useRef<HTMLInputElement>(null);
	const isTabActive = activeTab?.id === tab.id;

	const submitNewTabTitle = (event: FormEvent) => {
		event.preventDefault();
		const inputElement = inputRef.current;
		const value = inputElement?.value;

		if (value) {
			const newTab = { ...tab, value, isValueChanging: false } as TabItem;
			const updatedTabs = DatabaseManager.changeTabValue(newTab);

			setTabs(updatedTabs);
		} else {
			const isConfirmed = confirm("Темы без названия будет удалена. Удалить тему?");

			if (isConfirmed) {
				removeTab();
			} else {
				setTimeout(() => inputElement?.focus(), 0);
			}
		}
	};

	const removeTab = () => {
		const updatedTabs = DatabaseManager.removeTab(tab);
		const tabPosition = tabs.findIndex((item) => item.id === tab.id);

		if (tabPosition) {
			setActiveTab(tabs[tabPosition - 1]);
		} else {
			setActiveTab(tabs[tabPosition + 1]);
		}

		setTabs(updatedTabs);
	};

	const changeTabTitle = () => {
		const newTab = { ...tab, isValueChanging: true } as TabItem;
		const updatedTabs = DatabaseManager.changeTabValue(newTab);

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
				{tab.isValueChanging ? (
					<TextField
						defaultValue={tab.value}
						ref={inputRef}
						handleSubmit={submitNewTabTitle}
					/>
				) : (
					<span>{tab.value}</span>
				)}
			</button>
		</div>
	);
}

export default Tab;
