import { useContext, ButtonHTMLAttributes } from "react";
import styles from "./NewTabButton.module.css";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { TabContext } from "../../hooks/useContext";
import { IContext } from "../../types";
import { createNewTab } from "../../utils/createNewTab";
import { DatabaseManager } from "../../utils/DatabaseManager";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

function NewTabButton({}: Props) {
	const { tabs, setTabs, setActiveTab } = useContext(TabContext) as IContext;

	const addNewTab = () => {
		const areSomeTabValuesChanging = tabs.some((item) => item.isValueChanging);

		if (!areSomeTabValuesChanging) {
			const newTab = createNewTab();
			const updatedTabs = DatabaseManager.addTab(newTab);
			const lastIndex = updatedTabs.length - 1;

			setTabs(updatedTabs);
			setActiveTab(updatedTabs[lastIndex]);
		}
	};

	return (
		<button
			className={styles.btn}
			onClick={addNewTab}
		>
			<PlusIcon />
		</button>
	);
}

export default NewTabButton;
