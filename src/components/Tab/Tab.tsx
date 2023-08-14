import { LiHTMLAttributes } from "react";

import styles from "./Tab.module.css";

interface Props extends LiHTMLAttributes<HTMLLIElement> {
	name: string;
	isSelected: boolean;
	setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

function Tab({ name, isSelected, setSelectedTab, ...props }: Props) {
	const className = isSelected ? [styles["tab"], styles["selected"]].join(" ") : styles["tab"];

	const handleSelect = () => {
		if (isSelected) {
			setSelectedTab("");
		} else {
			setSelectedTab(name);
		}
	};

	return (
		<li
			className={className}
			title={name}
			onClick={handleSelect}
			{...props}
		>
			{name}
		</li>
	);
}

export default Tab;
