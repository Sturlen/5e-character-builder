<script>
    import { parsed_dwarf, parsed_races, createBasicCharacter } from '$lib/character'
    import AbilityScoreArray from '$lib/AbilityScoreArray.svelte'
    const char = parsed_dwarf

    $: chosen_race = parsed_races[0]
    $: available_subraces = chosen_race.subraces
    $: chosen_subrace = available_subraces[0]
    $: character = createBasicCharacter(chosen_race, chosen_subrace)
    $: scores = character.as
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <h1>John Dungeon</h1>
    <h2>{character.race.base.name} - {character.race.subrace?.base.name ?? ''}</h2>
    <span>
        <AbilityScoreArray {scores} />
    </span>
    <select bind:value={chosen_race}>
        {#each parsed_races as race}
            <option value={race}>{race.name}</option>
        {/each}
    </select>
    <p>{chosen_race.name}</p>
    {#if available_subraces.length > 0}
        <select bind:value={chosen_subrace}>
            {#each available_subraces as subrace}
                <option value={subrace}>{subrace.name}</option>
            {/each}
        </select>
    {/if}
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
