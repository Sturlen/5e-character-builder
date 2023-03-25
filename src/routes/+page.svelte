<script>
    import { parsed_dwarf } from '$lib/character'
    import AbilityScoreArray from '$lib/AbilityScoreArray.svelte'
    const char = parsed_dwarf
    const scores = char.as
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <h1>John Dungeon</h1>
    <h2>{char.race.base.name} - {char.race.subrace?.base.name ?? ''}</h2>
    <span>
        <AbilityScoreArray {scores} />
    </span>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0.6;
    }

    h1 {
        width: 100%;
    }
</style>
