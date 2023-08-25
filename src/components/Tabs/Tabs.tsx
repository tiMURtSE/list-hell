import { useContext } from "react";
import Tab from "./Tab/Tab";
import styles from "./Tabs.module.css";
import { IContext } from "../../types";
import { TabContext } from "../../hooks/useContext";
import NewTabButton from "../NewTabButton/NewTabButton";

type Props = {};

function Tabs({}: Props) {
	const { tabs } = useContext(TabContext) as IContext;

	return (
		<div className={styles.tabs}>
			{tabs.map((tab) => (
				<Tab
					tab={tab}
					key={tab.id}
				/>
			))}

			<NewTabButton />
		</div>
	);
}

export default Tabs;
