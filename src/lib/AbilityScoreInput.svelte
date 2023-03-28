<script lang="ts">
    import type { AbilityName } from './AbilityScores'
    import { base_scores } from './character'

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
    {#each names as name, i}
        <span class="item">
            <span class="label">{name}:</span>
            <input
                value={$base_scores[name]}
                type="number"
                on:input={(e) => ($base_scores[name] = parseInt(e.currentTarget.value))}
                min="1"
                step="1"
                max="20"
            />
        </span>
    {/each}
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .label {
        width: 20ch;
    }
    .item {
        display: flex;
    }
    input {
        width: 5ch;
    }
</style>
