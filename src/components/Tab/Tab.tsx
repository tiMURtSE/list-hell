import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./Tab.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
	isSelected: boolean;
	setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

function Tab({ title, isSelected, setSelectedTab, ...props }: Props) {
	return (
		<button
			className={classNames(styles.tab, { [styles.selected]: isSelected })}
			title={title}
			onClick={() => setSelectedTab(title)}
			{...props}
		>
			{title}
		</button>
	);
}

export default Tab;
