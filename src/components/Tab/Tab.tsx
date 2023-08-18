import { ButtonHTMLAttributes, useContext, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./Tab.module.css";
import { MyContext } from "../../App";
import { ContextProps, ITab } from "../../types";
import PopupMenu from "../PopupMenu/PopupMenu";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	tab: ITab;
	isSelected: boolean;
	setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
	isSubmitting: boolean;
	setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

function Tab({ tab, isSelected, setSelectedTab, isSubmitting, setIsSubmitting, ...props }: Props) {
	const { tabs, setTabs } = useContext(MyContext) as ContextProps;
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		if (setSelectedTab) setSelectedTab(tab.title);

		if (isSelected && !isSubmitting) {
			const popup = document.getElementById(`popup-${tab.id}`) as HTMLDialogElement;

			if (popup) popup.showModal();
		}
	};

	const changeTabTitle = () => {
		const popup = document.getElementById(`popup-${tab.id}`) as HTMLDialogElement;

		setIsSubmitting(true);
		if (popup) popup.close();
	};

	const deleteTab = () => {
		const popup = document.getElementById(`popup-${tab.id}`) as HTMLDialogElement;

		if (popup) {
			const updatedTabs = tabs.filter((currentTab) => currentTab.id !== tab.id);

			popup.close();
			setTabs(updatedTabs);
			setSelectedTab(tabs[0].title);
		}
	};

	const handleSubmit = (event: any) => {
		event?.preventDefault();
		const input = inputRef.current;

		if (input?.value) {
			const value = input.value;
			const isDublicateTitle = tabs.some((tab) => tab.title === value);

			if (isDublicateTitle) {
				alert("Тема с таким названием уже есть");
				const updatedTabs = [...tabs];

				updatedTabs.pop();
				setTabs(updatedTabs);
				setSelectedTab(tabs[0].title);
			} else {
				const updatedTabs = tabs.map((currentTab) => {
					if (currentTab.title === tab.title) {
						return { ...currentTab, title: value };
					} else {
						return currentTab;
					}
				});

				setTabs(updatedTabs);
				setSelectedTab(value);
			}

			setIsSubmitting(false);
		}
	};

	return (
		<div className={styles.wrapper}>
			<button
				id={tab.id}
				className={classNames(styles.tab, { [styles.selected]: isSelected })}
				title={tab.title}
				onClick={handleClick}
				{...props}
			>
				<form onSubmit={handleSubmit}>
					{!tab.title || isSubmitting ? (
						<input
							type="text"
							className={styles.input}
							defaultValue={tab.title}
							ref={inputRef}
							autoFocus
							onBlur={handleSubmit}
						/>
					) : (
						tab.title
					)}
				</form>
			</button>

			<PopupMenu
				id={`popup-${tab.id}`}
				deleteTab={deleteTab}
				changeTabTitle={changeTabTitle}
			/>
		</div>
	);
}

export default Tab;
