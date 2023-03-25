<script>
export let text = []
export let tooltips = {}
</script>
<div>
{#each text as tag}
<!-- Maybe clean up description fetching -->
<span title={tooltips[tag]?.description ?? tag }>
{tag}
</span>
{/each}
</div>
<style>
	div {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}
	span {
		padding: 0.3rem;
		border: 0.1rem solid black;
		border-radius: 5px;
		text-transform: capitalize;
		font-weight: 500;
		box-shadow: 2px 2px 2px rgb(0,0,0,0.1);
		background-color: rgb(0,0,0,0.7);
		color: rgb(255,255,255,0.9);
	}
	span:hover {
		background-color: rgb(0.5,0.5,0.5,0.9);
		color: white;
	}
</style>