<script lang="ts">
	import { onMount } from 'svelte';
	import { ServiceWorkerMessages } from '$lib/utils/service-worker-messages';

	let isUpdateReady = false;
	let dismissedUpdate = false;

	onMount(async () => {
		const registration = await navigator.serviceWorker.getRegistration();

		if (!registration) return;

		// if SW gets update while using application
		registration.onupdatefound = () => {
			const installingWorker = registration.installing;

			if (!installingWorker) {
				return;
			}

			registration.installing.onstatechange = () => {
				if (installingWorker.state === 'installed') {
					isUpdateReady = true;
				}

				if (installingWorker.state === 'activated') {
					isUpdateReady = false;
				}
			};
		};

		//if SW already has update on startup
		if (registration.waiting?.state === 'installed') {
			isUpdateReady = true;
		}
	});

	async function updateServiceWorker() {
		const registration = await navigator.serviceWorker.getRegistration();

		if (!registration?.waiting || !isUpdateReady) return;

		registration.waiting.postMessage(ServiceWorkerMessages.SkipWaiting);
	}

	function dismissServiceWorkerUpdate() {
		dismissedUpdate = true;
	}
</script>

{#if isUpdateReady && !dismissedUpdate}
	<div class="fixed flex justify-between bottom-0 w-full bg-stateUnknown rounded py-2 px-4">
		<button on:click={updateServiceWorker}>Update available! Click here to update.</button>
		<button on:click={dismissServiceWorkerUpdate}>Dismiss</button>
	</div>
{/if}
