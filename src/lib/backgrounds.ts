export type BaseBackground = {
    name: string
    skillProfs: string[]
    toolProfs: string[]
    langProfs: string[]
}

export const NullBackground: BaseBackground = {
    name: 'None',
    langProfs: [],
    skillProfs: [],
    toolProfs: []
}
