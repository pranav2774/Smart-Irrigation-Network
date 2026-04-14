# Smart-Irrigation Network Frontend

## Files Created

1. **index.html** - Main dashboard interface
2. **style.css** - Responsive styling with dark theme
3. **script.js** - All functionality for modules

## How to Run

### Option 1: Direct Browser (Recommended for Development)
1. Navigate to your project folder: `d:\ADS\ADS MINI PROJECT`
2. Open `index.html` directly in your web browser (or drag & drop into browser)
3. The frontend will load with all features ready

### Option 2: Local Server (Better Performance)
Using Python:
```bash
cd d:\ADS\ADS MINI PROJECT
python -m http.server 8000
```
Then open: `http://localhost:8000`

Using Node.js:
```bash
cd d:\ADS\ADS MINI PROJECT
npx http-server
```

## Features Implemented

### 📊 Dashboard
- Overview statistics (Total Sensors, Average Moisture, Critical Sensors, MST Cost)
- Quick summary of the irrigation system
- Project information

### ➕ Insert Sensor
- Add new sensors with ID, X/Y coordinates, and moisture level
- Real-time moisture level visualization
- Validation for duplicate IDs and valid ranges

### 📋 Sensor Registry (AVL Tree Simulation)
- Display all sensors sorted by ID
- Search functionality by sensor ID
- Visual indicators for sensor status
- Simulates AVL Tree ordered structure

### 🔗 Optimize Pipe Network (MST)
- Calculate Minimum Spanning Tree using Kruskal's Algorithm
- Display all network connections with distances
- Show total pipe length required
- Visual MST statistics

### 💧 Irrigation Scheduler (Max-Heap Simulation)
- Priority-based queue based on soil dryness (100 - moisture)
- Display sensors sorted by irrigation priority
- Simulate irrigation process with animation
- Show irrigation log

## Data Persistence

- All data is automatically saved to browser's local storage
- Data persists between sessions
- Click "Reset Data" button to clear everything

## Module Functionalities

### 1. Insert Sensor
- Validates unique sensor ID
- Accepts coordinates and moisture (0-100%)
- Automatically updates registry and queue
- Shows success/error messages

### 2. Display Registry
- Shows all sensors in ID-sorted order (AVL Tree structure)
- Color-coded moisture status:
  - 🔴 Critical (< 30%)
  - 🟡 Warning (30-60%)
  - 🟢 Normal (> 60%)
- Search by sensor ID

### 3. Optimize Network
- Calculates MST using Kruskal's Algorithm
- Shows:
  - Total edges in MST
  - Total pipe length required
  - Individual connections with distances

### 4. Irrigation Scheduler
- Displays priority queue (highest dryness = highest priority)
- Simulate irrigation with animated log
- Shows sensor positions and moisture levels

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: Browser LocalStorage
- **Responsive**: Mobile, Tablet, Desktop
- **Color Scheme**: Dark theme with green accent

## Integration with C++ Backend

To integrate with your C++ backend:

1. Export sensor data from C++ to JSON format
2. Backend can generate output files:
   - `sensors.json` - All sensors
   - `mst.json` - MST results
   - `queue.json` - Priority queue

3. Frontend can read these files via fetch API

## Browser Compatibility

- Chrome/Chromium ✓
- Firefox ✓
- Edge ✓
- Safari ✓

## Notes

- Data is stored in browser's localStorage
- Each browser/device has separate data
- Clear browser cache to reset if needed
- Optimized for desktop but responsive for mobile
