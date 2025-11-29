// --- ARCHITECTURE DIAGRAM LOGIC (Generic/Anonymized Names) ---

const canvas = document.getElementById('architectureCanvas');
const ctx = canvas.getContext('2d');
const tooltip = document.getElementById('tooltip');
const container = document.getElementById('diagram-container');

// Configuration
const config = {
    padding: 80,
    boxWidth: 170,
    boxHeight: 90,
    gapX: 140,
    gapY: 120,
    colors: {
        service: '#64748b', // Main API
        worker: '#475569', // Workers
        db: '#f59e0b', // DB
        ai: '#8b5cf6', // AI
        external: '#10b981', // External Systems
        git: '#334155', // Git
        human: '#ef4444', // Editor
        tool: '#06b6d4', // Crawlers
        text: '#1e293b',
        line: '#94a3b8',
        systemBg: '#f8fafc',
        systemBorder: '#cbd5e1'
    }
};

let view = {
    x: 0,
    y: 0,
    zoom: 1,
    isDragging: false,
    startX: 0,
    startY: 0
};
let activeNodeId = null;
let nodes = [];
let connections = [];

// --- FLOW DEFINITIONS ---
const flows = {
    'api': ['runners', 'crawlmate', 'editor', 'db', 'supermind', 'unimind', 'headless', 'workers'],
    'workers': ['db', 'supermind', 'pubsub', 'headless'],
    'runners': ['api', 'git'],
    'crawlmate': ['api', 'git'],
    'git': ['runners', 'crawlmate'],
    'editor': ['api'],
    'db': ['api', 'workers', 'editor'],
    'supermind': ['api', 'workers'],
    'pubsub': ['workers'],
    'unimind': ['api'],
    'headless': ['workers', 'api']
};

