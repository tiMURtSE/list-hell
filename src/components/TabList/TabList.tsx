import { useContext } from "react";
import Tab from "../Tab/Tab";
import styles from "./TabList.module.css";
import { IContext } from "../../types";
import { TabContext } from "../../hooks/useContext";

type Props = {};

function TabList({}: Props) {
	const { tabs } = useContext(TabContext) as IContext;

	return (
		<div className={styles.tabs}>
			{tabs.map((tab) => (
				<Tab
					tab={tab}
					key={tab.id}
				/>
			))}
		</div>
	);
}

export default TabList;
