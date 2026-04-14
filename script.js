// ========== AVL TREE NODE ==========
class AVLNode {
    constructor(sensor) {
        this.sensor = sensor;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

// ========== AVL TREE IMPLEMENTATION ==========
class AVLTree {
    constructor() {
        this.root = null;
    }

    // Get height of a node
    getHeight(node) {
        return node === null ? 0 : node.height;
    }

    // Get balance factor
    getBalance(node) {
        return node === null ? 0 : this.getHeight(node.left) - this.getHeight(node.right);
    }

    // Right rotation
    rightRotate(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        return x;
    }

    // Left rotation
    leftRotate(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

        return y;
    }

    // Insert sensor
    insert(sensor) {
        this.root = this._insertNode(this.root, sensor);
    }

    _insertNode(node, sensor) {
        // Standard BST insertion
        if (node === null) {
            return new AVLNode(sensor);
        }

        if (sensor.id < node.sensor.id) {
            node.left = this._insertNode(node.left, sensor);
        } else if (sensor.id > node.sensor.id) {
            node.right = this._insertNode(node.right, sensor);
        } else {
            // Duplicate ID - return null to indicate rejection
            return null;
        }

        // Update height
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

        // Get balance factor
        const balance = this.getBalance(node);

        // Left Left Case
        if (balance > 1 && sensor.id < node.left.sensor.id) {
            return this.rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && sensor.id > node.right.sensor.id) {
            return this.leftRotate(node);
        }

        // Left Right Case
        if (balance > 1 && sensor.id > node.left.sensor.id) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && sensor.id < node.right.sensor.id) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node;
    }

    // Search for sensor
    search(id) {
        return this._searchNode(this.root, id);
    }

    _searchNode(node, id) {
        if (node === null) {
            return null;
        }

        if (id === node.sensor.id) {
            return node.sensor;
        } else if (id < node.sensor.id) {
            return this._searchNode(node.left, id);
        } else {
            return this._searchNode(node.right, id);
        }
    }

    // In-order traversal to get sorted sensors
    inOrder() {
        const result = [];
        this._inOrderTraversal(this.root, result);
        return result;
    }

    _inOrderTraversal(node, result) {
        if (node !== null) {
            this._inOrderTraversal(node.left, result);
            result.push(node.sensor);
            this._inOrderTraversal(node.right, result);
        }
    }

    // Check if tree is empty
    isEmpty() {
        return this.root === null;
    }

    // Get tree height
    height() {
        return this.getHeight(this.root);
    }
}

// ========== MAX HEAP IMPLEMENTATION ==========
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    // Parent index
    parent(i) {
        return Math.floor((i - 1) / 2);
    }

    // Left child index
    leftChild(i) {
        return 2 * i + 1;
    }

    // Right child index
    rightChild(i) {
        return 2 * i + 2;
    }

    // Get priority (dryness = 100 - moisture)
    getPriority(sensor) {
        return 100 - sensor.moisture;
    }

    // Heapify up
    heapifyUp(i) {
        while (i > 0 && this.getPriority(this.heap[this.parent(i)]) < this.getPriority(this.heap[i])) {
            [this.heap[this.parent(i)], this.heap[i]] = [this.heap[i], this.heap[this.parent(i)]];
            i = this.parent(i);
        }
    }

    // Heapify down
    heapifyDown(i) {
        let maxIndex = i;
        const l = this.leftChild(i);
        const r = this.rightChild(i);

        if (l < this.heap.length && this.getPriority(this.heap[l]) > this.getPriority(this.heap[maxIndex])) {
            maxIndex = l;
        }

        if (r < this.heap.length && this.getPriority(this.heap[r]) > this.getPriority(this.heap[maxIndex])) {
            maxIndex = r;
        }

        if (i !== maxIndex) {
            [this.heap[i], this.heap[maxIndex]] = [this.heap[maxIndex], this.heap[i]];
            this.heapifyDown(maxIndex);
        }
    }

    // Check if empty
    isEmpty() {
        return this.heap.length === 0;
    }

    // Push sensor to heap
    push(sensor) {
        this.heap.push(sensor);
        this.heapifyUp(this.heap.length - 1);
    }

    // Pop top sensor
    pop() {
        if (this.isEmpty()) {
            throw new Error('HEAP UNDERFLOW: Cannot pop from empty heap');
        }

        const root = this.heap[0];
        const last = this.heap.pop();
        
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.heapifyDown(0);
        }

