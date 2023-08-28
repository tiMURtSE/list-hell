export const focusLastItem = (currentItemId: string, className: string) => {
	const items = document.querySelectorAll<HTMLDivElement>(`.${className}`);

	for (let i = 0; i < items.length - 1; i++) {
		if (items[i + 1].id === currentItemId) {
			items[i].focus();
		}
	}
};
