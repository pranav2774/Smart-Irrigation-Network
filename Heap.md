# Heap Module (Heap.h)

## Overview

The `Heap` module defines a max-heap priority queue for irrigation scheduling based on soil dryness. It stores `Sensor` objects and prioritizes sensors with lower moisture values.

### Included Files
- `Heap.h` (max-heap implementation)
- `Sensor.h` (sensor data structure)

## Data structures

### `class MaxHeap`
- `vector<Sensor> heap`: array-backed binary heap.

Helper index functions:
- `parent(i)`: `(i - 1) / 2`
- `leftChild(i)`: `2*i + 1`
- `rightChild(i)`: `2*i + 2`

## Priority calculation

### `getPriority(const Sensor& s)`
Priority = `100 - s.moisture`.
- Higher value means drier soil and higher irrigation priority.

## Heap operations

### `void heapifyUp(int i)`
Bubble a newly inserted node up while parent priority < current.

### `void heapifyDown(int i)`
For root replacement after pop: swap with the child having higher priority and continue until heap property satisfied.

### `bool isEmpty()`
Returns `heap.empty()`.

### `void push(Sensor s)`
Append sensor, then `heapifyUp`.

### `Sensor pop()`
1. If empty, throws runtime error.
2. Save root value.
3. Replace root with last item and pop back.
4. `heapifyDown(0)`.
5. Return saved root sensor.

### `void displayHeap()`
Prints every element in array order and its priority.

## Complexity
- `push`: O(log n)
- `pop`: O(log n)
- `isEmpty` / display: O(1) / O(n)

## How to use
- Instantiate `MaxHeap irrigationQueue;`.
- Add sensors: `irrigationQueue.push(sensor);`.
- Show queue: `irrigationQueue.displayHeap();`.
- Serve highest priority sensor: `Sensor top = irrigationQueue.pop();`.

## Usage in project
- `main.cpp` reads sensors and pushes each into `irrigationQueue`.
- `showIrrigationSchedule()` optionally loops pop() to simulate irrigation order.
