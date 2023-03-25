<script lang="ts">
    import AbilityScore from './AbilityScore.svelte'
    import type { AbilityName, AbilityScoreArray } from './AbilityScores'

    export let scores: AbilityScoreArray
    const names: AbilityName[] = [
        'Strength',
        'Dexterity',
        'Constitution',
        'Intelligence',
        'Wisdom',
        'Charisma'
    ]
</script>

<div>
    {#each names as name}
        <AbilityScore {name} score={scores[name]} />
    {/each}
</div>

<style>
    div {
        display: flex;
        gap: 5px;
    }
</style>
