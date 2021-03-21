const { reversed } = require('../utils/for_testing')

// Test unitarios con jest

test.skip('reversed of dayrel is leryad', () => {
  const result = reversed('dayrel')
  expect(result).toBe('leryad')
})

test.skip('reversed of an empty string is an empty string', () => {
  const result = reversed('')
  expect(result).toBe('')
})

test.skip('reversed of undefine is undefine', () => {
  const result = reversed()
  expect(result).toBeUndefined()
})
