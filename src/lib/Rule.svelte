<script>
	import { useTooltip } from '@untemps/svelte-use-tooltip'
	import Icon from './Icon.svelte'
	import { AbilityScores, ablityScoreNames } from "./Character.js"
	export let src = "wis"
	$: as = ablityScoreNames[src]
	$: name = AbilityScores[as]?.name ?? "Unknown"
	$: desc = AbilityScores[as]?.desc ?? "Missing Description."
	
	const id = crypto.randomUUID()

</script>

<span class="link" use:useTooltip={{contentSelector: "#rule-tooltip-" + id, containerClassName: "tooltip", position: "bottom" }} style="text-decoration: underline">{name}</span>

<template id="rule-tooltip-{id}">
	<div class="tooltip__content">
		<div id="header">
			<span id="icon"><Icon as={as}/></span> <b>{name}</b>
		</div>
		
		<p>
		{desc}
	</p>
	</div>
	
</template>

<style>
	#icon {
		font-size: 3rem;
	}
	
	.link {
		text-decoration: underline;
	}
	
	#header {
		border-bottom: 1px solid black;
		display: flex;
		align-items: center;
		font-size: 1.5rem;
		gap: 1ch;
	}
	 .tooltip__content {
        background-color: white;
        color: black;
		 		padding: 10px;
		 		border: 0px solid black;
		 		width: 40ch;
   }
	:global(.tooltip) {
        position: absolute;
        z-index: 9999;
/*         max-width: 120px; */
        background-color: none;
        color: #fff;
        text-align: left;
        padding: 0px;
				box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
				transform: translate(50px, -10px);
    }

</style>