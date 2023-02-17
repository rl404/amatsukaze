<script lang="ts">
	import type { vtubersResponseData } from './+page.server';

	export let data: Array<vtubersResponseData> = [];
</script>

<div class="text-center font-bold">Vtuber Count</div>
<div class="text-center font-bold text-5xl my-2">
	{data.length.toLocaleString()}
</div>
