import { MouseEvent, DialogHTMLAttributes } from "react";
import styles from "./PopupMenu.module.css";

interface Props extends DialogHTMLAttributes<HTMLDialogElement> {
	id: string;
	deleteTab: () => void;
	changeTabTitle: () => void;
}

function PopupMenu({ id, deleteTab, changeTabTitle, ...props }: Props) {
	const handleOutsideClick = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		const isOutsideClick = !target.closest(`.${styles.content}`);

		if (isOutsideClick) {
			const backdrop = document.getElementById(id) as HTMLDialogElement;

			if (backdrop) backdrop.close();
		}
	};

	return (
		<dialog
			id={id}
			className={styles.backdrop}
			onClick={handleOutsideClick}
			{...props}
		>
			<div className={styles.content}>
				<ul className={styles.list}>
					<li
						className={styles["list__item"]}
						onClick={changeTabTitle}
					>
						Изменить
					</li>
					<li
						className={styles["list__item"]}
						onClick={deleteTab}
					>
						Удалить
					</li>
				</ul>
			</div>
		</dialog>
	);
}

export default PopupMenu;
