<script lang="ts">
	import type { BadgeSize } from '$lib/types';

	export let size: BadgeSize = '';

	const sizeClass: { [size: string]: string } = {
		'': 'px-2.5 py-0.5',
		sm: 'px-2 py text-xs'
	};
</script>

<span
	class="{sizeClass[size]} rounded-full bg-purple-500 font-medium text-white"
	title="Has 3D model">3D</span
>
