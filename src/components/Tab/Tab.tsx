import { ButtonHTMLAttributes, useContext, useRef } from "react";
import classNames from "classnames";
import styles from "./Tab.module.css";
import { MyContext } from "../../App";
import { ContextProps, ITab } from "../../types";
import PopupMenu from "../PopupMenu/PopupMenu";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	tab: ITab;
	isSubmitting: boolean;
	setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

function Tab({ tab, isSubmitting, setIsSubmitting, ...props }: Props) {
	const { tabs, setTabs, selectedTab, setSelectedTab } = useContext(MyContext) as ContextProps;
	const inputRef = useRef<HTMLInputElement>(null);
	const isSelected = selectedTab?.id === tab.id;
	const isNewTab = isSelected && !tab.title;

	const handleClick = () => {
		if (setSelectedTab) setSelectedTab(tab);

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
			setSelectedTab(tabs[0]);
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
				setSelectedTab(tabs[0]);
			} else {
				const updatedTabs = tabs.map((currentTab) => {
					if (currentTab.title === tab.title) {
						return { ...currentTab, title: value };
					} else {
						return currentTab;
					}
				});

				setTabs(updatedTabs);
				setSelectedTab({ ...tab, title: value });
			}

			setIsSubmitting(false);
		}
	};

	return (
		<>
			<button
				id={tab.id}
				className={classNames(styles.tab, { [styles.selected]: isSelected })}
				title={tab.title}
				onClick={handleClick}
				{...props}
			>
				<form onSubmit={handleSubmit}>
					{isNewTab ? (
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
		</>
	);
}

export default Tab;
