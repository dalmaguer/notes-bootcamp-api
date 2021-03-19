const palindrome = (str) => {
  if (typeof str === 'undefined') return

  return str
    .split('')
    .reverse()
    .join('')
}

const average = arr => {
  if (typeof arr === 'undefined') return
  if (!Array.isArray(arr)) {
    return isNaN(arr)
      ? undefined
      : arr
  }
  if (arr.length === 0) return 0

  let sum = 0
  arr.forEach(element => {
    sum += element
  })
  return sum / arr.length
}

module.exports = {
  palindrome,
  average
}