function initNodes() {
    const cx = 0;
    const cy = 0;

    // --- CENTER COLUMN ---
    const api = {
        id: 'api',
        group: 'internal',
        label: 'Main API\n(Gateway)',
        x: cx,
        y: cy,
        color: config.colors.service,
        desc: "Central Gateway."
    };

    const unimind = {
        id: 'unimind',
        group: 'external',
        label: 'Store Master\n(External Source)',
        x: cx,
        y: cy - 220,
        color: config.colors.external,
        desc: "Syncs store lists."
    };

    const workers = {
        id: 'workers',
        group: 'internal',
        label: 'Backend Workers\n(Cron Job)',
        x: cx,
        y: cy + 300,
        color: config.colors.worker,
        desc: "Background processing jobs."
    };

    const pubsub = {
        id: 'pubsub',
        group: 'external',
        label: 'Pub/Sub Stream\n(Data Pipeline)',
        x: cx,
        y: cy + 620,
        color: config.colors.external,
        desc: "Output Data Stream."
    };

    // --- LEFT COLUMN ---
    const runners = {
        id: 'runners',
        group: 'internal',
        label: 'Local Crawlers\n(Runners)',
        x: cx - 350,
        y: cy,
        color: config.colors.tool,
        desc: "Executes scraping tasks."
    };

    const crawlmate = {
        id: 'crawlmate',
        group: 'internal',
        label: 'Crawler Generator\n(Code Engine)',
        x: cx - 350,
        y: cy + 220,
        color: config.colors.tool,
        desc: "Generates crawler code."
    };

    const headless = {
        id: 'headless',
        group: 'internal',
        label: 'Headless Browsers\n(Auto-Runners)',
        x: cx - 350,
        y: cy + 440,
        color: config.colors.tool,
        desc: "Automated headless browsers."
    };

    const git = {
        id: 'git',
        group: 'external',
        label: 'Git Repo\n(Version Control)',
        x: cx - 620,
        y: cy + 110,
        color: config.colors.git,
        desc: "Stores crawler code."
    };

    // --- RIGHT COLUMN ---
    const editor = {
        id: 'editor',
        group: 'internal',
        label: 'Editor Dashboard\n(Human Verify)',
        x: cx + 300,
        y: cy + 150,
        color: config.colors.human,
        desc: "Curators verify coupons."
    };

    const db = {
        id: 'db',
        group: 'internal',
        label: 'Database\n(Coupons)',
        x: cx + 480,
        y: cy + 300,
        color: config.colors.db,
        desc: "Central Storage."
    };

    const supermind = {
        id: 'supermind',
        group: 'external',
        label: 'AI Brain\n(External Service)',
        x: cx + 750,
        y: cy + 150,
        color: config.colors.ai,
        desc: "External AI Service."
    };

    nodes = [api, workers, db, runners, crawlmate, editor, git, supermind, pubsub, unimind, headless];

    // --- CONNECTIONS ---
    connections = [
        // (0) Sync
        {
            from: 'unimind',
            to: 'api',
            label: '(0) Sync Stores',
            fromSide: 'bottom',
            toSide: 'top'
        },

        // (1) Proxy AI
        {
            from: 'api',
            to: 'supermind',
            label: '(1e/f) Proxy DOM/Selectors',
            dashed: true,
            fromSide: 'top',
            fromShift: 30,
            toSide: 'top',
            toShift: 0
        },

        // CRAWLER SIDE
        {
            from: 'runners',
            to: 'api',
            label: '(2a/b) Get Stores',
            fromSide: 'right',
            fromShift: -30,
            toSide: 'left',
            toShift: -30
        },
        {
            from: 'runners',
            to: 'api',
            label: '(2e) Submit',
            fromSide: 'right',
            fromShift: 0,
            toSide: 'left',
            toShift: 0
        },

        {
            from: 'runners',
            to: 'git',
            label: '(2c) Pull',
            fromSide: 'left',
            toSide: 'top'
        },
        {
            from: 'crawlmate',
            to: 'git',
            label: '(1i) Push',
            fromSide: 'left',
            toSide: 'bottom'
        },
        {
            from: 'crawlmate',
            to: 'api',
            label: '(1a-g) Store & DOM Loop',
            fromSide: 'right',
            toSide: 'left',
            toShift: 30
        },

        // HEADLESS
        {
            from: 'headless',
            to: 'workers',
            label: '(2.1b) Submit',
            fromSide: 'top',
            fromShift: 60,
            toSide: 'left',
            toShift: -20
        },
        {
            from: 'workers',
            to: 'headless',
            label: '(2.1a) Trigger',
            dashed: true,
            fromSide: 'left',
            fromShift: 20,
            toSide: 'right',
            toShift: 0
        },

        // DATA SIDE
        {
            from: 'api',
            to: 'db',
            label: '(2f) Store Raw',
            fromSide: 'right',
            fromShift: -30,
            toSide: 'top',
            toShift: 40
        },
        {
            from: 'api',
            to: 'db',
            label: '(4b) Fetch Query',
            fromSide: 'right',
            fromShift: 0,
            toSide: 'top',
            toShift: 0
        },
        {
            from: 'api',
            to: 'db',
            label: '(4e) Save Edit',
            fromSide: 'right',
            fromShift: 30,
            toSide: 'top',
            toShift: -40
        },

        // Editor Flow
        {
            from: 'api',
            to: 'editor',
            label: '(4a/c) Fetch Loop',
            fromSide: 'bottom',
            fromShift: -30,
            toSide: 'left',
            toShift: 20
        },
        {
            from: 'editor',
            to: 'api',
            label: '(4d) Submit Edit',
            fromSide: 'left',
            fromShift: -20,
            toSide: 'bottom',
            toShift: 30
        },

        // WORKER ZONE
        {
            from: 'db',
            to: 'workers',
            label: '(3a) Poll Pending',
            dashed: true,
            fromSide: 'left',
            fromShift: -30,
            toSide: 'right',
            toShift: -30
        },
        {
            from: 'workers',
            to: 'db',
            label: '(3e) Save Processed',
            fromSide: 'right',
            fromShift: 0,
            toSide: 'left',
            toShift: 0
        },
        {
            from: 'db',
            to: 'workers',
            label: '(5a) Poll Done',
            dashed: true,
            fromSide: 'left',
            fromShift: 30,
            toSide: 'right',
            toShift: 30
        },
        {
            from: 'workers',
            to: 'supermind',
            label: '(3c/d) AI Clean',
            fromSide: 'bottom',
            fromShift: 60,
            toSide: 'bottom',
            toShift: 0
        },
        {
            from: 'workers',
            to: 'pubsub',
            label: '(5b) Publish',
            fromSide: 'bottom',
            toSide: 'top'
        }
    ];
}

