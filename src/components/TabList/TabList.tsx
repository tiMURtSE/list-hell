import { useContext } from "react";
import NewTabButton from "../NewTabButton/NewTabButton";
import Tab from "../Tab/Tab";
import styles from "./TabList.module.css";
import { MyContext } from "../../App";
import { ContextProps } from "../../types";

type Props = {
	selectedTab: string;
	setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
};

function TabList({ selectedTab, setSelectedTab }: Props) {
	const { tabs } = useContext(MyContext) as ContextProps;

	return (
		<div className={styles.tabs}>
			{tabs.map((tab) => (
				<Tab
					tab={tab}
					isSelected={selectedTab === tab.title}
					setSelectedTab={setSelectedTab}
					key={tab.id}
				/>
			))}

			<NewTabButton />
		</div>
	);
}

export default TabList;