        return root;
    }

    // Get all sensors (for display)
    getAll() {
        return [...this.heap];
    }

    // Size of heap
    size() {
        return this.heap.length;
    }
}

// ========== TREE VISUALIZATION FUNCTIONS ==========
function drawAVLTree() {
    if (avlTree.isEmpty()) {
        const canvas = document.getElementById('avlTreeCanvas');
        canvas.width = 800;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'var(--text-secondary)';
        ctx.textAlign = 'center';
        ctx.fillText('No AVL Tree available', 400, 100);
        document.getElementById('treeHeight').textContent = '0';
        document.getElementById('totalNodes').textContent = '0';
        return;
    }

    const canvas = document.getElementById('avlTreeCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 450;

    // Draw tree recursively
    const nodes = [];
    function traverse(node, x, y, offsetX) {
        if (node === null) return;

        nodes.push({ id: node.sensor.id, x, y, height: node.height, balance: avlTree.getBalance(node) });

        if (node.left !== null) {
            const leftX = x - offsetX;
            const leftY = y + 80;
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(leftX, leftY);
            ctx.stroke();
            traverse(node.left, leftX, leftY, offsetX / 2);
        }

        if (node.right !== null) {
            const rightX = x + offsetX;
            const rightY = y + 80;
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(rightX, rightY);
            ctx.stroke();
            traverse(node.right, rightX, rightY, offsetX / 2);
        }
    }

    traverse(avlTree.root, 450, 30, 150);

    // Draw nodes
    nodes.forEach(node => {
        // Node circle
        ctx.fillStyle = '#2ecc71';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#27ae60';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Node ID
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.id, node.x, node.y - 8);

        // Height indicator
        ctx.fillStyle = '#3498db';
        ctx.font = '11px Arial';
        ctx.fillText(`h:${node.height}`, node.x, node.y + 8);

        // Balance factor
        const balColor = Math.abs(node.balance) <= 1 ? '#2ecc71' : '#e74c3c';
        ctx.fillStyle = balColor;
        ctx.font = '10px Arial';
        ctx.fillText(`b:${node.balance}`, node.x, node.y + 20);
    });

    document.getElementById('treeHeight').textContent = avlTree.height();
    document.getElementById('totalNodes').textContent = nodes.length;
}

function drawMSTGraph() {
    if (!mstData || mstData.edgeCount === 0) {
        const canvas = document.getElementById('mstCanvas');
        canvas.width = 800;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#bdc3c7';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('No MST calculated yet', 400, 150);
        document.getElementById('vizEdgeCount').textContent = '0';
        document.getElementById('vizTotalCost').textContent = '0';
        return;
    }

    const canvas = document.getElementById('mstCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 500;

    const sensors = avlTree.inOrder();
    if (sensors.length === 0) return;

    // Normalize sensor coordinates to canvas
    const minX = Math.min(...sensors.map(s => s.x));
    const minY = Math.min(...sensors.map(s => s.y));
    const maxX = Math.max(...sensors.map(s => s.x));
    const maxY = Math.max(...sensors.map(s => s.y));

    const padding = 50;
    const canvasWidth = canvas.width - 2 * padding;
    const canvasHeight = canvas.height - 2 * padding;

    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;

    function toCanvasX(x) {
        return padding + (x - minX) / rangeX * canvasWidth;
    }

    function toCanvasY(y) {
        return padding + (y - minY) / rangeY * canvasHeight;
    }

    // Draw MST edges
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;
    mstData.edges.forEach(edge => {
        const s1 = sensors[edge.src];
        const s2 = sensors[edge.dest];
        const x1 = toCanvasX(s1.x);
        const y1 = toCanvasY(s1.y);
        const x2 = toCanvasX(s2.x);
        const y2 = toCanvasY(s2.y);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Edge weight label
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        ctx.fillStyle = '#3498db';
        ctx.font = 'bold 11px Arial';
        ctx.backgroundColor = 'transparent';
        ctx.fillText(edge.weight.toFixed(1), midX, midY - 10);
    });

    // Draw sensor nodes
    sensors.forEach((sensor, idx) => {
        const x = toCanvasX(sensor.x);
        const y = toCanvasY(sensor.y);

        // Node circle
        ctx.fillStyle = '#2ecc71';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#27ae60';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Sensor ID
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sensor.id, x, y);

        // Sensor coordinates label
        ctx.fillStyle = '#ecf0f1';
        ctx.font = '10px Arial';
        ctx.fillText(`(${sensor.x},${sensor.y})`, x, y + 35);
    });

    // Draw grid
    ctx.strokeStyle = '#34495e';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([5, 5]);
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(padding, padding + (canvasHeight / 4) * i);
        ctx.lineTo(padding + canvasWidth, padding + (canvasHeight / 4) * i);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(padding + (canvasWidth / 4) * i, padding);
        ctx.lineTo(padding + (canvasWidth / 4) * i, padding + canvasHeight);
        ctx.stroke();
    }
    ctx.setLineDash([]);

    // Update stats
    document.getElementById('vizEdgeCount').textContent = mstData.edgeCount;
    document.getElementById('vizTotalCost').textContent = mstData.totalCost;
    document.getElementById('vizNetworkStatus').textContent = mstData.message;
}

