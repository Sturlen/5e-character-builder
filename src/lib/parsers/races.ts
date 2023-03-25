import { z, type TypeOf } from 'zod'

import type { AbilityScoreAdvancements, BaseRace, BaseSubrace } from '../AbilityScores'

export const ASISchema = z
    .array(
        z.object({
            attributes: z.array(z.string()).nonempty(),
            value: z.number().int()
        })
    )
    .transform((asi): AbilityScoreAdvancements => {
        function getValue(ability: string) {
            return asi.find((asi_element) => asi_element.attributes[0] === ability)?.value
        }
        return {
            Strength: getValue('Strength'),
            Dexterity: getValue('Dexterity'),
            Constitution: getValue('Constitution'),
            Intelligence: getValue('Intelligence'),
            Wisdom: getValue('Wisdom'),
            Charisma: getValue('Charisma'),
            Options: asi.filter((element) => element.attributes[0] === 'Option').map((e) => e.value)
        }
    })

export const SubraceSchema = z
    .object({
        name: z.string(),
        asi: ASISchema
    })
    .transform(({ name, asi }): BaseSubrace => {
        return { name, asi }
    })

export const RaceSchema = z
    .object({
        name: z.string(),
        asi: ASISchema,
        subraces: z.array(SubraceSchema)
    })
    .transform(({ name, asi, subraces }): BaseRace => {
        return { name, asi, subraces }
    })

export const APIResponseSchema = z.object({
    count: z.number().int(),
    next: z.string().url().nullable().optional(),
    prev: z.string().url().nullable().optional(),
    results: z.array(z.unknown())
})

export type APIResponse = TypeOf<typeof APIResponseSchema>
