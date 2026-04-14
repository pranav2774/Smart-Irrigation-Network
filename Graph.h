#ifndef GRAPH_H
#define GRAPH_H

#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>
#include "Sensor.h"

using namespace std;

// Edge structure for the graph
struct Edge {
    int src, dest;
    double weight;
};

// Disjoint Set Union (DSU) structure for Kruskal's Algorithm
struct DSU {
    vector<int> parent;
    vector<int> rank;

    DSU(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; i++)
            parent[i] = i;
    }

    int find(int i) {
        if (parent[i] != i)
            parent[i] = find(parent[i]);
        return parent[i];
    }

    void unite(int i, int j) {
        int root_i = find(i);
        int root_j = find(j);

        if (root_i != root_j) {
            if (rank[root_i] < rank[root_j])
                parent[root_i] = root_j;
            else if (rank[root_i] > rank[root_j])
                parent[root_j] = root_i;
            else {
                parent[root_i] = root_j;
                rank[root_j]++;
            }
        }
    }
};

// Comparator for sorting edges by weight
bool compareEdges(const Edge& a, const Edge& b) {
    return a.weight < b.weight;
}

// Graph class
class Graph {
private:
    int V; // Number of vertices (sensors)
    vector<Edge> edges;

public:
    Graph(int V) : V(V) {}

    // Add an edge to the graph
    void addEdge(int u, int v, double w) {
        edges.push_back({u, v, w});
    }

    // Calculate distance between two sensors
    static double calculateDistance(Sensor s1, Sensor s2) {
        return sqrt(pow(s1.x - s2.x, 2) + pow(s1.y - s2.y, 2));
    }

    // Kruskal's Algorithm to find MST
    void kruskalMST() {
        // 1. Sort all edges in non-decreasing order of their weight
        sort(edges.begin(), edges.end(), compareEdges);

        DSU dsu(V);
        vector<Edge> result;
        double mstWeight = 0;

        cout << "\n--- Pipe Network Optimization (MST) ---\n";
        cout << "Calculating optimal connections...\n";

        for (const auto& edge : edges) {
            int u = edge.src;
            int v = edge.dest;

            // 2. Check if the selected edge forms a cycle
            if (dsu.find(u) != dsu.find(v)) {
                dsu.unite(u, v);
                result.push_back(edge);
                mstWeight += edge.weight;
                cout << "Connected Sensor " << u << " - Sensor " << v 
                     << " [Dist: " << edge.weight << "]" << endl;
            }
        }

        cout << "Total Pipe Length Required: " << mstWeight << " units\n";
        cout << "---------------------------------------\n";
    }
};

#endif // GRAPH_H
