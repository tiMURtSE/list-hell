import { ButtonHTMLAttributes, useRef, useContext, FormEvent } from "react";
import { IContext, ITab } from "../../types";
import styles from "./Tab.module.css";
import classNames from "classnames";
import { TabContext } from "../../hooks/useContext";
import { LocalStorage } from "../../utils/LocalStorage";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	tab: ITab;
}

function Tab({ tab, ...props }: Props) {
	const { setTabs, activeTab, setActiveTab } = useContext(TabContext) as IContext;
	const titleField = useRef<HTMLInputElement>(null);
	const isTabActive = activeTab.id === tab.id;

	const handleClick = () => {
		setActiveTab(tab);
	};

	const submitNewTabTitle = (event: FormEvent) => {
		event.preventDefault();

		const title = titleField.current?.value;
		const newTab = { ...tab, title: title, isTitleChanging: false } as ITab;
		const updatedTabs = LocalStorage.setTab(newTab) as ITab[];

		setTabs(updatedTabs);
	};

	return (
		<button
			className={classNames(styles.tab, { [styles.active]: isTabActive })}
			type="button"
			onClick={handleClick}
			{...props}
		>
			{tab.isTitleChanging ? (
				<form onSubmit={submitNewTabTitle}>
					<input
						type="text"
						ref={titleField}
						autoFocus
					/>
				</form>
			) : (
				tab.title
			)}
		</button>
	);
}

export default Tab;
