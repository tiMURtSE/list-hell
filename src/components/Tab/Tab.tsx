import { ButtonHTMLAttributes, useContext } from "react";
import { IContext, ITab } from "../../types";
import styles from "./Tab.module.css";
import classNames from "classnames";
import { TabContext } from "../../hooks/useContext";
import { LocalStorage } from "../../utils/LocalStorage";
import TextField from "../UI/TextField/TextField";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	tab: ITab;
}

function Tab({ tab, ...props }: Props) {
	const { setTabs, activeTab } = useContext(TabContext) as IContext;
	const isTabActive = activeTab?.id === tab.id;

	const changeTabTitle = () => {
		const newTab = { ...tab, isTitleChanging: true } as ITab;
		const updatedTabs = LocalStorage.setTab(newTab);

		setTabs(updatedTabs);
	};

	return (
		<div className={styles.wrapper}>
			<button
				className={classNames(styles.tab, { [styles.active]: isTabActive })}
				onDoubleClick={changeTabTitle}
				{...props}
			>
				{tab.isTitleChanging ? <TextField tab={tab} /> : <span>{tab.title}</span>}
			</button>
		</div>
	);
}

export default Tab;