// ========== GLOBAL DATA STRUCTURES ==========
let avlTree = new AVLTree();
let maxHeap = new MaxHeap();
let mstData = null;
let insertionLog = []; // Track all insertions with validation results

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    loadDataFromStorage();
    updateDashboard();
});

// ========== EVENT LISTENERS ==========
function initializeEventListeners() {
    // Navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', handleNavigation);
    });

    // Insert Sensor Form
    document.querySelector('.sensor-form').addEventListener('submit', handleInsertSensor);
    document.getElementById('sensorMoisture').addEventListener('input', updateMoistureBar);

    // Registry Search
    document.getElementById('searchBtn').addEventListener('click', handleSearchSensor);
    document.getElementById('clearSearchBtn').addEventListener('click', handleClearSearch);

    // Network Optimization
    document.getElementById('calculateMSTBtn').addEventListener('click', handleCalculateMST);
    document.getElementById('viewMSTVisualsBtn').addEventListener('click', handleViewMSTDetails);

    // Irrigation Scheduler
    document.getElementById('updateQueueBtn').addEventListener('click', handleUpdateQueue);
    document.getElementById('simulateIrrigationBtn').addEventListener('click', handleSimulateIrrigation);

    // Reset Data
    document.getElementById('resetBtn').addEventListener('click', handleResetData);
}

// ========== NAVIGATION ==========
function handleNavigation(e) {
    const module = e.target.closest('.nav-btn').getAttribute('data-module');
    
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.module').forEach(mod => mod.classList.remove('active'));
    
    e.target.closest('.nav-btn').classList.add('active');
    document.getElementById(module).classList.add('active');

    if (module === 'sensor-registry') {
        displayRegistry();
        setTimeout(() => drawAVLTree(), 100);
    } else if (module === 'optimize-network') {
        if (mstData) {
            displayMSTResults();
            setTimeout(() => drawMSTGraph(), 100);
        }
    } else if (module === 'irrigation-scheduler') {
        displayIrrigationQueue();
    }
}

