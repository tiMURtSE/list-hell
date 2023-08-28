export const isCaretAtEnd = (input: HTMLElement) => {
	const selection = window.getSelection();

	if (selection && selection.rangeCount > 0) {
		const range = selection.getRangeAt(0);
		const startOffset = range.startOffset;
		const endOffset = range.endOffset;

		const isTextSelected = () => {
			return Boolean(endOffset - startOffset);
		};

		const isCaretAtLastPosition = () => {
			const stringLength = input.textContent?.length;

			return endOffset === stringLength;
		};

		return !isTextSelected() && isCaretAtLastPosition();
	}

	return false;
};
