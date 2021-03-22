const { reversed } = require('../utils/for_testing')

// Test unitarios con jest
describe('reversed', () => {
  test('of dayrel is leryad', () => {
    const result = reversed('dayrel')
    expect(result).toBe('leryad')
  })

  test('of an empty string is an empty string', () => {
    const result = reversed('')
    expect(result).toBe('')
  })

  test('of undefine is undefine', () => {
    const result = reversed()
    expect(result).toBeUndefined()
  })
})