function drawSystemBox() {
    const internalNodes = nodes.filter(n => n.group === 'internal');
    if (internalNodes.length === 0) return;
    let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity;
    internalNodes.forEach(n => {
        if (n.x < minX) minX = n.x;
        if (n.x + config.boxWidth > maxX) maxX = n.x + config.boxWidth;
        if (n.y < minY) minY = n.y;
        if (n.y + config.boxHeight > maxY) maxY = n.y + config.boxHeight;
    });
    const padding = 60;
    ctx.save();
    ctx.fillStyle = config.colors.systemBg;
    ctx.beginPath();
    ctx.roundRect(minX - padding, minY - padding - 30, (maxX - minX) + padding * 2, (maxY - minY) + padding * 2 + 30, 24);
    ctx.fill();
    ctx.strokeStyle = config.colors.systemBorder;
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.stroke();
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText("CORE SYSTEM", minX - padding + 25, minY - padding - 15);
    ctx.restore();
}

function getPort(node, side, shift = 0) {
    const w = config.boxWidth;
    const h = config.boxHeight;
    let x = node.x + w / 2;
    let y = node.y + h / 2;
    switch (side) {
        case 'top':
            y = node.y;
            x += shift;
            break;
        case 'bottom':
            y = node.y + h;
            x += shift;
            break;
        case 'left':
            x = node.x;
            y += shift;
            break;
        case 'right':
            x = node.x + w;
            y += shift;
            break;
    }
    return {
        x,
        y
    };
}

