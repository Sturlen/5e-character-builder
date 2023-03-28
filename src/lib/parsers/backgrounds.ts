import type { BaseBackground } from '$lib/backgrounds'
import { z } from 'zod'

function trim(str: string): string {
    return str.trim()
}

function removeNumber(str: string) {
    return str.replace('one', '')
}

function splitProfs(profStr: string | undefined | null) {
    return profStr
        ? profStr
              .split(',')
              .flatMap((e) => e.split(' and '))
              .map(removeNumber)
              .map(trim)
        : []
}

export const BaseBackgroundSchema = z
    .object({
        name: z.string(),
        skill_proficiencies: z.string().nullish().transform(splitProfs),
        tool_proficiencies: z.string().nullish().transform(splitProfs),
        _languages: z.array(z.string())
    })
    .transform(({ name, skill_proficiencies, tool_proficiencies, _languages }): BaseBackground => {
        return {
            name,
            skillProfs: skill_proficiencies,
            toolProfs: tool_proficiencies,
            langProfs: _languages
        }
    })
