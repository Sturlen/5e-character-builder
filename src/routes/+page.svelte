<script>
    import {
        parsed_dwarf,
        parsed_races,
        createBasicCharacter,
        backgrounds,
        createAS,
        base_scores
    } from '$lib/character'
    import AbilityScoreArray from '$lib/AbilityScoreArray.svelte'
    import AbilityScoreInput from '$lib/AbilityScoreInput.svelte'
    const char = parsed_dwarf

    $: chosen_race = parsed_races[0]
    $: available_subraces = chosen_race.subraces
    $: chosen_subrace = available_subraces[0]
    $: chosen_background = backgrounds[0]
    $: character = createBasicCharacter({
        baseRace: chosen_race,
        baseSubrace: chosen_subrace,
        BaseBackground: chosen_background,
        scores: $base_scores
    })
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
        <AbilityScoreInput />
        <AbilityScoreArray {scores} />
    </span>
    <select bind:value={chosen_race}>
        {#each parsed_races as race}
            <option value={race}>{race.name}</option>
        {/each}
    </select>
    {#each chosen_race.options as option}
        <p>+{option.amount} to a chosen attribute</p>
    {/each}
    {#if available_subraces.length > 0}
        <select bind:value={chosen_subrace}>
            {#each available_subraces as subrace}
                <option value={subrace}>{subrace.name}</option>
            {/each}
        </select>
    {/if}

    <select bind:value={chosen_background}>
        {#each backgrounds as background}
            <option value={background}>{background.name}</option>
        {/each}
    </select>
    <p>Languages</p>
    {#each character.languages as prof}
        <span>{prof}</span>
    {/each}
    <p>Skill Proficiencies</p>
    {#each character.background.skillProfs as prof}
        <span>{prof}</span>
    {/each}
    <p>Tool Proficiencies</p>
    {#each character.background.toolProfs as prof}
        <span>{prof}</span>
    {/each}
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