function drawConnection(conn) {
    const fromNode = nodes.find(n => n.id === conn.from);
    const toNode = nodes.find(n => n.id === conn.to);
    if (!fromNode || !toNode) return;

    const isActive = isConnectionActive(conn);
    ctx.save();
    if (!isActive) ctx.globalAlpha = 0.2;

    const start = getPort(fromNode, conn.fromSide, conn.fromShift);
    const end = getPort(toNode, conn.toSide, conn.toShift);
    const startX = start.x;
    const startY = start.y;
    const endX = end.x;
    const endY = end.y;

    const dx = endX - startX;
    const dy = endY - startY;
    const r = 5;

    ctx.beginPath();
    ctx.moveTo(startX, startY);

    // 1. Proxy AI (Overhead) - Rounded
    if (conn.label.includes("Proxy DOM")) {
        const topY = startY - 40;
        ctx.lineTo(startX, topY + r);
        ctx.arcTo(startX, topY, endX, topY, r); // Curve 1
        ctx.arcTo(endX, topY, endX, endY, r); // Curve 2
        ctx.lineTo(endX, endY);
    }
    // 2. Bottom-to-Bottom Loops (Under-Loop) - Rounded
    else if (conn.fromSide === 'bottom' && conn.toSide === 'bottom') {
        // Dynamic height based on label to prevent overlap (40 for Submit, 60 for AI)
        const offset = conn.label.includes("Submit") ? 40 : 60;
        const lowestY = Math.max(startY, endY) + offset;

        ctx.lineTo(startX, lowestY - r);
        ctx.arcTo(startX, lowestY, endX, lowestY, r); // Curve 1
        ctx.arcTo(endX, lowestY, endX, endY, r); // Curve 2
        ctx.lineTo(endX, endY);
    } else {
        if ((conn.fromSide === 'right' && conn.toSide === 'left') || (conn.fromSide === 'left' && conn.toSide === 'right')) {
            const midX = (startX + endX) / 2;
            ctx.lineTo(midX - (dx > 0 ? r : -r), startY);
            ctx.arcTo(midX, startY, midX, startY + (dy > 0 ? r : -r), r);
            ctx.lineTo(midX, endY - (dy > 0 ? r : -r));
            ctx.arcTo(midX, endY, endX, endY, r);
            ctx.lineTo(endX, endY);
        } else if ((conn.fromSide === 'bottom' && conn.toSide === 'top') || (conn.fromSide === 'top' && conn.toSide === 'bottom')) {
            const midY = (startY + endY) / 2;
            ctx.lineTo(startX, midY - (dy > 0 ? r : -r));
            ctx.arcTo(startX, midY, startX + (dx > 0 ? r : -r), midY, r);
            ctx.lineTo(endX - (dx > 0 ? r : -r), midY);
            ctx.arcTo(endX, midY, endX, endY, r);
            ctx.lineTo(endX, endY);
        } else {
            let cornerX, cornerY;
            if (conn.fromSide === 'left' || conn.fromSide === 'right') {
                cornerX = endX;
                cornerY = startY;
                ctx.lineTo(cornerX - (dx > 0 ? r : -r), cornerY);
                ctx.arcTo(cornerX, cornerY, cornerX, endY, r);
            } else {
                cornerX = startX;
                cornerY = endY;
                ctx.lineTo(cornerX, cornerY - (dy > 0 ? r : -r));
                ctx.arcTo(cornerX, cornerY, endX, cornerY, r);
            }
            ctx.lineTo(endX, endY);
        }
    }

    ctx.strokeStyle = isActive ? config.colors.line : '#cbd5e1';
    ctx.lineWidth = isActive ? 2 : 1;
    if (conn.dashed) ctx.setLineDash([6, 4]);
    ctx.stroke();

    let angle = 0;
    if (conn.toSide === 'left') angle = 0;
    else if (conn.toSide === 'right') angle = Math.PI;
    else if (conn.toSide === 'top') angle = Math.PI / 2;
    else if (conn.toSide === 'bottom') angle = -Math.PI / 2;
    const headLen = 8;
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - headLen * Math.cos(angle - Math.PI / 6), endY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(endX - headLen * Math.cos(angle + Math.PI / 6), endY - headLen * Math.sin(angle + Math.PI / 6));
    ctx.fillStyle = isActive ? config.colors.line : '#cbd5e1';
    ctx.fill();

    if (conn.label) {
        let lx, ly;
        if (conn.label.includes("Proxy DOM")) {
            lx = (startX + endX) / 2;
            ly = startY - 40;
        } else if (conn.label.includes("Submit Edit")) {
            lx = (startX + endX) / 2;
            ly = Math.max(startY, endY) + 45;
        } else if (conn.label.includes("(4a/c)")) {
            lx = (startX + endX) / 2;
            ly = Math.max(startY, endY) - 55;
        } else if (conn.label.includes("(2.1b) Submit")) {
            lx = (startX + endX) / 2;
            ly = endY;
        } else if (conn.label.includes("AI Clean")) {
            lx = (startX + endX) / 2;
            ly = Math.max(startY, endY) + 60;
        } else if (conn.label.includes("Store Raw")) {
            lx = startX + 50;
            ly = startY;
        } else if (conn.label.includes("Fetch Query")) {
            lx = startX + 80;
            ly = startY;
        } else if (conn.label.includes("Save Edit")) {
            lx = startX + 110;
            ly = startY;
        } else if (conn.fromSide === 'left' || conn.fromSide === 'right') {
            lx = (startX + endX) / 2;
            ly = Math.abs(dy) < 40 ? startY : (startY + endY) / 2;
        } else {
            lx = Math.abs(dx) < 40 ? startX : (startX + endX) / 2;
            ly = (startY + endY) / 2;
        }

        const textWidth = ctx.measureText(conn.label).width + 16;
        ctx.setLineDash([]);
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.roundRect(lx - textWidth / 2, ly - 12, textWidth, 24, 6);
        ctx.fill();
        ctx.strokeStyle = isActive ? '#e2e8f0' : '#f1f5f9';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = isActive ? '#64748b' : '#94a3b8';
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(conn.label, lx, ly);
    }
    ctx.restore();
}

