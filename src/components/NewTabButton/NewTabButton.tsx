import { useContext, ButtonHTMLAttributes } from "react";
import styles from "./NewTabButton.module.css";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { TabContext } from "../../hooks/useContext";
import { IContext } from "../../types";
import { LocalStorage } from "../../utils/LocalStorage";
import { createNewTab } from "../../utils/createNewTab";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

function NewTabButton({}: Props) {
	const { tabs, setTabs, setActiveTab } = useContext(TabContext) as IContext;

	const addNewTab = () => {
		const isTabTitleChanging = tabs.some((item) => item.isTitleChanging === true);

		if (isTabTitleChanging) return;

		const newTab = createNewTab();
		const updatedTabs = LocalStorage.addTab(newTab);
		console.log(updatedTabs);
		setTabs(updatedTabs);
		setActiveTab(updatedTabs[updatedTabs.length - 1]);
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
