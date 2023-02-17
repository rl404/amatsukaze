<script lang="ts">
	import type { vtubersResponseData } from './+page.server';

	export let data: Array<vtubersResponseData> = [];

	const agencies = data.reduce((res: Array<string>, curr) => {
		curr.agencies?.forEach((a) => {
			if (!res.find((r) => r === a.name)) {
				res.push(a.name);
			}
		});
		return res;
	}, []);
</script>

<div>
	<div class="text-center font-bold">Agency Count</div>
	<div class="text-center font-bold text-5xl my-2">
		{agencies.length}
	</div>
</div>
