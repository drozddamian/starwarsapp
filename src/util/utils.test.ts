import { addSpeciesNameToCharacter } from './index'

const fakeEmptySpeciesCharacter = {
  name: 'fake',
  species: [],
  url: ''
}

const fakeCharacter = {
  ...fakeEmptySpeciesCharacter,
  species: ['https://swapi.dev/api/species/2/']
}

describe('Function that sets species name', () => {
  it('Should have unknown species name when species is []', async () => {
    const updatedCharacter = await addSpeciesNameToCharacter(fakeEmptySpeciesCharacter)
    expect(updatedCharacter.speciesName).toBe('Unknown species')
  })

  it('Should have species name set when species is [url]', async () => {
    const updatedCharacter = await addSpeciesNameToCharacter(fakeCharacter)
    expect(typeof updatedCharacter.speciesName).toBe('string')
    expect(updatedCharacter.speciesName).not.toBe('Unknown species')
  })
})

