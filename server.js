const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Routes (optional - for future integration with C++ backend)
app.get('/api/sensors', (req, res) => {
    res.json({ message: 'Sensors API endpoint ready' });
});

app.post('/api/sensors', (req, res) => {
    res.json({ message: 'Sensor added' });
});

app.get('/api/mst', (req, res) => {
    res.json({ message: 'MST calculation endpoint ready' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║   Smart-Irrigation Network Dashboard                       ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ║
║                                                            ║
║   🚀 Server is running!                                   ║
║   📱 Open: http://localhost:${PORT}                           ║
║   💾 Data storage: Browser LocalStorage                    ║
║   🛑 Stop: Press Ctrl+C                                    ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;
