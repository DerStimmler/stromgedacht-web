<script lang="ts">
	import { isSameDay, format } from 'date-fns';
	import type { CustomRegionStatePeriod } from '$lib/CustomRegionStatePeriod';
	import { CustomRegionStates } from '$lib/CustomRegionStates';
	import type { CustomRegionState } from '$lib/CustomRegionState';

	export let highlightCurrentDay = false;
	$: isDayNameBole = highlightCurrentDay && isSameDay(new Date(date), new Date());
	export let date: string;
	$: dayName = new Date(date).toLocaleDateString('de-DE', { weekday: 'long' });
	export let states: CustomRegionStatePeriod[];
	$: worstState = getWorstStatePerDay(states);

	function getWorstStatePerDay(regionStates: CustomRegionStatePeriod[]): CustomRegionState {
		return Math.max(...regionStates.map((x) => x.state as number)) as CustomRegionState;
	}
</script>

<div
	class="flex flex-col items-center rounded p-4 text-black"
	class:bg-stateGreen={worstState === CustomRegionStates.Green}
	class:bg-stateYellow={worstState === CustomRegionStates.Yellow}
	class:bg-stateOrange={worstState === CustomRegionStates.Orange}
	class:bg-stateRed={worstState === CustomRegionStates.Red}
	class:bg-stateUnknown={worstState === CustomRegionStates.Unknown}
	class:bg-stateSuperGreen={worstState === CustomRegionStates.SuperGreen}
>
	<span class:font-bold={isDayNameBole}>{dayName}</span>
	<span class="text-xs">{format(new Date(date), 'dd.MM.yyyy')}</span>
</div>
