import { ButtonHTMLAttributes, useRef, useContext, FormEvent, MouseEvent } from "react";
import { IContext, ITab } from "../../types";
import styles from "./Tab.module.css";
import classNames from "classnames";
import { TabContext } from "../../hooks/useContext";
import { LocalStorage } from "../../utils/LocalStorage";
import ContextMenu from "../ContextMenu/ContextMenu";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	tab: ITab;
}

function Tab({ tab, ...props }: Props) {
	const { tabs, setTabs, activeTab, setActiveTab } = useContext(TabContext) as IContext;
	const titleField = useRef<HTMLInputElement>(null);
	const isTabActive = activeTab.id === tab.id;
	const contextMenuId = `context-menu-${tab.id}`;

	const handleClick = () => {
		setActiveTab(tab);
	};

	const submitNewTabTitle = (event: FormEvent) => {
		event.preventDefault();

		const title = titleField.current?.value;
		const isDuplicateTitle = tabs.some((item) => item.title === title);

		if (!title) {
			alert("Название темы не может быть пустым!");
			return deleteTab();
		}

		if (isDuplicateTitle) {
			alert("Такое названия темы уже занято!");
			return deleteTab();
		}

		const newTab = { ...tab, title: title, isTitleChanging: false } as ITab;
		const updatedTabs = LocalStorage.setTab(newTab) as ITab[];

		setTabs(updatedTabs);
		setActiveTab(tab);
	};

	const showContextMenu = (event: MouseEvent) => {
		event.preventDefault();

		const contextMenu = document.getElementById(contextMenuId) as HTMLDialogElement;

		if (contextMenu) {
			contextMenu.showModal();
			setActiveTab(tab);
		}
	};

	const changeTabTitle = () => {
		const contextMenu = document.getElementById(contextMenuId) as HTMLDialogElement;
		const updatedTabs = tabs.map((item) => {
			if (item.id === tab.id) {
				return { ...tab, isTitleChanging: true };
			}

			return item;
		});

		if (contextMenu) contextMenu.close();

		setTabs(updatedTabs);
		setActiveTab(tab);
	};

	const deleteTab = () => {
		const updatedTabs = LocalStorage.deleteTab(tab);

		if (updatedTabs) {
			const tabPosition = tabs.findIndex((item) => item.id === tab.id);

			setTabs(updatedTabs);

			if (tabPosition) {
				setActiveTab(tabs[tabPosition - 1]);
			} else {
				setActiveTab(tabs[tabPosition + 1]);
			}
		}
	};

	return (
		<div className={styles.wrapper}>
			<button
				className={classNames(styles.tab, { [styles.active]: isTabActive })}
				type="button"
				onClick={handleClick}
				onContextMenu={showContextMenu}
				{...props}
			>
				{tab.isTitleChanging ? (
					<form onSubmit={submitNewTabTitle}>
						<input
							type="text"
							ref={titleField}
							onBlur={submitNewTabTitle}
							autoFocus
						/>
					</form>
				) : (
					tab.title
				)}
			</button>

			<ContextMenu
				id={contextMenuId}
				changeTabTitle={changeTabTitle}
				deleteTab={deleteTab}
			/>
		</div>
	);
}

export default Tab;
