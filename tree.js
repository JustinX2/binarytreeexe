class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */
  minDepth() {
    if (!this.root) return 0;

    const queue = [[this.root, 1]];
    
    while (queue.length) {
      const [node, depth] = queue.shift();
      
      if (!node.left && !node.right) return depth;
      
      if (node.left) queue.push([node.left, depth + 1]);
      if (node.right) queue.push([node.right, depth + 1]);
    }
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */
  maxDepth() {
    if (!this.root) return 0;

    function dfs(node) {
      if (!node) return 0;
      return 1 + Math.max(dfs(node.left), dfs(node.right));
    }

    return dfs(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */
  maxSum() {
    let maxSum = -Infinity;

    function dfs(node) {
      if (!node) return 0;

      const leftSum = Math.max(0, dfs(node.left));
      const rightSum = Math.max(0, dfs(node.right));

      maxSum = Math.max(maxSum, node.val + leftSum + rightSum);

      return node.val + Math.max(leftSum, rightSum);
    }

    dfs(this.root);
    return maxSum === -Infinity ? 0 : maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */
  nextLarger(lowerBound) {
    if (!this.root) return null;

    let result = null;
    const stack = [this.root];

    while (stack.length) {
      const node = stack.pop();

      if (node.val > lowerBound) {
        if (result === null || node.val < result) {
          result = node.val;
        }
      }

      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }

    return result;
  }
}