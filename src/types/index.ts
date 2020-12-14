export type Character = {
  name: string
  species: string[]
  url: string
  speciesName?: string
}

export type Film = {
  title: string
  release_date: string
  director: string
}

export type CharactersApiPayload = {
  characters: Character[]
  count: number
}

export type CharacterSpecificationPayload = {
  name: string
  filmUrls: string[]
}
