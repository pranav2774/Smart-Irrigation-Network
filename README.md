# Smart-Irrigation Network Dashboard
## Advanced Data Structures Mini Project

A comprehensive web-based dashboard for managing smart irrigation networks using advanced data structures like AVL Trees, Max-Heaps, and Graph algorithms.

---

## 📦 Quick Start

### Using NPM (Recommended)

```bash
# 1. Navigate to project
cd d:\ADS\ADS MINI PROJECT

# 2. Install dependencies
npm install

# 3. Start server
npm start

# 4. Open browser to http://localhost:3000
```

### Direct Browser (No Setup)
Just double-click `index.html` to open in browser.

---

## 🎯 Features

### 1. 📊 Dashboard
- Real-time statistics
- System overview
- Network status

### 2. ➕ Insert Sensor
- Add sensors with coordinates
- Set moisture levels (0-100%)
- Automatic validation
- Real-time visualization

### 3. 📋 Sensor Registry (AVL Tree)
- View all sensors sorted by ID
- Search functionality
- Color-coded status indicators
- AVL Tree ordered structure

### 4. 🔗 Optimize Pipe Network (MST)
- Kruskal's Algorithm implementation
- Minimum Spanning Tree calculation
- Display all connections
- Total cost analysis

### 5. 💧 Irrigation Scheduler (Max-Heap)
- Priority-based queue
- Sorted by soil dryness
- Animated simulation
- Real-time scheduling

---

## 📁 Project Files

### Frontend Files
- `index.html` - Main dashboard interface
- `style.css` - Styling (dark theme)
- `script.js` - Frontend logic

### Backend Setup
- `server.js` - Express.js server
- `package.json` - NPM dependencies
- `package-lock.json` - Locked versions

### Documentation
- `QUICK_START.md` - Getting started guide
- `NPM_SETUP.md` - Detailed npm setup
- `FRONTEND_README.md` - Feature documentation
- `README.md` - This file

### C++ Implementation
- `AVLTree.h` - AVL Tree data structure
- `Graph.h` - Graph and MST algorithms
- `Heap.h` - Max-Heap priority queue
- `Sensor.h` - Sensor data structure
- `main.cpp` - C++ implementation

---

## 🛠️ Technology Stack

### Frontend
- HTML5
- CSS3 (Flexbox, Grid)
- Vanilla JavaScript

### Backend
- Node.js
- Express.js
- CORS support

### Data Storage
- Browser LocalStorage (client-side)
- Persistent across sessions

---

## 📊 Data Structures Implemented

### 1. AVL Tree (Sensor Registry)
- Self-balancing binary search tree
- O(log n) operations
- Maintains sensors sorted by ID

### 2. Max-Heap (Irrigation Priority)
- Priority queue based on dryness
- Priority = 100 - Moisture Level
- O(log n) insertion and extraction

### 3. Graph with MST (Pipe Network)
- Kruskal's Algorithm
- Disjoint Set Union (DSU)
- Finds optimal connections
- Minimizes total pipe length

---

## 🚀 Usage Instructions

### Scenario: Setting Up Irrigation System

1. **Add Sensors**
   - Click ➕ Insert Sensor
   - Enter sensor details (ID, coordinates, moisture)
   - System auto-sorts in AVL Tree

2. **View Registry**
   - Click 📋 Sensor Registry
   - See all sensors sorted by ID
   - Search specific sensors

3. **Optimize Network**
   - Click 🔗 Optimize Pipe Network
   - Calculate MST
   - View all connections and total cost

4. **Schedule Irrigation**
   - Click 💧 Irrigation Scheduler
   - Update queue (sorts by dryness)
   - Simulate irrigation process

---

## 💾 Data Persistence

✅ **Automatic Saving**
- Data stored in browser LocalStorage
- Survives page refresh
- Works offline
- Each browser has separate data

**Reset Data**
- Click 🔄 Reset Data button
- Clears all sensors and calculations
- Requires confirmation

---

## 🖥️ System Requirements

### Minimum
- Any modern web browser
- 10 MB disk space

### For NPM Server
- Node.js 14+
- 50 MB disk space (includes node_modules)

### Supported Browsers
- Chrome/Chromium
- Firefox
- Safari
- Edge

---

## 📖 Documentation

### Quick Start
See `QUICK_START.md` for immediate setup

### NPM Setup
See `NPM_SETUP.md` for detailed npm instructions

### Full Features
See `FRONTEND_README.md` for complete feature list

---

## 🔧 Configuration

### Change Port (NPM Server)
Edit `server.js`:
```javascript
const PORT = process.env.PORT || 3000;  // Change 3000 to desired port
```

Or use environment variable:
```bash
set PORT=8080 && npm start  # Windows
PORT=8080 npm start         # Mac/Linux
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| NPM command not found | Install Node.js from nodejs.org |
| Port already in use | Change PORT in server.js or environment |
| Files not loading | Ensure all files exist in same folder |
| Data not saving | Enable JavaScript in browser |
| CSS/JS not loading | Clear browser cache (Ctrl+Shift+Delete) |

---

## 🔗 Integration with C++ Backend

To connect the C++ backend:

1. **Export C++ Output to JSON**
   - Sensors: `sensors.json`
   - MST Results: `mst.json`
   - Queue: `queue.json`

2. **Modify server.js**
   - Add routes to read C++ generated files
   - Or connect to C++ HTTP server

3. **Update script.js**
   - Fetch from backend instead of LocalStorage
   - Process JSON responses

---

## 📝 Project Details

**Course:** Advanced Data Structures
**Type:** Mini Project
**Modules:** 3 (AVL Tree, Max-Heap, Graph MST)
**Status:** Complete ✅

---

## 👥 Team

ADS Mini Project Team

---

## 📄 License

MIT License

---

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review QUICK_START.md
3. Check NPM_SETUP.md for setup issues
4. Verify all files are in correct folder

---

## ✨ Features Highlights

- ✅ Real-time data validation
- ✅ Automatic data sorting (AVL Tree)
- ✅ Priority-based scheduling (Max-Heap)
- ✅ Optimal network design (Kruskal's MST)
- ✅ Beautiful responsive UI
- ✅ Persistent data storage
- ✅ Zero dependencies for frontend
- ✅ Easy backend integration

---

## 🎓 Learning Outcomes

This project demonstrates:
- AVL Tree implementation and usage
- Binary Heap concepts and operations
- Graph algorithms (Kruskal's, DSU)
- Web Frontend development
- API design patterns
- Data persistence strategies

---

**Happy Irrigation Planning! 🌱💧**

Last Updated: April 2026
