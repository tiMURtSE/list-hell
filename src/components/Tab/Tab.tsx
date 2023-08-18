import { ButtonHTMLAttributes, useContext } from "react";
import { IContext, ITab } from "../../types";
import styles from "./Tab.module.css";
import classNames from "classnames";
import { TabContext } from "../../hooks/useContext";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	tab: ITab;
}

function Tab({ tab, ...props }: Props) {
	const { activeTab } = useContext(TabContext) as IContext;
	const isTabActive = activeTab.id === tab.id;

	return (
		<button
			className={classNames(styles.tab, { [styles.active]: isTabActive })}
			type="button"
			{...props}
		>
			{tab.title}
		</button>
	);
}

export default Tab;
