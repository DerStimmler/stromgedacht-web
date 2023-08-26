<script>
	import '../app.css';
	import { base } from '$app/paths';
</script>

<header class="flex flex-col gap-2">
	<h1 class="text-2xl text-center">StromGedacht Web</h1>
	<h2 class="text-textMuted text-center">
		Inoffizielle Webseite zur Anzeige von StromGedacht Daten
	</h2>
</header>

<main class="flex-1">
	<slot />
</main>

<footer class="w-full flex justify-between items-center">
	<a href="https://github.com/derstimmler/stromgedacht-web">
		<img src="{base}/images/github-mark-white.svg" width="32" height="32" alt="github logo" />
	</a>
	<a href="https://stromgedacht.de" target="_blank">StromGedacht</a>
</footer>
