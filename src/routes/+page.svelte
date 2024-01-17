<script lang="ts">
	import { onMount } from 'svelte';
	import { stromgedachtClient } from 'ts-stromgedacht';

	import {
		format,
		addSeconds,
		getDayOfYear,
		subDays,
		addDays,
		subSeconds,
		set,
		compareAsc,
		differenceInSeconds
	} from 'date-fns';
	import Card from '$lib/Card.svelte';
	import DayCard from '$lib/DayCard.svelte';
	import { addOrSet } from '$lib/utils/map.helper';
	import { page } from '$app/stores';
	import DayTimeline from '$lib/DayTimeline.svelte';
	import type { CustomRegionStatePeriod } from '$lib/CustomRegionStatePeriod';
	import { CustomRegionStates } from '$lib/CustomRegionStates';
	import Legend from '$lib/Legend.svelte';

	const zipPattern = /^[0-9]{5}$/;

	let zip = '';
	let isLoading = false;

	let regionStatePeriods: CustomRegionStatePeriod[] = [];
	$: regionStatesPerDay = getRegionStatesPerDay(regionStatePeriods);

	function getRegionStatesPerDay(
		regionStatePeriods: CustomRegionStatePeriod[]
	): Map<string, CustomRegionStatePeriod[]> {
		regionStatePeriods.sort((a, b) => compareAsc(a.from, b.from));

		const map = new Map<string, CustomRegionStatePeriod[]>();
		for (let i = 0; i < regionStatePeriods.length; i++) {
			let currentFrom = regionStatePeriods[i].from;
			let currentTo = regionStatePeriods[i].to;
			const currentState = regionStatePeriods[i].state;
			const nextFrom = i < regionStatePeriods.length - 1 ? regionStatePeriods[i + 1].from : null;

			while (getDayOfYear(currentFrom) < getDayOfYear(currentTo)) {
				const maxDateOfDay = set(currentFrom, {
					hours: 23,
					minutes: 59,
					seconds: 59
				});

				addOrSet(map, format(currentFrom, 'yyyy-MM-dd'), {
					from: currentFrom,
					to: maxDateOfDay,
					state: currentState
				});
				currentFrom = addSeconds(maxDateOfDay, 1);
			}

			addOrSet(map, format(currentFrom, 'yyyy-MM-dd'), {
				from: currentFrom,
				to: currentTo,
				state: currentState
			});

			if (nextFrom && differenceInSeconds(nextFrom, currentTo) > 1) {
				currentFrom = addSeconds(currentTo, 1);
				currentTo = subSeconds(nextFrom, 1);

				addOrSet(map, format(currentFrom, 'yyyy-MM-dd'), {
					from: currentFrom,
					to: currentTo,
					state: CustomRegionStates.Unknown
				});
			}
		}

		return map;
	}

	onMount(async () => {
		zip = $page.url.searchParams.get('zip') || localStorage.getItem('zip') || '';

		if (!zip) return;

		await search();
	});

	async function search() {
		if (!zipPattern.test(zip)) return;

		localStorage.setItem('zip', zip);

		let from = new Date();
		from = subDays(from, 4);
		from = set(from, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });

		let to = new Date();
		to = addDays(to, 2);
		to = set(to, { hours: 23, minutes: 59, seconds: 59, milliseconds: 999 });

		isLoading = true;
		regionStatePeriods = await stromgedachtClient.states(zip, from, to);
		isLoading = false;
	}
</script>

<div class="flex flex-col gap-8">
	<Card>
		<form class="flex gap-4">
			<input
				type="text"
				name="zip"
				bind:value={zip}
				pattern={zipPattern.source}
				required
				placeholder="PLZ"
				class="bg-background block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-textMuted placeholder:text-textMuted sm:text-sm sm:leading-6"
			/>
			<button on:click={search}>{isLoading ? 'Laden...' : 'Suchen'}</button>
		</form>
	</Card>

	{#if regionStatesPerDay.size > 0}
		<Card>
			<div class="grid gap-6 md:grid-cols-[max-content_minmax(42rem,_1fr)]">
				{#each regionStatesPerDay as states (states[0])}
					<DayCard states={states[1]} date={states[0]} highlightCurrentDay={true} />
					<DayTimeline states={states[1]} />
				{/each}
			</div>
		</Card>

		<Card>
			<Legend />
		</Card>
	{/if}
</div>
