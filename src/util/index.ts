import { Character } from '../types'
import { apiCharacters } from '../api'

export const addSpeciesNameToCharacter = async (
  character: Character
): Promise<Character> => {
  const { species } = character

  const speciesName =
    species.length === 0
      ? 'Unknown'
      : await apiCharacters.getSpeciesName(species[0])

  return {
    ...character,
    speciesName: `${speciesName} species`,
  }
}
