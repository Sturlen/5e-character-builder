import type { BaseBackground } from './backgrounds'

export type AbilityScore = {
    name: string
    desc: string
    icon_src: string
}

// sum up base + ablity score increases

const Strength: AbilityScore = {
    name: 'Strength',
    desc: 'Strength measures bodily power, athletic training, and the extent to which you can exert raw physical force.',
    icon_src: 'https://game-icons.net/icons/ffffff/000000/1x1/delapouite/biceps.svg'
}
const Dexterity: AbilityScore = {
    name: 'Dexterity',
    desc: 'Dexterity measures agility, reflexes, and balance.',
    icon_src: 'https://game-icons.net/icons/ffffff/000000/1x1/delapouite/body-balance.svg'
}
const Constitution: AbilityScore = {
    name: 'Constitution',
    desc: 'Constitution measures health, stamina, and vital force.',
    icon_src: 'https://game-icons.net/icons/ffffff/000000/1x1/delapouite/chest-armor.svg'
}
const Intelligence: AbilityScore = {
    name: 'Intelligence',
    desc: 'Intelligence measures mental acuity, accuracy of recall, and the ability to reason.',
    icon_src: 'https://game-icons.net/icons/ffffff/000000/1x1/delapouite/smart.svg'
}
const Wisdom: AbilityScore = {
    name: 'Wisdom',
    desc: 'Wisdom reflects how attuned you are to the world around you and represents perceptiveness and intuition.',
    icon_src: 'https://game-icons.net/icons/ffffff/000000/1x1/lorc/owl.svg'
}
const Charisma: AbilityScore = {
    name: 'Charisma',
    desc: 'Charisma measures your ability to interact effectively with others.',
    icon_src: 'https://game-icons.net/icons/ffffff/000000/1x1/lorc/drama-masks.svg'
}

const AbilityScoreInfos = {
    Strength,
    Dexterity,
    Constitution,
    Intelligence,
    Wisdom,
    Charisma
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
}

export type BaseRace = {
    name: string
    asi: OptionalAbilityScoreArray
    options: Option[]
    subraces: BaseSubrace[]
}

/** Character creation choice */
export type Option = AbilityScoreOption

export type AbilityScoreOption = {
    type: 'asi'
    amount: number
}

export type Race = {
    base: BaseRace
    asi: OptionalAbilityScoreArray
    subrace?: Subrace
}

export type BaseSubrace = {
    name: string
    asi: OptionalAbilityScoreArray
    options: Option[]
}

export type Subrace = {
    base: BaseSubrace
    asi: OptionalAbilityScoreArray
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

// Base entiites have options available and with these you can create an actual real instance
