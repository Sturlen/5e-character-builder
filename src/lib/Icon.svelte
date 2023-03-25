<script>
    import { AbilityScores } from './Character.js'
    export let as = 'str'
    $: src = AbilityScores[as]?.icon_src
    $: name = AbilityScores[as]?.name
    const fallback =
        'https://game-icons.net/icons/ffffff/000000/1x1/delapouite/perspective-dice-six-faces-random.svg'
</script>

<img src={src ?? fallback} alt="" title={name ?? as} />

<style>
    img {
        height: 1em;
        border-radius: 0.05em;
        background-color: black;
        border: 0.05em solid black;
    }
</style>
