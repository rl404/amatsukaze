<script lang="ts">
	import GithubIcon from '../icons/GithubIcon.svelte';

	export { className as class };
	let className: string = '';
</script>

<a
	href="https://github.com/rl404/amatsukaze"
	target="_blank"
	rel="noreferrer"
	title="github source code"
	class="clickable"
>
	<GithubIcon class={className} />
</a>