function drawNode(node) {
    const isActive = isNodeActive(node.id);
    ctx.save();
    if (!isActive) ctx.globalAlpha = 0.2;
    ctx.fillStyle = 'white';
    ctx.shadowColor = isActive ? 'rgba(0, 0, 0, 0.15)' : 'transparent';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 5;
    ctx.fillRect(node.x, node.y, config.boxWidth, config.boxHeight);
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = node.color;
    ctx.lineWidth = isActive ? 3 : 1;
    ctx.fillRect(node.x, node.y, config.boxWidth, config.boxHeight);
    ctx.strokeRect(node.x, node.y, config.boxWidth, config.boxHeight);
    ctx.fillStyle = node.color;
    ctx.fillRect(node.x, node.y, config.boxWidth, 6);
    ctx.fillStyle = config.colors.text;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const lines = node.label.split('\n');
    const lineHeight = 18;
    const textStartY = node.y + (config.boxHeight / 2) + 4;
    lines.forEach((line, i) => {
        ctx.fillStyle = i === 0 ? '#0f172a' : '#64748b';
        ctx.font = i === 0 ? 'bold 13px Inter, sans-serif' : '11px Inter, sans-serif';
        ctx.fillText(line, node.x + (config.boxWidth / 2), textStartY + ((i - (lines.length - 1) / 2) * lineHeight));
    });
    ctx.restore();
}

function isNodeActive(nodeId) {
    if (!activeNodeId) return true;
    if (nodeId === activeNodeId) return true;
    const relatives = flows[activeNodeId] || [];
    return relatives.includes(nodeId);
}

function isConnectionActive(conn) {
    if (!activeNodeId) return true;
    const relatives = flows[activeNodeId] || [];
    const isFromActive = conn.from === activeNodeId || relatives.includes(conn.from);
    const isToActive = conn.to === activeNodeId || relatives.includes(conn.to);
    return isFromActive && isToActive;
}

function draw() {
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.translate(view.x, view.y);
    ctx.scale(view.zoom, view.zoom);
    drawSystemBox();
    connections.forEach(drawConnection);
    nodes.forEach(drawNode);
    ctx.restore();
}

function centerView() {
    const rect = container.getBoundingClientRect();
    initNodes();
    let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity;
    nodes.forEach(n => {
        if (n.x < minX) minX = n.x;
        if (n.x + config.boxWidth > maxX) maxX = n.x + config.boxWidth;
        if (n.y < minY) minY = n.y;
        if (n.y + config.boxHeight > maxY) maxY = n.y + config.boxHeight;
    });
    const diagWidth = maxX - minX;
    view.zoom = 0.50;
    view.x = (rect.width - diagWidth * view.zoom) / 2 - (minX * view.zoom);
    view.y = (rect.height - (maxY - minY) * view.zoom) / 2 - (minY * view.zoom) - 60;
    draw();
}

function focusOnFlow() {
    if (!activeNodeId) {
        centerView();
        return;
    }
    const related = flows[activeNodeId] || [];
    const targetIds = [activeNodeId, ...related];
    let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity;
    const targetNodes = nodes.filter(n => targetIds.includes(n.id));
    if (targetNodes.length === 0) return;
    targetNodes.forEach(n => {
        if (n.x < minX) minX = n.x;
        if (n.x + config.boxWidth > maxX) maxX = n.x + config.boxWidth;
        if (n.y < minY) minY = n.y;
        if (n.y + config.boxHeight > maxY) maxY = n.y + config.boxHeight;
    });
    const pad = 100;
    const boxW = maxX - minX + (pad * 2);
    const boxH = maxY - minY + (pad * 2);
    const boxCenterX = minX - pad + (boxW / 2);
    const boxCenterY = minY - pad + (boxH / 2);
    const containerW = container.offsetWidth;
    const containerH = container.offsetHeight || 600;
    let targetZoom = Math.min(containerW / boxW, containerH / boxH);
    targetZoom = Math.min(targetZoom, 1.2);
    targetZoom = Math.max(targetZoom, 0.4);
    view.zoom = targetZoom;
    view.x = (containerW / 2) - (boxCenterX * view.zoom);
    view.y = (containerH / 2) - (boxCenterY * view.zoom);
    draw();
}

