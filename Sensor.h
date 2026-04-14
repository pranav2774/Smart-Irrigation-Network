#ifndef SENSOR_H
#define SENSOR_H

#include <iostream>

using namespace std;

// Sensor structure to hold sensor details
struct Sensor {
    int id;         // Unique ID for the sensor
    int x, y;       // Coordinates of the sensor in the field
    int moisture;   // Soil moisture percentage (0-100)

    // Constructor
    Sensor(int id = 0, int x = 0, int y = 0, int moisture = 0) : id(id), x(x), y(y), moisture(moisture) {}

    // Display sensor details
    void print() const {
        cout << "ID: " << id
             << " | Loc: (" << x << ", " << y << ")"
             << " | Moisture: " << moisture << "%" << endl;
    }
};

#endif // SENSOR_H
