import { useContext, ButtonHTMLAttributes } from "react";
import styles from "./NewTabButton.module.css";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { TabContext } from "../../hooks/useContext";
import { IContext } from "../../types";
import { LocalStorage } from "../../utils/LocalStorage";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

function NewTabButton({}: Props) {
	const { tabs, setTabs } = useContext(TabContext) as IContext;

	const addNewTab = () => {
		const isTabTitleChanging = tabs.some((item) => item.isTitleChanging === true);

		if (isTabTitleChanging) return;

		const updatedTabs = LocalStorage.addTab("");

		setTabs(updatedTabs);
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
