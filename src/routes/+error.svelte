<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	if ($page.status === 404) goto(`${base}/`);
</script>
