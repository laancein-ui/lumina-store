const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const ORDERS_FILE = path.join(__dirname, 'orders.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files for convenience if needed

// Ensure orders file exists
if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify({}, null, 4));
}

app.post('/api/orders', (req, res) => {
    try {
        const orderId = req.body.orderId;
        const orderData = req.body.orderData;

        let orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
        orders[orderId] = orderData;

        fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 4));

        res.status(200).json({ success: true, message: 'Order saved securely' });
    } catch (error) {
        console.error("Failed to save order:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Lumina Store API Server running on http://localhost:${PORT}`);
});
