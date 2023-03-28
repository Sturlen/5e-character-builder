import { z, type TypeOf } from 'zod'

import {
    createAS,
    type AbilityScoreArray,
    type AbilityScoreOption,
    type Option
} from '../AbilityScores'
import type { BaseSubrace, BaseRace } from '../../races'

export const ASISchema = z.array(
    z.object({
        attributes: z
            .array(z.string())
            .length(1)
            .transform((attrs) => attrs[0]),
        value: z.number().int()
    })
)

export type ASI = TypeOf<typeof ASISchema>

function parseASI(asi: ASI): { abilites: AbilityScoreArray; options: Option[] } {
    const abilites = createAS({
        Strength: asi.find((item) => item.attributes === 'Strength')?.value,
        Dexterity: asi.find((item) => item.attributes === 'Dexterity')?.value,
        Constitution: asi.find((item) => item.attributes === 'Constitution')?.value,
        Intelligence: asi.find((item) => item.attributes === 'Intelligence')?.value,
        Wisdom: asi.find((item) => item.attributes === 'Wisdom')?.value,
        Charisma: asi.find((item) => item.attributes === 'Charisma')?.value
    })
    const options: AbilityScoreOption[] = asi
        .filter((item) => item.attributes === 'Other')
        .map((item) => {
            return { type: 'asi', amount: item.value }
        })
    return { abilites, options }
}

export const SubraceSchema = z
    .object({
        name: z.string(),
        asi: ASISchema
    })
    .transform(({ name, asi }): BaseSubrace => {
        const { abilites, options } = parseASI(asi)
        return { name, asi: abilites, options }
    })

export const RaceSchema = z
    .object({
        name: z.string(),
        asi: ASISchema,
        subraces: z.array(SubraceSchema),
        _languages: z.array(z.string())
    })
    .transform(({ name, asi, subraces, _languages }): BaseRace => {
        const { abilites, options } = parseASI(asi)
        return { name, asi: abilites, options, subraces, languages: _languages }
    })

export const APIResponseSchema = z.object({
    count: z.number().int(),
    next: z.string().url().nullable().optional(),
    prev: z.string().url().nullable().optional(),
    results: z.array(z.unknown())
})

export type APIResponse = TypeOf<typeof APIResponseSchema>
