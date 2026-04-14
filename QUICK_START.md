# Quick Start Guide - Frontend

## 🚀 Getting Started (2 minutes)

### Method 1: Using NPM (Recommended) ⭐

#### Step 1: Install Node.js
Download from https://nodejs.org/ (LTS version recommended)

#### Step 2: Open Terminal & Install Dependencies
```bash
cd d:\ADS\ADS MINI PROJECT
npm install
```

#### Step 3: Start Server
```bash
npm start
```

#### Step 4: Open Browser
Automatically opens to `http://localhost:3000`
(Or manually navigate to it)

---

### Method 2: Direct File (No NPM)

1. Go to folder: `d:\ADS\ADS MINI PROJECT`
2. **Double-click on `index.html`** - Opens in your default browser

⚠️ Note: Some features work better with npm server, but this works for basic testing.

---

## 📋 Dashboard Features

### Left Sidebar - Navigation Menu
```
📊 Dashboard      → Overview & Statistics
➕ Insert Sensor  → Add new sensors
📋 Sensor Registry → View all sensors (AVL Tree)
🔗 Optimize Network → Calculate MST
💧 Irrigation Scheduler → Plan irrigation schedule
🔄 Reset Data     → Clear everything
```

### Center Area - Content Display
- All operations display results here
- Real-time updates when you interact with the system
- Color-coded status indicators

---

## 🎯 Workflow Example

### 1. Insert Some Sensors
```
Click: ➕ Insert Sensor
Enter:
  - Sensor ID: 1
  - X Coordinate: 10
  - Y Coordinate: 20
  - Moisture: 45
Click: ✓ Insert Sensor

Repeat for more sensors...
```

### 2. View Sensor Registry
```
Click: 📋 Sensor Registry
See all sensors sorted by ID (AVL Tree order)
Search by ID using the search box
```

### 3. Optimize Network
```
Click: 🔗 Optimize Pipe Network
Click: 🔄 Calculate MST
View:
  - All pipe connections
  - Total length needed
  - Cost optimization
```

### 4. Schedule Irrigation
```
Click: 💧 Irrigation Scheduler
Click: 🔄 Update Queue
View: Priority queue based on soil dryness

Click: ▶️ Simulate Irrigation
See: Animated irrigation log
```

---

## 📊 Dashboard Statistics

The dashboard shows:
- **Total Sensors**: Count of all sensors
- **Average Moisture**: System-wide moisture average
- **Critical Sensors**: Count of sensors with < 30% moisture
- **Network MST Cost**: Total pipe length needed

---

## 🔍 Features Explained

### AVL Tree (Sensor Registry)
- Sensors displayed in sorted order by ID
- Color-coded status:
  - 🟢 Green: Normal (60-100%)
  - 🟡 Yellow: Warning (30-60%)
  - 🔴 Red: Critical (0-30%)

### Max-Heap (Irrigation Scheduler)
- Priority based on dryness: **Priority = 100 - Moisture**
- Higher priority = Drier soil = Water first
- Queue automatically sorted

### MST (Pipe Network Optimization)
- Uses Kruskal's Algorithm
- Finds minimum spanning tree
- Shows pipe connections and total cost
- Minimizes total piping length

---

## 💾 Data Storage

- ✓ Auto-saves to browser storage
- ✓ Data persists after page refresh
- ✓ Works offline
- ✓ No internet required

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Page not loading | Make sure all 3 files exist: `index.html`, `style.css`, `script.js` |
| Data not saved | Ensure JavaScript is enabled in browser |
| Need to reset | Click 🔄 Reset Data button in sidebar |
| Want to start fresh | Delete browser cache or use Incognito mode |

---

## 📝 Project Summary

This frontend implements:
1. **AVL Tree** → Sensor Registry (sorted by ID)
2. **Max-Heap** → Irrigation Priority Queue (sorted by dryness)
3. **Graph MST** → Optimal pipe network (Kruskal's Algorithm)

All data structures and algorithms are simulated in JavaScript for demonstration.

---

## 🎨 Interface Layout

```
┌─────────────────────────────────────────────┐
│         Smart-Irrigation Network            │
│  Status: Sensors: 0 | Ready                 │
├──────────────────┬──────────────────────────┤
│ 📊 Dashboard     │                          │
│ ➕ Insert Sensor │   Dashboard Cards        │
│ 📋 Registry      │   Overview Statistics    │
│ 🔗 Network       │   Project Info           │
│ 💧 Scheduler     │                          │
│                  │                          │
│ 🔄 Reset         │                          │
└──────────────────┴──────────────────────────┘
```

---

## ✨ Tips & Tricks

1. **Bulk Insert**: Insert multiple sensors to see better MST results
2. **Search**: Use search box in Registry to find specific sensors
3. **Monitor Dashboard**: Keep an eye on statistics while adding sensors
4. **Simulate Irrigation**: Run simulation to see priority queue in action
5. **Try Different Coordinates**: Spread sensors for more interesting MST

---

Happy Irrigation Planning! 🌱💧
