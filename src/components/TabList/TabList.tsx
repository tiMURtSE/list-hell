import { useContext, useState } from "react";
import NewTabButton from "../NewTabButton/NewTabButton";
import Tab from "../Tab/Tab";
import styles from "./TabList.module.css";
import { MyContext } from "../../App";
import { ContextProps } from "../../types";

type Props = {};

function TabList({}: Props) {
	const { tabs } = useContext(MyContext) as ContextProps;
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<>
			<div className={styles.tabs}>
				{tabs.map((tab) => (
					<Tab
						tab={tab}
						isSubmitting={isSubmitting}
						setIsSubmitting={setIsSubmitting}
						key={tab.id}
					/>
				))}

				<NewTabButton
					isSubmitting={isSubmitting}
					setIsSubmitting={setIsSubmitting}
				/>
			</div>
		</>
	);
}

export default TabList;
