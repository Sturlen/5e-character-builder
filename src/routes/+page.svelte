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
    <p>{character.race.base.name} - {character.race.subrace?.base.name ?? ''}</p>

    <h2>Base Ability Scores</h2>
    <AbilityScoreInput />
    <h2>Ability Scores (modifier)</h2>
    <span>
        <AbilityScoreArray {scores} />
    </span>
    <h2>Race</h2>
    <select bind:value={chosen_race}>
        {#each parsed_races as race}
            <option value={race}>{race.name}</option>
        {/each}
    </select>

    {#each chosen_race.options as option}
        <p>+{option.amount} to a chosen attribute</p>
    {/each}
    {#if available_subraces.length > 0}
        <h2>Subrace</h2>
        <select bind:value={chosen_subrace}>
            {#each available_subraces as subrace}
                <option value={subrace}>{subrace.name}</option>
            {/each}
        </select>
    {/if}

    <h2>Background</h2>
    <select bind:value={chosen_background}>
        {#each backgrounds as background}
            <option value={background}>{background.name}</option>
        {/each}
    </select>

    <h2>Languages</h2>
    {#each character.languages as prof}
        <span>{prof}</span>
    {/each}

    <h2>Skill Proficiencies</h2>
    {#each character.background.skillProfs as prof}
        <span>{prof}</span>
    {/each}

    <h2>Tool Proficiencies</h2>
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

    h2 {
        width: 60%;
        text-align: left;
        font-weight: bold;
        border-bottom: 1px solid black;
    }
</style>
