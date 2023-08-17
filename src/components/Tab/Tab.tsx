import { ButtonHTMLAttributes, useContext, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./Tab.module.css";
import { MyContext } from "../../App";
import { ContextProps, ITab } from "../../types";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	tab: ITab;
	isSelected: boolean;
	setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

function Tab({ tab, isSelected, setSelectedTab, ...props }: Props) {
	const { tabs, setTabs } = useContext(MyContext) as ContextProps;
	const [isSubmitting, setIsSubmitting] = useState(!tab.title ? true : false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		if (setSelectedTab) setSelectedTab(tab.title);

		if (isSelected && !isSubmitting) {
			const menu = document.getElementById(`menu-${tab.id}`) as HTMLDialogElement;

			if (menu) menu.showModal();
		}
	};

	const changeTabTitle = () => {
		const menu = document.getElementById(`menu-${tab.id}`) as HTMLDialogElement;

		setIsSubmitting(true);
		if (menu) menu.close();
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
		<div>
			<button
				id={tab.id}
				className={classNames(styles.tab, { [styles.selected]: isSelected })}
				title={tab.title}
				onClick={handleClick}
				{...props}
			>
				<form onSubmit={handleSubmit}>
					{isSubmitting ? (
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

			<dialog id={`menu-${tab.id}`}>
				<div>
					<ul>
						<li onClick={changeTabTitle}>Изменить</li>
						<li>Удалить</li>
					</ul>
				</div>
			</dialog>
		</div>
	);
}

export default Tab;
