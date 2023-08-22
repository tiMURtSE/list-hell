import { useContext, useRef, FormEvent } from "react";
import { IContext, ITab } from "../../../types";
import { TabContext } from "../../../hooks/useContext";
import { LocalStorage } from "../../../utils/LocalStorage";

type Props = {
	tab: ITab;
};

function TextField({ tab }: Props) {
	const { tabs, setTabs } = useContext(TabContext) as IContext;
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmitNewTabTitle = (event: FormEvent) => {
		event.preventDefault();
		const title = inputRef.current?.value;

		if (title) {
			const newTab = { ...tab, title, isTitleChanging: false } as ITab;
			const updatedTabs = LocalStorage.setTab(newTab);

			setTabs(updatedTabs);
		} else {
			// return deleteTab();
		}
	};

	const deleteTab = () => {};

	return (
		<form onSubmit={handleSubmitNewTabTitle}>
			<input
				type="text"
				defaultValue={tab.title}
				ref={inputRef}
				autoFocus
			/>
		</form>
	);
}

export default TextField;