// ========== INSERT SENSOR WITH FULL VALIDATION ==========
function handleInsertSensor(e) {
    e.preventDefault();

    const idInput = document.getElementById('sensorId').value.trim();
    const xInput = document.getElementById('sensorX').value.trim();
    const yInput = document.getElementById('sensorY').value.trim();
    const moistureInput = document.getElementById('sensorMoisture').value.trim();

    // Edge Case 1: Empty input field validation
    if (!idInput || !xInput || !yInput || !moistureInput) {
        showMessage('insertMessage', '⚠️ All fields are required!', 'error');
        return;
    }

    // Parse values
    const id = parseInt(idInput);
    const x = parseInt(xInput);
    const y = parseInt(yInput);
    const moisture = parseInt(moistureInput);

    // Validation: Check for NaN
    if (isNaN(id) || isNaN(x) || isNaN(y) || isNaN(moisture)) {
        showMessage('insertMessage', '⚠️ All values must be valid numbers!', 'error');
        return;
    }

    // Validation: Negative coordinates
    if (x < 0 || y < 0) {
        showMessage('insertMessage', '⚠️ Coordinates cannot be negative!', 'error');
        return;
    }

    // Edge Case 2: Invalid moisture values
    if (moisture < 0 || moisture > 100) {
        showMessage('insertMessage', '❌ Moisture level must be between 0-100%', 'error');
        return;
    }

    // Edge Case 1: Duplicate Sensor IDs
    if (avlTree.search(id)) {
        showMessage('insertMessage', `⚠️ Sensor ID ${id} already exists! Duplicate rejected.`, 'error');
        insertionLog.push(`REJECTED: Sensor ${id} - Duplicate ID detected`);
        return;
    }

    // Create new sensor
    const newSensor = { id, x, y, moisture };

    // Insert into AVL Tree
    avlTree.insert(newSensor);

    // Insert into Max Heap
    maxHeap.push(newSensor);

    // Log insertion
    insertionLog.push(`INSERTED: Sensor ${id} at (${x}, ${y}) with moisture ${moisture}%`);

    // Reset form
    document.querySelector('.sensor-form').reset();
    document.getElementById('moistureBar').style.width = '0%';

    // Show success message
    showMessage('insertMessage', `✓ Sensor ${id} inserted successfully using AVL Tree!`, 'success');

    // Update UI
    updateDashboard();
    
    // Redraw tree if registry is visible
    if (document.querySelector('.nav-btn[data-module="sensor-registry"]').classList.contains('active')) {
        setTimeout(() => drawAVLTree(), 50);
    }
    
    saveDataToStorage();

    // Reset message after 3 seconds
    setTimeout(() => {
        document.getElementById('insertMessage').innerHTML = '';
        document.getElementById('insertMessage').className = 'message';
    }, 3000);
}

function updateMoistureBar(e) {
    const value = parseInt(e.target.value) || 0;
    document.getElementById('moistureBar').style.width = value + '%';
}

