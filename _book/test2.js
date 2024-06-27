/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
var makesquare = function (matchsticks) {
  const sum = matchsticks.reduce((a, b) => a + b)
  const side = sum / 4

  if (!Number.isInteger(side)) return false

  matchsticks = matchsticks.sort((a, b) => b - a)

  const bucket = [0, 0, 0, 0]

  function dfs(i, depth) {
    bucket[i] = bucket[i] + matchsticks[depth]

    if (bucket[i] > side) return false

    if (depth === matchsticks.length - 1) {
      if (bucket.every((a) => a === side)) return true
      return false
    }

    for (let j = 0; j < bucket.length; j++) {
      const temp = bucket[j]
      if (dfs(j, depth + 1)) return true
      bucket[j] = temp
    }

    return false
  }

  return dfs(0, 0, '')
}

// matchsticks = [1,1,2,2,2]
// matchsticks = [3,3,3,3,4]

console.log(makesquare([3, 9, 2, 2, 2, 9, 10, 8, 3, 9, 10, 10, 1, 9, 9]))
// console.log(makesquare([1, 1, 1, 1]))
