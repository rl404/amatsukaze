<script lang="ts">
	import MoonIcon from '$lib/components/icons/MoonIcon.svelte';
	import { ThemeMode, setTheme } from '$lib/utils/theme';

	export { className as class };
	let className: string = '';

	const setLightTheme = () => setTheme(ThemeMode.Light);
</script>

<button class="clickable hidden dark:block" on:click={setLightTheme} title="dark mode">
	<MoonIcon class={className} />
</button>
