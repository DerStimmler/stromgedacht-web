<script lang="ts">
	import type { CustomRegionState } from '$lib/CustomRegionState';
	import { CustomRegionStates } from '$lib/CustomRegionStates';

	export let text: string;
	export let state: CustomRegionState;
	export let x: number;
	export let y: number;
</script>

<div
	class="p-2 absolute bg-surface rounded text-text text-xs"
	style:top="{y}px"
	style:left="{x}px"
	style:transform="translateX(-50%) translateY(-110%)"
>
	<span
		class="flex items-center gap-3 before:inline-block before:rounded-full before:h-4 before:w-4"
		class:before:bg-stateGreen={state === CustomRegionStates.Green}
		class:before:bg-stateYellow={state === CustomRegionStates.Yellow}
		class:before:bg-stateOrange={state === CustomRegionStates.Orange}
		class:before:bg-stateRed={state === CustomRegionStates.Red}
		class:before:bg-stateUnknown={state === CustomRegionStates.Unknown}
		class:before:bg-stateSuperGreen={state === CustomRegionStates.SuperGreen}>{text}</span
	>
</div>
