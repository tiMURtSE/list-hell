import React, { FormEvent } from "react";
import styles from "./TextField.module.css";

type Props = {
	defaultValue: string;
	handleSubmit: (event: FormEvent) => void;
};

const TextField = React.forwardRef(
	({ defaultValue, handleSubmit }: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
		return (
			<form
				className={styles["form"]}
				onSubmit={handleSubmit}
			>
				<input
					type="text"
					className={styles["input"]}
					defaultValue={defaultValue}
					ref={ref}
					onBlur={handleSubmit}
					autoFocus
				/>
			</form>
		);
	}
);

export default TextField;
