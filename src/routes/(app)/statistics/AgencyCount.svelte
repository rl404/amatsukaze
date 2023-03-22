<script lang="ts">
	import type { agencyResponseData } from '../../api/agencies/[id]/+server';

	export let data: Array<agencyResponseData>;
</script>

<div class="text-center font-bold text-5xl">{data.length.toLocaleString()}</div>
