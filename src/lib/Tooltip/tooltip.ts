import Tooltip from '$lib/Tooltip/Tooltip.svelte';

export function tooltip(element: HTMLElement, options: { text: string }) {
	let tooltipComponent: Tooltip;
	let isVisible = false;
	let text = options.text;

	function mouseOver(event: MouseEvent) {
		if (isVisible) return;

		tooltipComponent = new Tooltip({
			props: {
				text: text,
				x: event.pageX,
				y: event.pageY
			},
			target: document.body
		});

		isVisible = true;
	}
	function mouseMove(event: MouseEvent) {
		if (!isVisible) return;

		tooltipComponent.$set({
			x: event.pageX,
			y: event.pageY
		});
	}
	function mouseLeave() {
		if (!isVisible) return;

		tooltipComponent.$destroy();

		isVisible = false;
	}

	element.addEventListener('mouseover', mouseOver);
	element.addEventListener('mouseleave', mouseLeave);
	element.addEventListener('mousemove', mouseMove);

	return {
		update(options: { text: string }) {
			text = options.text;

			if (tooltipComponent) {
				tooltipComponent.props.text = text;
			}
		},
		destroy() {
			element.removeEventListener('mouseover', mouseOver);
			element.removeEventListener('mouseleave', mouseLeave);
			element.removeEventListener('mousemove', mouseMove);
		}
	};
}
