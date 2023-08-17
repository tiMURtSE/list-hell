import { ButtonHTMLAttributes, useContext } from "react";
import styles from "./NewTabButton.module.css";
import { MyContext } from "../../App";
import { ITab } from "../../types";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

function NewTabButton({ ...props }: Props) {
	const { tabs, setTabs } = useContext(MyContext);

	const addNewTab = () => {
		const newTab = {
			id: crypto.randomUUID(),
			title: "",
			tasks: [],
		} as ITab;

		setTabs([...tabs, newTab]);
	};

	return (
		<button
			className={styles.btn}
			onClick={addNewTab}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 448 512"
			>
				<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
			</svg>
		</button>
	);
}

export default NewTabButton;
