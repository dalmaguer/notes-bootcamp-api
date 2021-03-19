const { palindrome } = require('../utils/for_testing')

// Test unitarios con jest

test('palindrome of dayrel', () => {
  const result = palindrome('dayrel')
  expect(result).toBe('leryad')
})

test('palindrome of empty string', () => {
  const result = palindrome('')
  expect(result).toBe('')
})

test('palindrome of undefine', () => {
  const result = palindrome()
  expect(result).toBeUndefined()
})
