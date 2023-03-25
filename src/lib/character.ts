import races from './API/races.json'
import { APIResponseSchema, RaceSchema } from './parsers/races'
import type {
    AbilityScoreArray,
    Character,
    BaseRace,
    Subrace,
    Race,
    BaseSubrace
} from './AbilityScores'

import { createAS } from './AbilityScores'

const BaseAttributes: AbilityScoreArray = {
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10
}

const HillDwarfBase: BaseSubrace = {
    name: 'Hill Dwarf',
    asi: {
        Wisdom: 1
    }
}

const DwarfBase: BaseRace = {
    name: 'Dwarf',
    asi: createAS({ Constitution: 2 }),
    subraces: [HillDwarfBase]
}

const HumanBase: BaseRace = {
    name: 'Human',
    asi: {
        Strength: 1,
        Dexterity: 1,
        Constitution: 1,
        Intelligence: 1,
        Wisdom: 1,
        Charisma: 1
    },
    subraces: []
}

function sumAbilityScores(l: AbilityScoreArray, r: AbilityScoreArray): AbilityScoreArray {
    return {
        Strength: l.Strength + r.Strength,
        Dexterity: l.Dexterity + r.Dexterity,
        Constitution: l.Constitution + r.Constitution,
        Intelligence: l.Intelligence + r.Intelligence,
        Wisdom: l.Wisdom + r.Wisdom,
        Charisma: l.Charisma + r.Charisma
    }
}

function tailorSubrace(base: BaseSubrace): Subrace {
    return { base, asi: createAS(base.asi) }
}

function tailorRace(base: BaseRace, subrace?: Subrace | undefined): Race {
    const base_score = createAS(base.asi)
    const sub_score = createAS(subrace?.asi)
    return { base, asi: sumAbilityScores(base_score, sub_score), subrace }
}

const HillDwarf = tailorSubrace(HillDwarfBase)

const Dwarf_Hill = tailorRace(DwarfBase, HillDwarf)

const Human_Standard = tailorRace(HumanBase)

function CreateCharacter({ race }: { race: Race }): Character {
    const as = sumAbilityScores(BaseAttributes, createAS(race.asi))
    return { as, race }
}

// From SRD 5.1
function abilityScoreModifier(AbilityScore: number) {
    return Math.floor((AbilityScore - 10) / 2)
}

const TestHuman = CreateCharacter({
    race: Human_Standard
})

const TestHillDwarf = CreateCharacter({
    race: Dwarf_Hill
})

console.log('Hill Dwarf Wisdom score is 11', TestHillDwarf.as.Wisdom === 11)

const response = races

const results = response.results.map((raw) => RaceSchema.parse(raw))

const parsed_races: BaseRace[] = results.map((race) => {
    return { name: race.name, asi: createAS(race.asi), subraces: race.subraces }
})

const parsedBaseDwarf = parsed_races.find((race) => race.name === 'Dwarf') ?? HumanBase
const parsedHillDw = parsedBaseDwarf.subraces[0]

const hill_dwarf_sub = tailorSubrace(parsedHillDw)
const hill_dwarf_race = tailorRace(parsedBaseDwarf, hill_dwarf_sub)

const parsed_dwarf = CreateCharacter({
    race: hill_dwarf_race ?? Human_Standard
})

console.log('Hill Dwarf Wisdom score is 11', parsed_dwarf.as.Wisdom === 11, parsed_dwarf)

export { createAS, abilityScoreModifier, parsed_dwarf, Human_Standard, TestHuman }
