#include <iostream>
#include <fstream>
#include <vector>
#include <iomanip> // For formatting output
#include "Sensor.h"
#include "AVLTree.h"
#include "Graph.h"
#include "Heap.h"

using namespace std;

// Global Data Structures
AVLTree registry;
MaxHeap irrigationQueue;
vector<Sensor> sensorList; // To store sensors for Graph creation

// Function to read sensors from file
void loadSensors(const string& filename) {
    ifstream file(filename);
    if (!file.is_open()) {
        cerr << "Error: Could not open file " << filename << endl;
        return;
    }

    int id, x, y, moisture;
    cout << "Loading sensors from " << filename << "...\n";
    
    while (file >> id >> x >> y >> moisture) {
        Sensor s(id, x, y, moisture);
        
        // 1. Add to Registry (AVL Tree)
        registry.insert(s);
        
        // 2. Add to Irrigation Queue (Max-Heap)
        irrigationQueue.push(s);
        
        // 3. Add to list for Graph
        sensorList.push_back(s);
    }
    
    file.close();
    cout << "Successfully loaded " << sensorList.size() << " sensors.\n";
}

// Function to calculate and show MST
void runNetworkOptimization() {
    if (sensorList.empty()) {
        cout << "No sensors available to connect.\n";
        return;
    }

    int V = sensorList.size();
    Graph g(V);

    // Create a complete graph for the sake of finding MST
    // In reality, this would be filtered by max range, but for MST we compare all
    // Map index i -> s1, index j -> s2
    for (int i = 0; i < V; i++) {
        for (int j = i + 1; j < V; j++) {
            double dist = Graph::calculateDistance(sensorList[i], sensorList[j]);
            g.addEdge(i, j, dist);
        }
    }

    cout << "\n[ Mapping Indices to IDs for Reference ]\n";
    for(int i=0; i<V; i++) {
        cout << "Index " << i << " -> Sensor ID " << sensorList[i].id << endl;
    }

    g.kruskalMST();
}

// Function to show Irrigation Schedule
void showIrrigationSchedule() {
    // Note: pop() removes from heap, so we make a copy to display without modifying the main queue
    // Or we can just display the active queue if we had a peek/traversal.
    // Since Heap.h has displayHeap() which iterates the vector, we use that.
    irrigationQueue.displayHeap();
    
    cout << "\nDo you want to simulate irrigation (remove driest sensors)? (y/n): ";
    char choice;
    cin >> choice;
    if (choice == 'y' || choice == 'Y') {
        cout << "\n--- Irrigation Log ---\n";
        while (!irrigationQueue.isEmpty()) {
            Sensor s = irrigationQueue.pop();
            cout << ">> Irrigating Sensor ID " << s.id 
                 << " (Moisture: " << s.moisture << "%, Priority: " << (100 - s.moisture) << ")\n";
        }
        cout << "All zones irrigated. Queue is now empty.\n";
    }
}

void searchSensor() {
    int id;
    cout << "Enter Sensor ID to search: ";
    cin >> id;
    Sensor* s = registry.search(id);
    if (s) {
        cout << "\n--- Sensor Found ---\n";
        s->print();
        cout << "--------------------\n";
    } else {
        cout << "\n[!] Sensor ID " << id << " not found in registry.\n";
    }
}

int main() {
    loadSensors("sensors.txt");

    int choice;
    do {
        cout << "\n============================================\n";
        cout << "   Smart-Irrigation Network (ADS Project)   \n";
        cout << "============================================\n";
        cout << "1. View Sensor Registry (AVL Tree)\n";
        cout << "2. Optimize Pipe Network (Kruskal's MST)\n";
        cout << "3. View Irrigation Schedule (Max-Heap)\n";
        cout << "4. Search Sensor by ID\n";
        cout << "5. Exit\n";
        cout << "Enter choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                registry.displayRegistry();
                break;
            case 2:
                runNetworkOptimization();
                break;
            case 3:
                showIrrigationSchedule();
                break;
            case 4:
                searchSensor();
                break;
            case 5:
                cout << "Exiting system. Goodbye!\n";
                break;
            default:
                cout << "Invalid choice. Please try again.\n";
        }
    } while (choice != 5);

    return 0;
}
