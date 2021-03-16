const getWithMaxIndex = (arr) => {
  if (Array.isArray(arr) && arr.length) {
    return arr.reduce((acc, current) => {
      return Number(current.id) > Number(acc.id) ? current : acc
    })
  }
  return 0
}

const getNextId = (arr) => {
  const last = getWithMaxIndex(arr)
  return Number(last.id) + 1
}

module.exports = { getNextId }