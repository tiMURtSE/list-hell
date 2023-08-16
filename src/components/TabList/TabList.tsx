import { ITab } from "../../types";
import NewTabButton from "../NewTabButton/NewTabButton";
import Tab from "../Tab/Tab";
import styles from "./TabList.module.css";

type Props = {
	tabs: ITab[];
	selectedTab: string;
	setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
};

function TabList({ tabs, selectedTab, setSelectedTab }: Props) {
	return (
		<div className={styles.tabs}>
			{tabs.map((tab) => (
				<Tab
					title={tab.title}
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
