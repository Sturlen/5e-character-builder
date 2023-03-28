import { createAS, sumAbilityScores, type AbilityScoreArray, type Option } from '$lib/AbilityScores'

export type BaseRace = {
    name: string
    asi: AbilityScoreArray
    options: Option[]
    subraces: BaseSubrace[]
    languages: string[]
}

export type Race = {
    base: BaseRace
    asi: AbilityScoreArray
    subrace?: Subrace
}

export type BaseSubrace = {
    name: string
    asi: AbilityScoreArray
    options: Option[]
}

export type Subrace = {
    base: BaseSubrace
    asi: AbilityScoreArray
}

export function tailorSubrace(base: BaseSubrace): Subrace {
    return { base, asi: createAS(base.asi) }
}

export function tailorRace(base: BaseRace, subrace?: Subrace | undefined): Race {
    const base_score = createAS(base.asi)
    const sub_score = createAS(subrace?.asi)
    return { base, asi: sumAbilityScores(base_score, sub_score), subrace }
}

const HillDwarfBase: BaseSubrace = {
    name: 'Hill Dwarf',
    asi: createAS({
        Wisdom: 1
    }),
    options: []
}

export const DwarfBase: BaseRace = {
    name: 'Dwarf',
    asi: createAS({ Constitution: 2 }),
    options: [],
    subraces: [HillDwarfBase],
    languages: ['Common', 'Dwarvish']
}

export const HumanBase: BaseRace = {
    name: 'Human',
    asi: {
        Strength: 1,
        Dexterity: 1,
        Constitution: 1,
        Intelligence: 1,
        Wisdom: 1,
        Charisma: 1
    },
    options: [],
    subraces: [],
    languages: ['Common']
}

export const HillDwarf = tailorSubrace(HillDwarfBase)

export const Dwarf_Hill = tailorRace(DwarfBase, HillDwarf)

export const Human_Standard = tailorRace(HumanBase)