function toWorldPos(screenX, screenY) {
    return {
        x: (screenX - view.x) / view.zoom,
        y: (screenY - view.y) / view.zoom
    };
}

let isDragging = false;
let startDragX = 0;
let startDragY = 0;
let hasMoved = false;
canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    hasMoved = false;
    startDragX = e.clientX;
    startDragY = e.clientY;
    view.startX = e.clientX - view.x;
    view.startY = e.clientY - view.y;
    canvas.style.cursor = 'grabbing';
});

canvas.addEventListener('mouseup', (e) => {
    isDragging = false;
    canvas.style.cursor = 'default';
    if (!hasMoved) {
        const rect = canvas.getBoundingClientRect();
        const worldPos = toWorldPos(e.clientX - rect.left, e.clientY - rect.top);
        let clickedNode = null;
        nodes.forEach(node => {
            if (worldPos.x > node.x && worldPos.x < node.x + config.boxWidth && worldPos.y > node.y && worldPos.y < node.y + config.boxHeight) clickedNode = node.id;
        });
        activeNodeId = (activeNodeId === clickedNode) ? null : clickedNode;
        focusOnFlow();
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        if (Math.abs(e.clientX - startDragX) > 5 || Math.abs(e.clientY - startDragY) > 5) hasMoved = true;
        view.x = e.clientX - view.startX;
        view.y = e.clientY - view.startY;
        draw();
    } else {
        const rect = canvas.getBoundingClientRect();
        const worldPos = toWorldPos(e.clientX - rect.left, e.clientY - rect.top);
        let hovered = false;
        nodes.forEach(node => {
            if (worldPos.x > node.x && worldPos.x < node.x + config.boxWidth && worldPos.y > node.y && worldPos.y < node.y + config.boxHeight) {
                if (isNodeActive(node.id)) {
                    tooltip.innerHTML = `<div style="margin-bottom:4px; font-weight:bold; color:#fbbf24">${node.label.replace('\n', ' ')}</div><div style="font-weight:300; opacity:0.9">${node.desc.replace(/\n/g, '<br>')}</div>`;
                    tooltip.style.opacity = 1;
                    const tipWidth = tooltip.offsetWidth;
                    const tipHeight = tooltip.offsetHeight;
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;
                    let finalX = mouseX + 20;
                    if (mouseX + 20 + tipWidth > rect.width) finalX = mouseX - tipWidth - 20;
                    let finalY = mouseY + 20;
                    if (mouseY + 20 + tipHeight > rect.height) finalY = mouseY - tipHeight - 20;
                    tooltip.style.left = `${finalX}px`;
                    tooltip.style.top = `${finalY}px`;
                    canvas.style.cursor = 'pointer';
                    hovered = true;
                }
            }
        });
        if (!hovered) {
            tooltip.style.opacity = 0;
            canvas.style.cursor = 'default';
        }
    }
});
canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomIntensity = 0.1;
    const direction = e.deltaY > 0 ? -1 : 1;
    const newZoom = view.zoom + (direction * zoomIntensity);
    if (newZoom >= 0.3 && newZoom <= 3) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const worldPos = toWorldPos(mouseX, mouseY);
        view.zoom = newZoom;
        view.x = mouseX - worldPos.x * view.zoom;
        view.y = mouseY - worldPos.y * view.zoom;
        draw();
    }
});

window.addEventListener('resize', centerView);

function resetView() {
    activeNodeId = null;
    centerView();
}

window.addEventListener('load', centerView);