# Graph Module (Graph.h)

## Overview

The `Graph` module builds a weighted undirected graph and computes a minimum spanning tree (MST) using Kruskal's algorithm. It is used for pipe-network optimization among sensors in the irrigation system.

### Included Files
- `Graph.h` (core graph + MST logic)
- `Sensor.h` (for sensor locations and distance calculation)

## Data structures

### `struct Edge`
- `int src`, `dest`: vertex indices in the graph (sensor list index).
- `double weight`: edge weight (distance between sensors).

### `struct DSU` (Disjoint Set Union / Union-Find)
- `vector<int> parent`: parent pointer for each set.
- `vector<int> rank`: tree rank for union by rank.

Methods:
- `find(int i)`: path-compressed root lookup.
- `unite(int i, int j)`: merge sets by rank.

### `class Graph`
- `int V`: number of vertices.
- `vector<Edge> edges`: edge list.

## Helper functions

### `compareEdges(const Edge& a, const Edge& b)`
Used by `std::sort` to sort edges ascending by weight.

### `Graph::calculateDistance(Sensor s1, Sensor s2)`
Euclidean distance between two sensor coordinates:
`sqrt((x1-x2)^2 + (y1-y2)^2)`.

## Graph operations

### `void addEdge(int u, int v, double w)`
Appends edge `{u, v, w}`.

### `void kruskalMST()`
1. Sort edges by weight.
2. Create `DSU` for V vertices.
3. Iterate edges; if endpoints are in different sets, unite them and include edge in MST.
4. Track `mstWeight` and print chosen connections.
5. Output total pipe length.

## Complexity
- Sorting edges: O(E log E).
- DSU operations (with path compression + union by rank): amortized O(α(V)).
- Total for Kruskal: O(E log E).

## How to use
1. Create with `Graph g(sensorCount);`.
2. Add edges pairwise, e.g. complete graph from all sensor pairs with distance weights.
3. Call `g.kruskalMST();` to compute and display MST.

## Note
- Uses indices (0..V-1), so map sensor array index to sensor IDs separately.
- If graph is not fully connected, MST covers available connected components but may not include all if disconnected.
