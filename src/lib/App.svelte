<script>
	import {onMount} from 'svelte'
	import races_file from './races.json'
	import backgrounds_file from './backgrounds.json'
	import classes_file from './classes.json'
	import Tags from './Tags.svelte'
	import ClassDesc from './ClassDesc.svelte'
	import Icon from './Icon.svelte'
	import Rule from './Rule.svelte'
	import { Skills } from './Character'

	let backgrounds = backgrounds_file.results
	let races = races_file.results
	let classes = classes_file.results
	
	let selected_background = backgrounds[1]
	let selected_race = races[3]
	let selected_class = classes[0]
	
	const skill_tips = {
		"Stealth": "Hidden",
		"Deception": "Lies and Deceit", 
		"Sleight of Hand": "handy!", 
		"Insight": "See things",
		"Religion": "Religious knowledge",
	}
	
	onMount(() => {
// 		Access API
	})
</script>

<body>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/rpg-awesome/0.2.0/css/rpg-awesome.min.css" integrity="sha512-01mG/8rtthZxcE/oLY/1aVBq0UHYxd3r9MgSi33zFQ190gj+BfHY8XeoFiErGyVt1pE68U6InjMq+xkVTSf6yg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<section>
<h2>Background</h2>
<select bind:value={selected_background}>
	<option value={undefined}>Choose One</option>
{#each backgrounds as background}
	<option value={background}>{background.name}</option>
{/each}
	
</select>
{#if selected_background}
	
	<p class="desc">
		{selected_background.desc.split(".")[0]}.
	</p>
	<b>Skill Proficiencies:</b>
	<Tags text={selected_background.skill_proficiencies.split(", ")} tooltips={Skills}/>
	<b>Tool Proficiencies:</b>
	<Tags text={selected_background.tool_proficiencies ? selected_background.tool_proficiencies.split(",") : ["None"]}/>
	<h3>
		{selected_background.feature}
	</h3>

<i>{selected_background.document__title}</i>
{/if}
</section>

<section>
<h2>Race</h2>
<select bind:value={selected_race}>
	<option value={undefined}>Choose A Race</option>
{#each races as race}
	<option value={race}>{race.name}</option>
{/each}
</select>
	
<Icon as="wis"/>

<Icon as="dex"/>
<Icon as="con"/>
	

{#if selected_race}
	<p>
			{selected_race.desc.split("\n")[1]}
	</p>
<ul>
	
	
{#each selected_race.asi as asi}
	<li>
		<Rule src={asi.attributes[0]}/><b>+{asi.value}</b>
		
	</li>
{/each}
	</ul>
	<br>
<i>{selected_race.document__title}</i>
{/if}
</section>

<section>
<h2>Class</h2>
<select bind:value={selected_class}>
	<option value={undefined}>Choose A Race</option>
{#each classes as role}
	<option value={role}>{role.name}</option>
{/each}
</select>

{#if selected_class}
<ClassDesc text={selected_class.desc} />

	<span>
		<b>Hit Dice:</b> {selected_class.hit_dice}
	</span>
	<br>
	<span>
		<b>Armor Proficiencies:</b> <Tags text={selected_class.prof_armor.split(", ")}></Tags>
	</span>
	<br>
	<span>
		<b>Weapon Proficiencies:</b> <Tags text={selected_class.prof_weapons.split(", ")}></Tags>
	</span>
	<br>
<i>{selected_class.document__title}</i>
{/if}
</section>
</body>

<style>
	body {
		display: flex;
		flex-grow: 1;
	}
	section {
		padding: 10px;
		border: 1px solid black;
		flex-grow: 1;
		width: 500px;
	}
	section > select{
		width: 100%;
	}
	section > h2 {
		text-align: center;
	}	
</style>