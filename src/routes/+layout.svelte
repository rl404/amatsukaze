<script>
	import '../app.css';
</script>

<div id="bg-pattern">
	<slot />
</div>

<style>
	#bg-pattern {
		background-image: radial-gradient(black 0.5px, rgb(254 252 232/0.3) 0.5px);
		background-size: 15px 15px;
	}
</style>
