const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const ORDERS_FILE = path.join(__dirname, 'orders.json');
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files for convenience if needed

// Add support for DELETE method queries
app.use(express.urlencoded({ extended: true }));

// Ensure data files exist
if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify({}, null, 4));
}
if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify([], null, 4));
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

app.get('/api/products', (req, res) => {
    try {
        const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
        res.status(200).json({ products });
    } catch (error) {
        console.error("Failed to get products:", error);
        res.status(500).json({ products: [] });
    }
});

app.post('/api/products', (req, res) => {
    try {
        const newProduct = req.body;
        let products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
        products.push(newProduct);
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 4));
        res.status(200).json({ success: true, message: 'Product saved' });
    } catch (error) {
        console.error("Failed to save product:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.delete('/api/products', (req, res) => {
    try {
        const productId = req.query.id;
        let products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
        const filteredProducts = products.filter(p => String(p.id) !== String(productId));
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(filteredProducts, null, 4));
        res.status(200).json({ success: true, message: 'Product deleted' });
    } catch (error) {
        console.error("Failed to delete product:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Laance Store API Server running on http://localhost:${PORT}`);
});