// ========== DISPLAY SENSOR REGISTRY (AVL TREE) ==========
function displayRegistry(filterId = null) {
    const container = document.getElementById('registryContainer');
    
    // Edge Case 3: No sensors available
    if (avlTree.isEmpty()) {
        container.innerHTML = '<p class="empty-message">📭 No sensors available. Insert sensors to populate the registry.</p>';
        return;
    }

    // Get in-order traversal (sorted by ID - AVL structure)
    const sensors = avlTree.inOrder();
    let filteredSensors = sensors;

    if (filterId !== null) {
        filteredSensors = sensors.filter(s => s.id.toString().includes(filterId.toString()));
    }

    if (filteredSensors.length === 0) {
        container.innerHTML = `<p class="empty-message">❌ No sensors found with ID containing "${filterId}"</p>`;
        return;
    }

    let html = `
        <div style="margin-bottom: 20px; padding: 15px; background: var(--dark-bg); border-radius: 6px; border-left: 4px solid var(--primary-color);">
            <h3 style="color: #2ecc71; margin-bottom: 8px;">🌳 AVL Tree Registry (In-Order Traversal)</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Height: <strong>${avlTree.height()}</strong> | Total Sensors: <strong>${sensors.length}</strong></p>
        </div>
    `;

    filteredSensors.forEach((sensor, idx) => {
        const moistureClass = sensor.moisture < 30 ? 'critical' : sensor.moisture < 60 ? 'warning' : 'normal';
        html += `
            <div class="sensor-item">
                <div class="sensor-item-header">
                    <h4>📍 Sensor ${sensor.id}</h4>
                    <span class="sensor-id-badge">#${sensor.id}</span>
                </div>
                <div class="sensor-details">
                    <div class="sensor-detail">
                        <span class="sensor-detail-label">📌 Location</span>
                        <span class="sensor-detail-value">(${sensor.x}, ${sensor.y})</span>
                    </div>
                    <div class="sensor-detail">
                        <span class="sensor-detail-label">💧 Moisture</span>
                        <span class="sensor-detail-value ${moistureClass}">${sensor.moisture}%</span>
                    </div>
                    <div class="sensor-detail">
                        <span class="sensor-detail-label">⚠️ Status</span>
                        <span class="sensor-detail-value">
                            ${sensor.moisture < 30 ? '🔴 Critical' : sensor.moisture < 60 ? '🟡 Warning' : '🟢 Normal'}
                        </span>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    
    // Draw AVL Tree visualization
    setTimeout(() => drawAVLTree(), 50);
}

function handleSearchSensor() {
    const searchId = document.getElementById('searchSensorId').value.trim();
    if (searchId === '') {
        showMessage('registryContainer', '⚠️ Please enter a Sensor ID', 'error');
        return;
    }
    displayRegistry(searchId);
}

function handleClearSearch() {
    document.getElementById('searchSensorId').value = '';
    displayRegistry();
}

// ========== OPTIMIZE PIPE NETWORK (MST WITH EDGE CASES) ==========
function handleCalculateMST() {
    const sensors = avlTree.inOrder();

    // Edge Case 4: Single sensor or no sensors
    if (sensors.length < 2) {
        showMessage('mstContainer', '⚠️ Need at least 2 sensors to calculate MST. MST returns empty.', 'error');
        mstData = { edges: [], totalCost: 0, edgeCount: 0, message: 'Insufficient sensors' };
        displayMSTResults();
        return;
    }

    // Calculate distances between all pairs
    const edges = [];
    for (let i = 0; i < sensors.length; i++) {
        for (let j = i + 1; j < sensors.length; j++) {
            const dist = calculateDistance(sensors[i], sensors[j]);
            edges.push({
                src: i,
                dest: j,
                weight: dist,
                srcId: sensors[i].id,
                destId: sensors[j].id
            });
        }
    }

    // Sort edges by weight
    edges.sort((a, b) => a.weight - b.weight);

    // Kruskal's Algorithm - DSU
    const parent = Array(sensors.length).fill(0).map((_, i) => i);
    const rank = Array(sensors.length).fill(0);
    
    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    function union(x, y) {
        const px = find(x);
        const py = find(y);

        if (px === py) return false;

        if (rank[px] < rank[py]) {
            parent[px] = py;
        } else if (rank[px] > rank[py]) {
            parent[py] = px;
        } else {
            parent[py] = px;
            rank[px]++;
        }
        return true;
    }

    const mstEdges = [];
    let totalCost = 0;

    for (const edge of edges) {
        if (union(edge.src, edge.dest)) {
            mstEdges.push(edge);
            totalCost += edge.weight;
        }
    }

    // Edge Case 4: Disconnected network
    let isConnected = true;
    const root = find(0);
    for (let i = 1; i < sensors.length; i++) {
        if (find(i) !== root) {
            isConnected = false;
            break;
        }
    }

    mstData = {
        edges: mstEdges,
        totalCost: totalCost.toFixed(2),
        edgeCount: mstEdges.length,
        isConnected: isConnected,
        message: isConnected ? 'Connected Network' : 'Disconnected Network (Optimal Forest Computed)'
    };

    displayMSTResults();
    setTimeout(() => drawMSTGraph(), 100);
    updateDashboard();
    saveDataToStorage();
}

function displayMSTResults() {
    const container = document.getElementById('mstContainer');
    
    if (!mstData) {
        container.innerHTML = '<p class="empty-message">No MST calculated yet. Click "Calculate MST" to optimize the network.</p>';
        return;
    }

    // Edge Case: Not enough sensors
    if (mstData.edgeCount === 0 && mstData.message === 'Insufficient sensors') {
        container.innerHTML = `
            <div style="padding: 20px; background: rgba(231, 76, 60, 0.1); border: 2px solid var(--danger-color); border-radius: 6px; color: var(--danger-color);">
                <p>❌ <strong>MST Not Possible</strong></p>
                <p>Reason: 📭 ${mstData.message}</p>
                <p>Insert at least 2 sensors to calculate MST</p>
            </div>
        `;
        return;
    }

    let html = `
        <div style="padding: 15px; background: var(--dark-bg); border-radius: 6px; margin-bottom: 20px; border-left: 4px solid ${mstData.isConnected ? 'var(--primary-color)' : 'var(--warning-color)'};">
            <p style="color: var(--text-secondary); margin-bottom: 8px;">🔗 Network Status: <strong style="color: ${mstData.isConnected ? 'var(--primary-color)' : 'var(--warning-color)'};">${mstData.message}</strong></p>
        </div>
        <div class="mst-stats">
            <div class="mst-stat">
                <div class="mst-stat-label">Total Edges</div>
                <div class="mst-stat-value">${mstData.edgeCount}</div>
            </div>
            <div class="mst-stat">
                <div class="mst-stat-label">Total Pipe Length</div>
                <div class="mst-stat-value">${mstData.totalCost} units</div>
            </div>
            <div class="mst-stat">
                <div class="mst-stat-label">Sensors Connected</div>
                <div class="mst-stat-value">${avlTree.inOrder().length}</div>
            </div>
        </div>
    `;

    if (mstData.edgeCount > 0) {
        html += '<div class="mst-edges"><h4>🔗 Network Connections</h4>';
        mstData.edges.forEach((edge, idx) => {
            html += `
                <div class="edge-item">
                    <div class="edge-info">
                        <strong>Connection ${idx + 1}:</strong> Sensor ${edge.srcId} ↔ Sensor ${edge.destId}
                    </div>
                    <span class="edge-weight">${edge.weight.toFixed(2)} units</span>
                </div>
            `;
        });
        html += '</div>';
    }

    container.innerHTML = html;
}

function handleViewMSTDetails() {
    if (!mstData) {
        showMessage('mstContainer', '⚠️ Please calculate MST first', 'error');
        return;
    }
    alert(`MST Details:\n- Total Cost: ${mstData.totalCost} units\n- Edges: ${mstData.edgeCount}\n- Status: ${mstData.message}`);
    
    // Draw MST Graph
    setTimeout(() => drawMSTGraph(), 50);
}

function calculateDistance(s1, s2) {
    return Math.sqrt(Math.pow(s1.x - s2.x, 2) + Math.pow(s1.y - s2.y, 2));
}

// ========== IRRIGATION SCHEDULER (MAX HEAP WITH EDGE CASES) ==========
function displayIrrigationQueue() {
    const container = document.getElementById('priorityQueueContainer');
    
    // Edge Case 5: Single sensor
    if (maxHeap.size() === 0) {
        container.innerHTML = '<p class="empty-message">💧 No irrigation queue. Insert sensors to populate the schedule.</p>';
        return;
    }

    const queue = maxHeap.getAll();
    
    let html = `
        <div style="margin-bottom: 20px; padding: 15px; background: var(--dark-bg); border-radius: 6px; border-left: 4px solid var(--warning-color);">
            <h3 style="color: #f39c12; margin-bottom: 8px;">💧 Max-Heap Priority Queue (Sorted by Dryness)</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Queue Size: <strong>${queue.length}</strong> | Status: <strong>${queue.length === 1 ? 'Single Element' : 'Multiple Elements'}</strong></p>
        </div>
    `;
    
    queue.forEach((sensor, idx) => {
        const priority = 100 - sensor.moisture;
        const criticalClass = sensor.moisture < 30 ? 'critical' : '';
        const priorityClass = priority > 70 ? 'high' : priority > 40 ? 'medium' : 'low';
        
        html += `
            <div class="priority-item ${criticalClass}">
                <div class="priority-info">
                    <div class="priority-sensor-id">🌱 Sensor #${sensor.id} (Queue Position: ${idx + 1})</div>
                    <div class="priority-details">
                        <span>📍 Location: (${sensor.x}, ${sensor.y})</span>
                        <span>💧 Moisture: ${sensor.moisture}%</span>
                    </div>
                </div>
                <div class="priority-badge ${priorityClass}">P: ${priority}</div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function handleUpdateQueue() {
    if (maxHeap.size() === 0) {
        showMessage('priorityQueueContainer', '⚠️ No sensors available to queue', 'error');
        return;
    }
    displayIrrigationQueue();
    updateDashboard();
    showMessage('priorityQueueContainer', '✓ Irrigation queue updated!', 'success');
}

function handleSimulateIrrigation() {
    // Edge Case 6: Heap underflow
    if (maxHeap.isEmpty()) {
        showMessage('irrigationLog', '❌ HEAP UNDERFLOW: Cannot pop from empty queue', 'error');
        return;
    }

    const logContainer = document.getElementById('irrigationLog');
    const logTitle = document.createElement('div');
    logTitle.className = 'log-title active';
    logTitle.innerHTML = '<h4 style="color: #2ecc71;">🚿 Irrigation Simulation Log</h4>';
    logContainer.innerHTML = '';
    logContainer.appendChild(logTitle);

    // Make a copy of heap to avoid modifying original
    const tempHeap = new MaxHeap();
    maxHeap.getAll().forEach(s => tempHeap.push(s));

    const simulateNext = () => {
        try {
            if (tempHeap.isEmpty()) {
                const finalEntry = document.createElement('div');
                finalEntry.className = 'log-entry';
                finalEntry.innerHTML = `<strong>✓ SUCCESS:</strong> All sensors irrigated! Queue is now empty.`;
                logContainer.appendChild(finalEntry);
                return;
            }

            const sensor = tempHeap.pop();
            const priority = 100 - sensor.moisture;
            const entry = document.createElement('div');
            entry.className = 'log-entry';
            entry.innerHTML = `
                <strong>>> Irrigating</strong> Sensor #${sensor.id} 
                (Moisture: ${sensor.moisture}%, Priority: ${priority})
            `;
            logContainer.appendChild(entry);
            logContainer.scrollTop = logContainer.scrollHeight;

            setTimeout(simulateNext, 500);
        } catch (error) {
            const errorEntry = document.createElement('div');
            errorEntry.className = 'log-entry';
            errorEntry.style.color = 'var(--danger-color)';
            errorEntry.innerHTML = `<strong>❌ ERROR:</strong> ${error.message}`;
            logContainer.appendChild(errorEntry);
        }
    };

    simulateNext();
}

// ========== DASHBOARD ==========
function updateDashboard() {
    const sensors = avlTree.inOrder();

    // Update header info
    document.getElementById('sensorCount').textContent = `Sensors: ${sensors.length}`;
    
    if (sensors.length > 0) {
        document.getElementById('systemStatus').textContent = 'Status: Active';
    } else {
        document.getElementById('systemStatus').textContent = 'Status: Ready';
    }

    // Update dashboard cards
    document.getElementById('dashSensorCount').textContent = sensors.length;

    if (sensors.length > 0) {
        const avgMoisture = (sensors.reduce((sum, s) => sum + s.moisture, 0) / sensors.length).toFixed(1);
        document.getElementById('dashAvgMoisture').textContent = avgMoisture + '%';

        const criticalCount = sensors.filter(s => s.moisture < 30).length;
        document.getElementById('dashCritical').textContent = criticalCount;
    } else {
        document.getElementById('dashAvgMoisture').textContent = '0%';
        document.getElementById('dashCritical').textContent = '0';
    }

    if (mstData) {
        document.getElementById('dashMSTCost').textContent = mstData.totalCost + ' units';
    } else {
        document.getElementById('dashMSTCost').textContent = '--';
    }
}

// ========== RESET DATA ==========
function handleResetData() {
    if (confirm('⚠️ Are you sure you want to reset all data? This action cannot be undone.')) {
        avlTree = new AVLTree();
        maxHeap = new MaxHeap();
        mstData = null;
        insertionLog = [];
        localStorage.removeItem('adsProjectData');
        
        // Reset UI
        document.querySelector('.sensor-form').reset();
        document.getElementById('moistureBar').style.width = '0%';
        document.getElementById('insertMessage').innerHTML = '';
        document.getElementById('registryContainer').innerHTML = '<p class="empty-message">📭 No sensors available. Insert sensors to populate the registry.</p>';
        document.getElementById('mstContainer').innerHTML = '<p class="empty-message">No MST calculated yet. Click "Calculate MST" to optimize the network.</p>';
        document.getElementById('priorityQueueContainer').innerHTML = '<p class="empty-message">💧 No irrigation queue. Insert sensors to populate the schedule.</p>';
        document.getElementById('irrigationLog').innerHTML = '';
        
        updateDashboard();
        
        alert('✓ All data has been reset!');
    }
}

// ========== UTILITY FUNCTIONS ==========
function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    element.innerHTML = message;
    element.className = `message ${type}`;
}

// ========== LOCAL STORAGE ==========
function saveDataToStorage() {
    const sensors = avlTree.inOrder();
    const data = {
        sensors: sensors,
        mstData: mstData,
        insertionLog: insertionLog
    };
    localStorage.setItem('adsProjectData', JSON.stringify(data));
}

function loadDataFromStorage() {
    const data = localStorage.getItem('adsProjectData');
    if (data) {
        try {
            const parsed = JSON.parse(data);
            
            // Reconstruct AVL Tree from stored sensors
            if (parsed.sensors && Array.isArray(parsed.sensors)) {
                parsed.sensors.forEach(sensor => {
                    avlTree.insert(sensor);
                    maxHeap.push(sensor);
                });
            }

            mstData = parsed.mstData || null;
            insertionLog = parsed.insertionLog || [];
        } catch (error) {
            console.error('Error loading data from storage:', error);
            // If storage is corrupted, continue with empty state
        }
    }
}
