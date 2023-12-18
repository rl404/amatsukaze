<script lang="ts">
	import SunIcon from '$lib/components/icons/SunIcon.svelte';
	import { ThemeMode, setTheme } from '$lib/utils/theme';

	export { className as class };
	let className: string = '';

	const setDarkTheme = () => setTheme(ThemeMode.Dark);
</script>

<button class="clickable block dark:hidden" on:click={setDarkTheme} title="light mode">
	<SunIcon class={className} />
</button>
