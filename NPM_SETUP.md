# NPM Setup Guide - Smart-Irrigation Network

## 📦 Installation & Setup

### Step 1: Install Node.js
If you don't have Node.js installed, download from: https://nodejs.org/
- Recommended: LTS version (14 or higher)
- Verify installation:
```bash
node --version
npm --version
```

### Step 2: Install Dependencies
Navigate to the project folder and install dependencies:

```bash
cd d:\ADS\ADS MINI PROJECT
npm install
```

This will:
- Download Express.js server framework
- Download CORS for cross-origin requests
- Create `node_modules` folder
- Create `package-lock.json` file

### Step 3: Start the Server

#### Option A: Production Start
```bash
npm start
```

#### Option B: Development Mode
```bash
npm run dev
```

Both commands start the server on **http://localhost:3000**

### Step 4: Access the Dashboard

Open your browser and go to:
```
http://localhost:3000
```

---

## 🎯 What Gets Installed

### package.json
This file lists all project dependencies:
- **express** (4.18.2) - Web server framework
- **cors** (2.8.5) - Cross-Origin Resource Sharing

### server.js
This file:
- Creates an Express server
- Serves static files (HTML, CSS, JS)
- Provides API endpoints for future backend integration
- Runs on port 3000

---

## 🚀 Running the Server

### From Command Line:

#### On Windows (PowerShell or CMD):
```bash
cd "d:\ADS\ADS MINI PROJECT"
npm install
npm start
```

#### On Mac/Linux:
```bash
cd ~/path/to/ADS\ MINI\ PROJECT
npm install
npm start
```

### Expected Output:
```
╔════════════════════════════════════════════════════════════╗
║   Smart-Irrigation Network Dashboard                       ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ║
║                                                            ║
║   🚀 Server is running!                                   ║
║   📱 Open: http://localhost:3000                          ║
║   💾 Data storage: Browser LocalStorage                   ║
║   🛑 Stop: Press Ctrl+C                                   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

### Then:
1. The browser might auto-open to http://localhost:3000
2. If not, manually open http://localhost:3000
3. Dashboard will load fully

---

## ⏹️ Stopping the Server

Press `Ctrl+C` in the terminal/command prompt where the server is running.

---

## 📁 Project Structure After Setup

```
ADS MINI PROJECT/
├── node_modules/          (created by npm install)
├── index.html             (frontend)
├── style.css              (frontend)
├── script.js              (frontend)
├── server.js              (Node.js server)
├── package.json           (dependencies list)
├── package-lock.json      (created by npm install)
├── AVLTree.h              (C++ header)
├── Graph.h                (C++ header)
├── Heap.h                 (C++ header)
├── Sensor.h               (C++ header)
├── main.cpp               (C++ implementation)
└── *.md files             (documentation)
```

---

## 🔧 Troubleshooting

### Error: "npm command not found"
**Solution:** Node.js not installed. Download from https://nodejs.org/

### Error: "Port 3000 is already in use"
**Solution:** Either:
1. Change port in server.js (line: `const PORT = process.env.PORT || 3000;`)
2. Kill process on port 3000:
   - Windows: `netstat -ano | findstr :3000`
   - Mac/Linux: `lsof -ti:3000 | xargs kill -9`

### CORS Errors
**Solution:** Already handled in server.js, should not occur

### Module not found errors
**Solution:** Run `npm install` again in the project folder

---

## 🚀 Advanced: Custom Port

To run on a different port (e.g., 8080):

### Option 1: Environment Variable
```bash
set PORT=8080 && npm start          # Windows
PORT=8080 npm start                 # Mac/Linux
```

### Option 2: Edit server.js
Change line:
```javascript
const PORT = process.env.PORT || 3000;
```
To:
```javascript
const PORT = process.env.PORT || YOUR_PORT;
```

---

## 📝 API Endpoints (for future use)

The server provides these endpoints ready for C++ backend integration:

```
GET  /api/sensors          - Get all sensors
POST /api/sensors          - Add new sensor
GET  /api/mst              - Get MST calculation
```

---

## ✅ Verification Checklist

- [ ] Node.js installed (`node --version` shows version)
- [ ] In correct folder when running `npm install`
- [ ] Dependencies installed (`node_modules` folder exists)
- [ ] Server starts without errors (`npm start`)
- [ ] Browser opens to http://localhost:3000
- [ ] Dashboard loads successfully
- [ ] Can insert sensors and see data update

---

## 💡 Tips

1. **Keep terminal open** while using the dashboard
2. **Refresh browser** if something looks broken
3. **Check terminal output** for error messages
4. **Use Ctrl+C** to stop server gracefully
5. **Data persists** in browser storage (not affected by server)

---

## 📚 Further Development

To integrate with C++ backend:
1. Modify `server.js` to connect to C++ backend API
2. Update API endpoints in `server.js`
3. Update `script.js` to fetch from backend instead of localStorage
4. Deploy backend alongside Node.js server

---

Happy Coding! 🌱💧
