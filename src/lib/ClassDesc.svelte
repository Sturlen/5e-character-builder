<script>
export let text = ""
$: tags = [text.split("\n").filter(line => line.startsWith("###")).map(line => line.replace("###", ""))[0]]
</script>
<div>
{#each tags as tag}
<h3>
{tag}
</h3>
{/each}
</div>
<style>

</style>