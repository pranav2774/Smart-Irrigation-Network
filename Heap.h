#ifndef HEAP_H
#define HEAP_H

#include <iostream>
#include <vector>
#include "Sensor.h"

using namespace std;

// Max-Heap Class for Irrigation Priority
class MaxHeap {
private:
    vector<Sensor> heap;

    // Helper: Parent index
    int parent(int i) { return (i - 1) / 2; }

    // Helper: Left child index
    int leftChild(int i) { return (2 * i + 1); }

    // Helper: Right child index
    int rightChild(int i) { return (2 * i + 2); }

    // Calculate priority: Higher priority = Drier soil
    // Priority = 100 - Moisture Level
    int getPriority(const Sensor& s) {
        return 100 - s.moisture;
    }

    // Heapify Up (for insertion)
    void heapifyUp(int i) {
        while (i > 0 && getPriority(heap[parent(i)]) < getPriority(heap[i])) {
            swap(heap[parent(i)], heap[i]);
            i = parent(i);
        }
    }

    // Heapify Down (for extraction)
    void heapifyDown(int i) {
        int maxIndex = i;
        int l = leftChild(i);
        int r = rightChild(i);

        if (l < heap.size() && getPriority(heap[l]) > getPriority(heap[maxIndex]))
            maxIndex = l;

        if (r < heap.size() && getPriority(heap[r]) > getPriority(heap[maxIndex]))
            maxIndex = r;

        if (i != maxIndex) {
            swap(heap[i], heap[maxIndex]);
            heapifyDown(maxIndex);
        }
    }

public:
    // Check if heap is empty
    bool isEmpty() {
        return heap.empty();
    }

    // Insert a new sensor
    void push(Sensor s) {
        heap.push_back(s);
        heapifyUp(heap.size() - 1);
    }

    // Extract the sensor with the highest priority (driest)
    Sensor pop() {
        if (isEmpty()) {
            throw runtime_error("Heap is empty");
        }

        Sensor root = heap[0];
        heap[0] = heap.back();
        heap.pop_back();
        heapifyDown(0);

        return root;
    }

    // Display the current heap status (Level Order)
    void displayHeap() {
        cout << "\n--- Irrigation Priority Queue (Max-Heap) ---\n";
        if (isEmpty()) {
            cout << "Priority Queue is empty.\n";
            return;
        }
        
        cout << "Sensors queued for irrigation (Priority: Dryness):\n";
        for (const auto& s : heap) {
            cout << "[ID: " << s.id << ", Moisture: " << s.moisture 
                 << "%, Priority: " << getPriority(s) << "] ";
        }
        cout << "\n--------------------------------------------\n";
    }
};

#endif // HEAP_H
