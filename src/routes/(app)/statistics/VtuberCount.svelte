<script lang="ts">
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;
</script>

<div class="text-center font-bold text-5xl">{data.length.toLocaleString()}</div>
