<script lang="ts">
	export let text: string;
	export let x: number;
	export let y: number;
</script>

<div
	class="p-2 absolute bg-surface rounded text-text text-xs"
	style:top="{y + 5}px"
	style:left="{x + 5}px"
>
	{text}
</div>
