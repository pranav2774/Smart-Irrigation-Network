# AVLTree Module (AVLTree.h)

## Overview

The `AVLTree` module implements a self-balancing binary search tree (AVL tree) for managing `Sensor` records. This tree keeps data sorted by `Sensor.id` and guarantees O(log n) worst-case lookup, insertion, and balance operations.

### Included Files
- `AVLTree.h` (module implementation)
- `Sensor.h` (data structure for a sensor record)

## Data structures

### `struct Node`
- `Sensor sensor`: sensor detail stored in the node.
- `Node* left`, `Node* right`: pointers to left and right child.
- `int height`: height of the node in the tree (leaf nodes have height 1).

### `class AVLTree`
- `Node* root`: pointer to tree root.

## Core helper functions

### `height(Node* N)`
Returns 0 for null nodes, otherwise node's height.

### `getBalance(Node* N)`
Balance factor = `height(N->left) - height(N->right)`.
- If >1 or <-1, tree is unbalanced.

### `rightRotate(Node* y)` and `leftRotate(Node* x)`
Tree rotations that restore AVL balance after insertion:
- rightRotate handles left-left case.
- leftRotate handles right-right case.

Both update heights for involved nodes.

## Insert operation

### `Node* insert(Node* node, Sensor sensor)` (recursive)
1. Insert new node by BST property using `sensor.id`.
2. Update current node height.
3. Check balance factor.
4. Apply one of 4 cases:
- Left-Left => `rightRotate(node)`
- Right-Right => `leftRotate(node)`
- Left-Right => `node->left = leftRotate(node->left); rightRotate(node)`
- Right-Left => `node->right = rightRotate(node->right); leftRotate(node)`

### `void insert(Sensor sensor)` (public)
Wrapper that updates `root`.

## Search operation

### `Node* search(Node* root, int id)` (recursive)
- returns pointer to node with matching id or nullptr.
- traverses left if id < root id, right if id > root id.

### `Sensor* search(int id)` (public)
- returns pointer to `Sensor` on found node, otherwise nullptr.

## Traversal

### `void inOrder(Node* root)`
In-order traversal prints sensors in sorted order by ID using `sensor.print()`.

### `void displayRegistry()` (public)
Header + inOrder traversal + footer.

## Complexity
- Insertion: O(log n) amortized with rotations.
- Search: O(log n) average and worst-case (AVL guarantee).
- Space: O(n) nodes.

## How to use
- Include `Sensor.h` and `AVLTree.h`.
- Instantiate `AVLTree registry;`.
- Add sensors: `registry.insert(Sensor(id, x, y, moisture));`.
- Search: `Sensor* s = registry.search(id);`.
- Display: `registry.displayRegistry();`.
