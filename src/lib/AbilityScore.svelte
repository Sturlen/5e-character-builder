<script lang="ts">
    import { abilityScoreModifier } from '$lib/character'
    import type { AbilityName } from '$lib/AbilityScores'
    export let name: AbilityName = 'Strength'
    export let score = 10
    $: mod = abilityScoreModifier(score)
</script>

<div>
    <span>{name}</span> <span id="score">{score}</span>
    <span id="mod">({mod > 0 ? `+${mod}` : `${mod}`})</span>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 10px;
        border: 1px solid black;
        border-radius: 5px;
    }
    #score {
        font-size: 2em;
    }
    #mod {
        color: grey;
    }
</style>
