

function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

// [8, 1, 3, 9, 9, 9, null, 9, 5, 6, 8]
const listToTree = (list) => {
  if(!list.length) return null

  const nodeList = list.map(i=> {
    if(!i) return i
    return new TreeNode(i)
  })

  const queue = [nodeList[0]]
  let index = 1

  while (queue.length) {
    const node = queue.shift()
    if(!node) continue

    node.left = nodeList[index] || null
    queue.push(node.left)
    index++

    node.right = nodeList[index] || null
    queue.push(node.right)
    index++
  }

  return nodeList[0]
}

console.log(listToTree([8, 1, 3, 9, 9, 9, null, 9, 5, 6, 8]))
