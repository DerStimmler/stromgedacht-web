<script lang="ts">
	import { differenceInSeconds, format } from 'date-fns';
	import type { CustomRegionStatePeriod } from '$lib/CustomRegionStatePeriod';
	import { CustomRegionStates } from '$lib/CustomRegionStates';
	import { tooltip } from '$lib/Tooltip/tooltip';

	const secondsPerDay = 24 * 60 * 60;
	export let segments: 12 | 24 = 12;
	export let states: CustomRegionStatePeriod[];
	export let showLabels = false;

	function getHours() {
		const hours = [];
		const interval = 24 / segments;

		for (let i = 0; i <= 24; i += interval) {
			hours.push(i);
		}

		return hours;
	}
</script>

<div class="flex flex-col w-full items-center min-w-64">
	<div
		class="flex flex-1 rounded overflow-hidden min-h-14"
		style:width="calc(100% - calc(100% / {segments}))"
	>
		{#each states as regionStatePeriod}
			<div
				class="flex p-2 items-center justify-between h-full text-black"
				style:width="{(100 / secondsPerDay) *
					differenceInSeconds(regionStatePeriod.to, regionStatePeriod.from)}%"
				class:bg-stateGreen={regionStatePeriod.state === CustomRegionStates.Green}
				class:bg-stateYellow={regionStatePeriod.state === CustomRegionStates.Yellow}
				class:bg-stateOrange={regionStatePeriod.state === CustomRegionStates.Orange}
				class:bg-stateRed={regionStatePeriod.state === CustomRegionStates.Red}
				class:bg-stateUnknown={regionStatePeriod.state === CustomRegionStates.Unknown}
				class:bg-stateSuperGreen={regionStatePeriod.state === CustomRegionStates.SuperGreen}
				use:tooltip={{
					text: `${format(regionStatePeriod.from, 'HH:mm:ss')} - ${format(
						regionStatePeriod.to,
						'HH:mm:ss'
					)}`,
					state: regionStatePeriod.state
				}}
			>
				{#if showLabels}
					<span class="text-xs">{format(regionStatePeriod.from, 'HH:mm:ss')} </span>
					<span class="text-xs">{format(regionStatePeriod.to, 'HH:mm:ss')} </span>
				{/if}
			</div>
		{/each}
	</div>
	<div class="flex justify-between w-full">
		{#each getHours() as hour}
			<span class="text-center" style:width="calc(100% / {segments}">{hour}</span>
		{/each}
	</div>
</div>
