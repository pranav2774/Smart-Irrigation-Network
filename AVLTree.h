#ifndef AVLTREE_H
#define AVLTREE_H

#include <iostream>
#include <algorithm> // For max function
#include "Sensor.h"

using namespace std;

// AVL Tree Node
struct Node {
    Sensor sensor;
    Node* left;
    Node* right;
    int height;

    //Default constructor
    Node(Sensor s) : sensor(s), left(nullptr), right(nullptr), height(1) {}
};

// AVL Tree Class for Sensor Registry
class AVLTree {
private:
    Node* root;

    // Helper to get height of a node
    int height(Node* N) {    //N is the node pointer
        if (N == nullptr)
            return 0;
        return N->height;
    }

    // Helper to get balance factor of a node
    int getBalance(Node* N) {
        if (N == nullptr)
            return 0;
        return height(N->left) - height(N->right);
    }

    // Right Rotate utility
    Node* rightRotate(Node* y) {
        Node* x = y->left;
        Node* T2 = x->right;

        // Perform rotation
        x->right = y;
        y->left = T2;

        // Update heights
        y->height = max(height(y->left), height(y->right)) + 1;
        x->height = max(height(x->left), height(x->right)) + 1;

        // Return new root
        return x;
    }

    // Left Rotate utility
    Node* leftRotate(Node* x) {
        Node* y = x->right;
        Node* T2 = y->left;

        // Perform rotation
        y->left = x;
        x->right = T2;

        // Update heights
        x->height = max(height(x->left), height(x->right)) + 1;
        y->height = max(height(y->left), height(y->right)) + 1;

        // Return new root
        return y;
    }

    // Recursive Insert function
    Node* insert(Node* node, Sensor sensor) {
        // 1. Perform the normal BST insertion
        if (node == nullptr)
            return new Node(sensor);

        if (sensor.id < node->sensor.id)
            node->left = insert(node->left, sensor);
        else if (sensor.id > node->sensor.id)
            node->right = insert(node->right, sensor);
        else // Duplicate IDs are not allowed in this system
            return node;

        // 2. Update height of this ancestor node
        node->height = 1 + max(height(node->left), height(node->right));

        // 3. Get the balance factor of this ancestor node to check whether
        // this node became unbalanced
        int balance = getBalance(node);

        // If this node becomes unbalanced, then there are 4 cases

        // Left Left Case
        if (balance > 1 && sensor.id < node->left->sensor.id)
            return rightRotate(node);

        // Right Right Case
        if (balance < -1 && sensor.id > node->right->sensor.id)
            return leftRotate(node);

        // Left Right Case
        if (balance > 1 && sensor.id > node->left->sensor.id) {
            node->left = leftRotate(node->left);
            return rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && sensor.id < node->right->sensor.id) {
            node->right = rightRotate(node->right);
            return leftRotate(node);
        }

        /* return the (unchanged) node pointer */
        return node;
    }

    // Recursive search function
    Node* search(Node* root, int id) {
        if (root == nullptr || root->sensor.id == id)
            return root;

        if (root->sensor.id < id)
            return search(root->right, id);

        return search(root->left, id);
    }

    // Recursive In-order traversal
    void inOrder(Node* root) {
        if (root != nullptr) {
            inOrder(root->left);
            root->sensor.print();
            inOrder(root->right);
        }
    }

public:
    AVLTree() : root(nullptr) {}   //Constructor to initialize the AVL tree with an empty root

    // Public insert
    void insert(Sensor sensor) {
        root = insert(root, sensor);
    }

    // Public search
    Sensor* search(int id) {
        Node* res = search(root, id);
        if (res != nullptr)
            return &res->sensor;
        else
            return nullptr;
    }

    // Public display
    void displayRegistry() {
        cout << "\n--- Sensor Registry (Sorted by ID) ---\n";
        inOrder(root);
        cout << "--------------------------------------\n";
    }
};

#endif // AVLTREE_H
