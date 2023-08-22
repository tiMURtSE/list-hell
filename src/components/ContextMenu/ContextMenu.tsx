import { MouseEvent, DialogHTMLAttributes, useRef } from "react";
import styles from "./ContextMenu.module.css";

interface Props extends DialogHTMLAttributes<HTMLDialogElement> {
	changeItem: () => void;
	deleteItem: () => void;
	completeItem?: () => void;
}

function ContextMenu({ changeItem, deleteItem, completeItem, ...props }: Props) {
	const contextMenuRef = useRef<HTMLDialogElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as HTMLDialogElement;
		const isOutsideClick = !target.closest(`.${styles.content}`);

		if (isOutsideClick) target.close();
	};

	const onChange = () => {
		const contextMenu = contextMenuRef.current;

		if (contextMenu) {
			changeItem();
			contextMenu.close();
		}
	};
	const onDelete = () => {
		const contextMenu = contextMenuRef.current;

		if (contextMenu) {
			deleteItem();
			contextMenu.close();
		}
	};
	const onComplete = () => {
		const contextMenu = contextMenuRef.current;

		if (contextMenu) {
			if (completeItem) completeItem();
			contextMenu.close();
		}
	};

	return (
		<dialog
			className={styles.dialog}
			onClick={handleClickOutside}
			ref={contextMenuRef}
			{...props}
		>
			<div className={styles.content}>
				<ul className={styles.list}>
					{completeItem && (
						<li onClick={onComplete}>
							<button className={styles["list__item"]}>Выполнить</button>
						</li>
					)}

					<li onClick={onChange}>
						<button className={styles["list__item"]}>Изменить</button>
					</li>

					<li onClick={onDelete}>
						<button className={styles["list__item"]}>Удалить</button>
					</li>
				</ul>
			</div>
		</dialog>
	);
}

export default ContextMenu;
