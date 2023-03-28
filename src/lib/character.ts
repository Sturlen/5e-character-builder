import races from './API/races.json'
import BackgroundsResponse from '$lib/API/backgrounds.json'
import { NullBackground, type BaseBackground } from '$lib/backgrounds'

import { RaceSchema } from './parsers/races'
import {
    type AbilityScoreArray,
    type Character,
    sumAbilityScores,
    BaseAttributes
} from './AbilityScores'

import { createAS } from './AbilityScores'
import { BaseBackgroundSchema } from './parsers/backgrounds'
import {
    type Race,
    type BaseRace,
    type BaseSubrace,
    tailorSubrace,
    tailorRace,
    Human_Standard,
    Dwarf_Hill,
    HumanBase
} from '../races'

export const backgrounds = BackgroundsResponse.results.map((b) => BaseBackgroundSchema.parse(b))
console.log(backgrounds)

export function CreateCharacter({
    race,
    background
}: {
    race: Race
    background: BaseBackground
}): Character {
    const as = sumAbilityScores(BaseAttributes, createAS(race.asi))
    const languages = [...new Set([...race.base.languages, ...background.langProfs])] // find a better way to make unique
    return { as, race, background, languages }
}

export function createBasicCharacter({
    baseRace,
    baseSubrace,
    BaseBackground
}: {
    baseRace: BaseRace
    baseSubrace: BaseSubrace | undefined
    BaseBackground: BaseBackground | undefined
}) {
    const subrace = baseSubrace ? tailorSubrace(baseSubrace) : undefined
    const race = tailorRace(baseRace, subrace)
    const background = BaseBackground ?? NullBackground

    return CreateCharacter({ race, background })
}

const TestHuman = CreateCharacter({
    race: Human_Standard,
    background: NullBackground
})

const TestHillDwarf = CreateCharacter({
    race: Dwarf_Hill,
    background: NullBackground
})

console.log('Hill Dwarf Wisdom score is 11', TestHillDwarf.as.Wisdom === 11)

const response = races

const results = response.results.map((raw) => RaceSchema.parse(raw))

export const parsed_races: BaseRace[] = results

const parsedBaseDwarf = parsed_races.find((race) => race.name === 'Dwarf') ?? HumanBase
const parsedHillDw = parsedBaseDwarf.subraces[0]

const hill_dwarf_sub = tailorSubrace(parsedHillDw)
const hill_dwarf_race = tailorRace(parsedBaseDwarf, hill_dwarf_sub)

const parsed_dwarf = CreateCharacter({
    race: hill_dwarf_race ?? Human_Standard,
    background: NullBackground
})

export { createAS, parsed_dwarf, Human_Standard, TestHuman }
