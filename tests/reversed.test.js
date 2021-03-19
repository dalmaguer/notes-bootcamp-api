const { reversed } = require('../utils/for_testing')

// Test unitarios con jest

test('reversed of dayrel is leryad', () => {
  const result = reversed('dayrel')
  expect(result).toBe('leryad')
})

test('reversed of an empty string is an empty string', () => {
  const result = reversed('')
  expect(result).toBe('')
})

test('reversed of undefine is undefine', () => {
  const result = reversed()
  expect(result).toBeUndefined()
})
