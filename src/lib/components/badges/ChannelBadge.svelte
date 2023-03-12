<script lang="ts">
	export let type: string = '';
	export let url: string = '';

	let bgColor = 'bg-gray-500';
	let bgHoverColor = 'hover:bg-gray-700';

	switch (type) {
		case 'YOUTUBE':
			bgColor = 'bg-red-500';
			bgHoverColor = 'hover:bg-red-700';
			break;
		case 'TWITCH':
			bgColor = 'bg-purple-500';
			bgHoverColor = 'hover:bg-purple-700';
			break;
		case 'BILIBILI':
			bgColor = 'bg-blue-500';
			bgHoverColor = 'hover:bg-blue-700';
			break;
		case 'NICONICO':
			bgColor = 'bg-black';
			bgHoverColor = 'hover:bg-gray-600';
	}
</script>

<a class="text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded {bgColor} {bgHoverColor}" href={url} target="_blank" rel="noreferrer">{type}</a>
