export type Character = {
  name: string
  species: string[]
  url: string
}

export type Film = {
  title: string
  release_date: string
  director: string
}

export type CharactersApiPayload = {
  results: Character[]
  count: number
}

export type CharacterSpecificationPayload = {
  name: string
  filmUrls: string[]
}
