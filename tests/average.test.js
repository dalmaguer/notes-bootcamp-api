const { average } = require('../utils/for_testing')

// Test unitarios con jest

describe('average', () => {
  test('of many numbers', () => {
    const result = average([1, 2, 3, 4, 5, 6, 7])
    expect(result).toBe(4)
  })
  test('of an empty array is 0', () => {
    const result = average([])
    expect(result).toBe(0)
  })
  test('of one element is the element itself', () => {
    expect(average([5])).toBe(5)
  })
  test('of a number is the number', () => {
    expect(average(12)).toBe(12)
  })
  test('of a string is undefined', () => {
    expect(average('dayrel')).toBeUndefined()
  })
  test('of undefined is undefined', () => {
    expect(average()).toBeUndefined()
  })
})
