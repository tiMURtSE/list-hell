import React, { FormEvent } from "react";
import classNames from "classnames";
import styles from "./TextField.module.css";

type Props = {
	defaultValue: string;
	handleSubmit: (event: FormEvent) => void;
	isTask?: boolean;
};

const TextField = React.forwardRef(
	({ defaultValue, handleSubmit, isTask }: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
		return (
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className={classNames(styles.input, { [styles.task]: isTask })}
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
