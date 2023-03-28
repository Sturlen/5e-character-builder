import type { Race } from '../races'
import type { BaseBackground } from './backgrounds'

export type AbilityScore = {
    name: string
    desc: string
    icon_src: string
}

export type AbilityScoreArray = {
    Strength: number
    Dexterity: number
    Constitution: number
    Intelligence: number
    Wisdom: number
    Charisma: number
}

export type OptionalAbilityScoreArray = {
    Strength?: number
    Dexterity?: number
    Constitution?: number
    Intelligence?: number
    Wisdom?: number
    Charisma?: number
}

export enum abilitiesOptionsStrings {
    Strength = 'Strength',
    Dexterity = 'Dexterity',
    Constitution = 'Constitution',
    Intelligence = 'Intelligence',
    Wisdom = 'Wisdom',
    Charisma = 'Charisma',
    Other = 'Other'
}

export type AbilityName =
    | 'Strength'
    | 'Dexterity'
    | 'Constitution'
    | 'Intelligence'
    | 'Wisdom'
    | 'Charisma'

export type Character = {
    // personal_details
    as: AbilityScoreArray
    race: Race
    background: BaseBackground
    languages: string[]
}

/** Character creation choice */
export type Option = AbilityScoreOption

export type AbilityScoreOption = {
    type: 'asi'
    amount: number
}

export function createAS(as: OptionalAbilityScoreArray = {}): AbilityScoreArray {
    return {
        Strength: as.Strength || 0,
        Dexterity: as.Dexterity || 0,
        Constitution: as.Constitution || 0,
        Intelligence: as.Intelligence || 0,
        Wisdom: as.Wisdom || 0,
        Charisma: as.Charisma || 0
    }
}

export function sumAbilityScores(l: AbilityScoreArray, r: AbilityScoreArray): AbilityScoreArray {
    return {
        Strength: l.Strength + r.Strength,
        Dexterity: l.Dexterity + r.Dexterity,
        Constitution: l.Constitution + r.Constitution,
        Intelligence: l.Intelligence + r.Intelligence,
        Wisdom: l.Wisdom + r.Wisdom,
        Charisma: l.Charisma + r.Charisma
    }
}

// From SRD 5.1
export function abilityScoreModifier(AbilityScore: number) {
    return Math.floor((AbilityScore - 10) / 2)
}

export const BaseAttributes: AbilityScoreArray = {
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10
}

// Base entiites have options available and with these you can create an actual real instance
