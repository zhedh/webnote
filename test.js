/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  if(!root) return ''
  const result = []

  const queue = [root]

  while (queue.length) {
    const node = queue.shift()
    let l = 0,
      r = 0

    if (node.left) {
      queue.push(node.left)
      l = 1
    }

    if (node.right) {
      queue.push(node.right)
      r = 1
    }

    const str = [node.val, l, r].join('=')
    result.push(str)
  }

  // console.log(result)

  return result.join(',')

  const preorder = []
  const inorder = []

  function dfs(node) {
    if (!node) return

    preorder.push(node.val)
    dfs(node.left)
    dfs(node.right)
  }

  function dfs2(node) {
    if (!node) return

    dfs2(node.left)
    inorder.push(node.val)
    dfs2(node.right)
  }

  dfs(root)
  dfs2(root)

  const str = JSON.stringify({ preorder, inorder })
  console.log(str)

  return str
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  if(!data) return null
  const list = data.split(',').map((i) => {
    const [val, l, r] = i.split('=')
    const node = new TreeNode(+val)
    return {
      node,
      l: +l,
      r: +r,
    }
  })

  if (!list.length) return null

  const queue = [list[0]]
  let index = 1

  while (queue.length) {
    const {node, l, r} = queue.shift()

    if (l === 1) {
      queue.push(list[index])
      node.left = list[index].node
      index++
    }
    if (r === 1) {
      queue.push(list[index])
      node.right = list[index].node
      index++
    }
  }

  // console.log(list[0].node)

  return list[0].node

  const { inorder, preorder } = JSON.parse(data)
  const root = getTree(inorder, preorder)

  console.log(root)

  return root
}

function getTree(inorder, preorder) {
  if (!inorder.length) return null

  const node = new TreeNode(preorder[0])
  const index = inorder.findIndex((v) => v === preorder[0])

  node.left = getTree(inorder.slice(0, index), preorder.slice(1, index + 1))
  node.right = getTree(inorder.slice(index + 1), preorder.slice(index + 1))

  return node
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

// [3,2,4,3]

const node = null
// const node = new TreeNode(3)
// node.left = new TreeNode(2)
// node.right = new TreeNode(4)
// node.left.left = new TreeNode(3)

deserialize(serialize(node))
