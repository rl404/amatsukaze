<script lang="ts">
	export let size: string = '';

	const sizeClass: { [size: string]: string } = {
		'': 'px-2.5 py-0.5',
		sm: 'px-2 py text-xs'
	};
</script>

<span class="font-medium text-white bg-blue-500 {sizeClass[size]} rounded-full" title="Has 2D model">2D</span>
