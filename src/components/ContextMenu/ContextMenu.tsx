import { MouseEvent, DialogHTMLAttributes } from "react";
import styles from "./ContextMenu.module.css";

interface Props extends DialogHTMLAttributes<HTMLDialogElement> {
	changeTabTitle: () => void;
	deleteTab: () => void;
}

function ContextMenu({ changeTabTitle, deleteTab, ...props }: Props) {
	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as HTMLDialogElement;
		const isOutsideClick = !target.closest(`.${styles.content}`);

		if (isOutsideClick) target.close();
	};

	return (
		<dialog
			className={styles.dialog}
			onClick={handleClickOutside}
			{...props}
		>
			<div className={styles.content}>
				<ul className={styles.list}>
					<li onClick={changeTabTitle}>
						<button className={styles["list__item"]}>Изменить</button>
					</li>
					<li onClick={deleteTab}>
						<button className={styles["list__item"]}>Удалить</button>
					</li>
				</ul>
			</div>
		</dialog>
	);
}

export default ContextMenu;
