/* =========================================================================
   LUMINA - SPA Application Logic
   ========================================================================= */

// Mock Database & Inventory Management
const defaultProducts = [
    {
        id: 1,
        name: "Lumina Pro X ANC",
        price: 349,
        image: "assets/product_headphones_1772226325362.png",
        desc: "Experience pure audio bliss with industry-leading noise cancellation. Perfect for audiophiles, featuring 40hr battery life, spatial audio, and memory foam earcups."
    },
    {
        id: 2,
        name: "Zenith Health + Titanium",
        price: 599,
        image: "assets/product_smartwatch_1772226340060.png",
        desc: "A sleek, aerospace-grade titanium smartwatch. Features an ultra-bright OLED display, ECG tracking, 100+ sports modes, and a comfortable silicone strap."
    },
    {
        id: 3,
        name: "Aero Glide Velocity",
        price: 189,
        image: "assets/product_sneakers_1772226357442.png",
        desc: "Engineered for speed and comfort. These aesthetic white and neon-blue accented minimalist sneakers offer responsive cushioning and a breathable mesh upper."
    }
];

let products = JSON.parse(localStorage.getItem('lumina_products')) || defaultProducts;

function saveProducts() {
    localStorage.setItem('lumina_products', JSON.stringify(products));
}

// App State
const state = {
    cart: [],
    currentView: 'home',
    currentProductId: null,
    isAdmin: sessionStorage.getItem('lumina_admin') === 'true',
    orders: JSON.parse(localStorage.getItem('lumina_orders')) || {
        'LUM-84920': {
            items: [{ name: 'Lumina Pro X ANC', price: 349, quantity: 1 }],
            total: 349,
            shipping: { address: '123 Fake St, NY', date: '2023-11-01' },
            timeline: [
                { date: 'Oct 24, 09:00 AM', title: 'Order Placed', completed: true },
                { date: 'Oct 28, 10:00 AM', title: 'Out for Delivery', completed: false }
            ]
        }
    }
};

function saveOrders() {
    localStorage.setItem('lumina_orders', JSON.stringify(state.orders));
}

// DOM Elements
const appRoot = document.getElementById('app-root');
const cartCount = document.getElementById('cart-count');
const cartTrigger = document.getElementById('cart-trigger');
const modalOverlay = document.getElementById('modal-overlay');
const checkoutModal = document.getElementById('checkout-modal');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Initialize App
function init() {
    setupNavigation();
    setupModal();
    renderView('home');
}

// =========================================================================
// Router & Navigation
// =========================================================================
function setupNavigation() {
    document.querySelectorAll('[data-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = e.currentTarget.getAttribute('data-link');

            // Update active state in nav
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            if (e.currentTarget.tagName === 'A') e.currentTarget.classList.add('active');

            renderView(route);
        });
    });
}

function renderView(viewName, params = {}) {
    state.currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (viewName) {
        case 'home':
            appRoot.innerHTML = renderHome();
            bindHomeEvents();
            break;
        case 'product':
            appRoot.innerHTML = renderProductDetail(params.id);
            bindProductEvents();
            break;
        case 'orders':
            appRoot.innerHTML = renderOrders();
            // Optional: bind events for orders view if needed
            break;
        case 'admin':
            appRoot.innerHTML = renderAdmin();
            bindAdminEvents();
            break;
        case 'tracking':
            appRoot.innerHTML = renderTracking();
            bindTrackingEvents();
            break;
    }
}

// =========================================================================
// Views
// =========================================================================

function renderHome() {
    return `
        <div class="section hero">
            <div class="hero-content">
                <h1>Elevate your daily <br><span>Experience.</span></h1>
                <p>Discover the perfect intersection of minimalist design and high-end technology. Your next upgrade is here.</p>
                <div style="display: flex; gap: 1rem;">
                    <a href="#" class="btn" onclick="document.getElementById('products-grid').scrollIntoView({behavior: 'smooth'})">Expolore Collection</a>
                </div>
            </div>
            <div class="hero-image-wrap">
                <img src="assets/ecommerce_hero_banner_1772226290327.png" alt="Lumina Premium Devices" class="hero-image">
            </div>
        </div>

        <div class="section" id="products-grid">
            <h2 class="section-title">Featured Innovation</h2>
            <div class="products-grid">
                ${products.map(p => `
                    <div class="product-card" data-id="${p.id}">
                        <img src="${p.image}" alt="${p.name}" class="product-image">
                        <div class="product-info">
                            <div>
                                <h3 class="product-title">${p.name}</h3>
                                <div class="product-price">$${p.price}</div>
                            </div>
                        </div>
                        <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                            <button class="btn add-to-cart-btn" data-id="${p.id}" style="flex: 1;">Add to Cart</button>
                            <button class="btn btn-secondary order-now-btn" data-id="${p.id}" style="flex: 1;">Order Now</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function bindHomeEvents() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent trigger if clicking "Add to Cart" or "Order Now" directly
            if (e.target.classList.contains('add-to-cart-btn') || e.target.classList.contains('order-now-btn')) return;
            const id = parseInt(card.getAttribute('data-id'));
            renderView('product', { id });
        });
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            addToCart(id);
        });
    });

    document.querySelectorAll('.order-now-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            startOrderNowFlow(id);
        });
    });
}

function renderProductDetail(id) {
    const product = products.find(p => p.id === id);
    if (!product) return renderHome();

    return `
        <div class="section">
            <div class="product-detail-view">
                <div class="detail-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="detail-info">
                    <div style="color: var(--primary); font-weight: 600; font-size: 1rem; margin-bottom: 0.5rem; text-transform: uppercase;">Premium Series</div>
                    <h1>${product.name}</h1>
                    <div class="price">$${product.price}</div>
                    <p class="desc">${product.desc}</p>
                    <div class="detail-actions">
                        <button class="btn add-to-cart-btn-main" data-id="${product.id}" style="width: auto; padding: 1rem 3rem;">
                            <i class='bx bx-shopping-bag'></i> Add to Cart
                        </button>
                        <button class="btn btn-secondary order-now-btn-main" data-id="${product.id}">Order Now</button>
                    </div>
                    
                    <div style="margin-top: 3rem; border-top: 1px solid var(--border-light); padding-top: 2rem;">
                        <div style="display: flex; gap: 2rem; color: var(--text-muted);">
                            <div><i class='bx bx-check-shield'></i> 1 Year Warranty</div>
                            <div><i class='bx bx-package'></i> Free Global Shipping</div>
                            <div><i class='bx bx-reset'></i> 30-Day Returns</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function bindProductEvents() {
    const addBtn = document.querySelector('.add-to-cart-btn-main');
    if (addBtn) {
        addBtn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            addToCart(id);
        });
    }

    const buyBtn = document.querySelector('.order-now-btn-main');
    if (buyBtn) {
        buyBtn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            startOrderNowFlow(id);
        });
    }
}

function renderTracking() {
    return `
        <div class="section">
            <div style="text-align: center; margin-bottom: 4rem;">
                <h1 style="font-size: 3.5rem; margin-bottom: 1rem;">Track Delivery</h1>
                <p style="font-size: 1.25rem; max-width: 600px; margin: 0 auto;">Enter your tracking number below to see the real-time status of your premium gear.</p>
            </div>
            
            <div class="tracking-container">
                <form class="tracking-form" id="tracking-form">
                    <input type="text" id="tracking-input" class="input-field" placeholder="e.g. LUM-84920" required>
                    <button type="submit" class="btn"><i class='bx bx-search'></i></button>
                </form>
                
                <div id="tracking-result">
                    <!-- Default state / example state -->
                    <div style="text-align: center; color: var(--text-muted); padding: 2rem 0;">
                        <i class='bx bx-package' style="font-size: 4rem; opacity: 0.5; margin-bottom: 1rem;"></i>
                        <p>Awaiting valid tracking number (Try LUM-84920)</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function bindTrackingEvents() {
    const form = document.getElementById('tracking-form');
    const input = document.getElementById('tracking-input');
    const result = document.getElementById('tracking-result');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const number = input.value.trim().toUpperCase();

        if (state.orders[number]) {
            // Also support extracting array directly for backwards compat with mock
            const orderData = state.orders[number];
            const timeline = Array.isArray(orderData) ? orderData : orderData.timeline;

            result.innerHTML = `
                <h3 style="margin-bottom: 2rem;">Order Status: <span style="color: var(--primary)">${number}</span></h3>
                ${!Array.isArray(orderData) && orderData.shipping ? `
                    <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; border: 1px solid var(--border-light); text-align: left;">
                        <h4 style="margin-bottom: 0.5rem; color: var(--text-muted);">Delivery Details</h4>
                        <p><strong>Address:</strong> ${orderData.shipping.address}</p>
                        <p><strong>Scheduled:</strong> ${orderData.shipping.date}</p>
                    </div>
                ` : ''}
                <div class="timeline" style="text-align: left;">
                    ${timeline.map(item => `
                        <div class="timeline-item ${item.completed ? 'completed' : ''}">
                            <div class="timeline-date">${item.date}</div>
                            <div class="timeline-title" style="color: ${item.completed ? 'white' : 'var(--text-muted)'}">${item.title}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            result.innerHTML = `
                <div style="text-align: center; color: #ef4444; padding: 2rem 0;">
                    <i class='bx bx-error-circle' style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Order not found. Please check your tracking number.</p>
                </div>
            `;
        }
    });
}

// =========================================================================
// Creator Access Dashboard (Admin)
// =========================================================================

function renderAdmin() {
    if (!state.isAdmin) {
        return `
            <div class="section" style="max-width: 500px; margin: 0 auto; text-align: center;">
                <h1 class="section-title">Creator Access</h1>
                <div style="background: var(--bg-surface); padding: 3rem 2rem; border-radius: 20px; border: 1px solid var(--border-light);">
                    <i class='bx bx-lock-alt' style="font-size: 4rem; margin-bottom: 2rem; color: var(--text-muted);"></i>
                    <form id="admin-login-form" style="display: flex; flex-direction: column; gap: 1rem;">
                        <input type="password" id="admin-password" class="input-field" placeholder="Enter Access Code" required>
                        <button type="submit" class="btn" style="justify-content: center;">Authenticate</button>
                    </form>
                    <p style="margin-top: 2rem; font-size: 0.875rem; color: var(--text-muted);">Access Code Required</p>
                </div>
            </div>
        `;
    }

    return `
        <div class="section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
                <h1 class="section-title" style="margin-bottom: 0;">Creator Dashboard</h1>
                <button id="admin-logout-btn" class="btn btn-secondary" style="padding: 0.5rem 1.5rem;"><i class='bx bx-log-out'></i> Lock</button>
            </div>
            
            <div style="display: flex; gap: 3rem; flex-wrap: wrap;">
                <!-- Add Product Form -->
                <div style="flex: 1; min-width: 300px; background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 20px; padding: 2rem;">
                    <h2 style="margin-bottom: 2rem; font-size: 1.5rem;"><i class='bx bx-plus-circle'></i> Add New Item</h2>
                    <form id="add-product-form" style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.875rem;">Product Name</label>
                            <input type="text" id="new-item-name" class="input-field" style="width: 100%;" required>
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.875rem;">Price ($)</label>
                            <input type="number" id="new-item-price" class="input-field" style="width: 100%;" min="1" required>
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.875rem;">Image URL (Try unsplash or leave empty for default)</label>
                            <input type="text" id="new-item-image" class="input-field" style="width: 100%;" placeholder="https:// images.unsplash.com/...">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.875rem;">Description</label>
                            <textarea id="new-item-desc" class="input-field" style="width: 100%; min-height: 100px; border-radius: 12px; resize: vertical;" required></textarea>
                        </div>
                        <button type="submit" class="btn" style="width: 100%; justify-content: center; margin-top: 1rem;">Publish to Store</button>
                    </form>
                </div>
                
                <!-- Inventory Preview -->
                <div style="flex: 1; min-width: 300px;">
                    <h2 style="margin-bottom: 2rem; font-size: 1.5rem;">Current Inventory (${products.length})</h2>
                    <div style="display: flex; flex-direction: column; gap: 1rem; max-height: 600px; overflow-y: auto; padding-right: 1rem;">
                        ${products.map(p => `
                            <div style="display: flex; align-items: center; gap: 1rem; background: rgba(0,0,0,0.2); border: 1px solid var(--border-light); padding: 1rem; border-radius: 12px;">
                                <img src="${p.image}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;">
                                <div style="flex-grow: 1;">
                                    <div style="font-weight: 600;">${p.name}</div>
                                    <div style="color: var(--primary); font-size: 0.875rem;">$${p.price}</div>
                                </div>
                                <div style="color: var(--text-muted); font-size: 0.75rem;">ID: ${p.id}</div>
                            </div>
                        `).reverse().join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function bindAdminEvents() {
    if (!state.isAdmin) {
        const loginForm = document.getElementById('admin-login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const code = document.getElementById('admin-password').value;
                if (code === '640') {
                    state.isAdmin = true;
                    sessionStorage.setItem('lumina_admin', 'true');
                    renderView('admin');
                    showToast('Creator Mode Activated');
                } else {
                    showToast('Invalid Access Code');
                }
            });
        }
        return;
    }

    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            state.isAdmin = false;
            sessionStorage.removeItem('lumina_admin');
            renderView('home');
            showToast('Creator Mode Deactivated');
        });
    }

    const addForm = document.getElementById('add-product-form');
    if (addForm) {
        addForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('new-item-name').value;
            const price = parseInt(document.getElementById('new-item-price').value);
            let image = document.getElementById('new-item-image').value.trim();
            const desc = document.getElementById('new-item-desc').value;

            if (!image) {
                // Fallback placeholder image
                image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop";
            }

            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

            const newItem = {
                id: newId,
                name,
                price,
                image,
                desc
            };

            products.push(newItem);
            saveProducts();

            showToast('Item Published to Store!');
            renderView('admin'); // Refresh dashboard
        });
    }
}

// =========================================================================
// Orders History View
// =========================================================================

function renderOrders() {
    const orderIds = Object.keys(state.orders);

    if (orderIds.length === 0) {
        return `
            <div class="section" style="text-align: center;">
                <h1 class="section-title">My Orders</h1>
                <div style="padding: 4rem 1rem; color: var(--text-muted);">
                    <i class='bx bx-package' style="font-size: 4rem; opacity: 0.5; margin-bottom: 1rem;"></i>
                    <p>You haven't placed any orders yet.</p>
                </div>
            </div>
        `;
    }

    return `
        <div class="section">
            <h1 class="section-title">My Orders</h1>
            <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 800px; margin: 0 auto;">
                ${orderIds.reverse().map(id => {
        const order = state.orders[id];
        // Handle backwards compatibility with mock array data
        if (Array.isArray(order)) return '';

        return `
                        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 12px; padding: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">
                                <div>
                                    <div style="color: var(--text-muted); font-size: 0.875rem;">Order Number</div>
                                    <div style="font-weight: 600; color: var(--primary);">${id}</div>
                                </div>
                                <div>
                                    <div style="color: var(--text-muted); font-size: 0.875rem;">Total</div>
                                    <div style="font-weight: 600;">$${order.total}</div>
                                </div>
                                <div>
                                    <div style="color: var(--text-muted); font-size: 0.875rem;">Scheduled For</div>
                                    <div style="font-weight: 600;">${order.shipping.date || 'N/A'}</div>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 1.5rem;">
                                <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--text-muted);">Shipping Address</h4>
                                <p style="font-size: 0.9rem;">${order.shipping.address}</p>
                            </div>
                            
                            <div>
                                <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--text-muted);">Items</h4>
                                ${order.items.map(item => `
                                    <div style="display: flex; justify-content: space-between; font-size: 0.9rem; padding: 0.5rem 0;">
                                        <span>${item.quantity}x ${item.name}</span>
                                        <span>$${item.price * item.quantity}</span>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <div style="margin-top: 1.5rem; text-align: right;">
                                <button class="btn btn-secondary" style="padding: 0.5rem 1.5rem; font-size: 0.875rem;" onclick="appRoot.innerHTML = renderTracking(); document.getElementById('tracking-input').value = '${id}'; document.getElementById('tracking-form').dispatchEvent(new Event('submit'));">Track Order</button>
                            </div>
                        </div>
                    `;
    }).join('')}
            </div>
        </div>
    `;
}

// =========================================================================
// Cart & Checkout System
// =========================================================================

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    state.cart.push(product);
    updateCartIcon();
    showToast(`Added ${product.name} to cart`);
}

function updateCartIcon() {
    cartCount.textContent = state.cart.length;
    cartCount.style.transform = 'scale(1.2)';
    setTimeout(() => cartCount.style.transform = 'scale(1)', 200);
}

function setupModal() {
    cartTrigger.addEventListener('click', openCartModal);

    modalCloseBtn.addEventListener('click', closeCartModal);
    modalOverlay.addEventListener('click', closeCartModal);
}

function openCartModal() {
    renderCartContent();
    document.body.classList.add('modal-open');
}

function closeCartModal() {
    document.body.classList.remove('modal-open');
}

function renderCartContent() {
    if (state.cart.length === 0) {
        modalContent.innerHTML = `
            <div style="text-align: center; padding: 3rem 0; color: var(--text-muted);">
                <i class='bx bx-shopping-bag' style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h2>Your cart is empty</h2>
                <p style="margin-top: 1rem;">Looks like you haven't added anything yet.</p>
                <button class="btn" style="margin-top: 2rem;" onclick="document.body.classList.remove('modal-open')">Continue Shopping</button>
            </div>
        `;
        return;
    }

    // Group items
    const groupedCart = state.cart.reduce((acc, current) => {
        const existing = acc.find(item => item.id === current.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            acc.push({ ...current, quantity: 1 });
        }
        return acc;
    }, []);

    const total = state.cart.reduce((sum, item) => sum + item.price, 0);

    modalContent.innerHTML = `
        <h2 style="margin-bottom: 1.5rem;">Your Cart</h2>
        <div style="max-height: 50vh; overflow-y: auto; padding-right: 1rem; margin-bottom: 1.5rem;">
            ${groupedCart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info flex" style="flex:1;">
                        <h4>${item.name}</h4>
                        <div style="color: var(--text-muted); font-size: 0.875rem;">Qty: ${item.quantity} × $${item.price}</div>
                    </div>
                    <div class="price">$${item.price * item.quantity}</div>
                </div>
            `).join('')}
        </div>
        
        <div class="cart-total">
            <span>Total</span>
            <span style="color: var(--secondary)">$${total}</span>
        </div>
        
        <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border: 1px solid var(--border-light);">
            <form id="checkout-form" class="checkout-form">
                <h3 style="margin-bottom: 1rem; font-size: 1.125rem;">Secure Checkout</h3>
                <div style="display: flex; gap: 1rem;">
                    <input type="text" class="input-field" placeholder="Card Number" style="flex: 2" required>
                    <input type="text" class="input-field" placeholder="MM/YY" style="flex: 1" required>
                    <input type="text" class="input-field" placeholder="CVC" style="flex: 1" required>
                </div>
                
                <button type="submit" class="btn" style="width: 100%; justify-content: center; margin-top: 1.5rem;">Pay $${total}</button>
            </form>
        </div>
    `;

    document.getElementById('checkout-form').addEventListener('submit', handleCheckout);
}

function handleCheckout(e) {
    e.preventDefault();

    // Calculate total and items before clearing cart
    const total = state.cart.reduce((sum, item) => sum + item.price, 0);
    const items = state.cart.reduce((acc, current) => {
        const existing = acc.find(item => item.id === current.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            acc.push({ ...current, quantity: 1 });
        }
        return acc;
    }, []);

    // Simulate API Call
    const btn = e.target.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Processing...";
    btn.disabled = true;

    setTimeout(() => {
        // Render shipping form natively
        modalContent.innerHTML = `
            <h2 style="margin-bottom: 1rem; color: #10b981; display: flex; align-items: center; gap: 0.5rem;"><i class='bx bxs-check-circle'></i> Payment Successful!</h2>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">Please provide your delivery details so we can ship your premium gear.</p>
            
            <form id="shipping-form" class="checkout-form">
                <input type="text" id="ship-address" class="input-field" placeholder="Full Delivery Address" required>
                <div style="display: flex; gap: 1rem;">
                    <input type="text" id="ship-city" class="input-field" placeholder="City" style="flex: 1" required>
                    <input type="text" id="ship-state" class="input-field" placeholder="State" style="flex: 1" required>
                    <input type="text" id="ship-pincode" class="input-field" placeholder="Pincode" style="flex: 1" required>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <input type="tel" id="ship-phone" class="input-field" placeholder="Phone Number" style="flex: 1" required>
                    <input type="email" id="ship-email" class="input-field" placeholder="Email (for Gmail notification)" style="flex: 1" required>
                </div>
                
                <button type="submit" class="btn" style="width: 100%; justify-content: center; margin-top: 1.5rem;">Confirm & Complete Order</button>
            </form>
        `;

        document.getElementById('shipping-form').addEventListener('submit', (ev) => {
            ev.preventDefault();

            const address = document.getElementById('ship-address').value;
            const city = document.getElementById('ship-city').value;
            const stateAddr = document.getElementById('ship-state').value;
            const pincode = document.getElementById('ship-pincode').value;
            const phone = document.getElementById('ship-phone').value;
            const email = document.getElementById('ship-email').value;

            const fullAddress = `${address}, ${city}, ${stateAddr} ${pincode} (Tel: ${phone})`;

            const orderId = 'LUM-' + Math.floor(10000 + Math.random() * 90000);

            // Save order to state and localStorage
            const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

            // Assume delivery is 3 days from now
            const deliveryDt = new Date();
            deliveryDt.setDate(deliveryDt.getDate() + 3);
            const deliveryDateStr = deliveryDt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            state.orders[orderId] = {
                items: items,
                total: total,
                shipping: { address: fullAddress, date: deliveryDateStr },
                timeline: [
                    { date: today, title: 'Order Placed', completed: true },
                    { date: today, title: 'Payment Confirmed', completed: true },
                    { date: 'Pending', title: 'Shipped via Lumina Express', completed: false },
                    { date: deliveryDateStr, title: 'Scheduled for Delivery', completed: false }
                ]
            };
            saveOrders();

            state.cart = [];
            updateCartIcon();

            modalContent.innerHTML = `
                <div style="text-align: center; padding: 4rem 1rem;">
                    <div style="width: 80px; height: 80px; background: rgba(16, 185, 129, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem;">
                        <i class='bx bx-check' style="font-size: 3rem; color: #10b981;"></i>
                    </div>
                    <h2 style="font-size: 2rem; margin-bottom: 1rem;">Order Placed Successfully!</h2>
                    <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem;">
                        Your order <strong style="color: white;">${orderId}</strong> is scheduled for delivery on ${deliveryDateStr}.
                        <br><br>
                        <span style="padding: 0.5rem 1rem; background: rgba(66, 133, 244, 0.1); border-radius: 50px; color: #4285F4; display: inline-flex; align-items: center; gap: 0.5rem;">
                            <i class='bx bxl-gmail'></i> Receipt sent to ${email} via Gmail
                        </span>
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button class="btn btn-secondary" onclick="document.body.classList.remove('modal-open'); document.querySelector('[data-link=orders]').click();">View Orders</button>
                        <button class="btn" onclick="document.body.classList.remove('modal-open')">Done</button>
                    </div>
                </div>
            `;
        });
    }, 1500);
}

// =========================================================================
// Order Now Fast Checkout Flow
// =========================================================================

function startOrderNowFlow(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Temporary storage for single item checkout flow
    state.orderNowData = {
        item: { ...product, quantity: 1 }
    };

    renderOrderNowAddressForm();
    document.body.classList.add('modal-open');
}

function renderOrderNowAddressForm() {
    modalContent.innerHTML = `
        <h2 style="margin-bottom: 1.5rem;">Fast Checkout</h2>
        <div class="cart-item" style="margin-bottom: 2rem; border: none; padding: 0;">
            <img src="${state.orderNowData.item.image}" alt="${state.orderNowData.item.name}" style="width: 60px; height: 60px;">
            <div class="cart-item-info flex" style="flex:1;">
                <h4 style="margin:0;">${state.orderNowData.item.name}</h4>
                <div style="color: var(--text-muted); font-size: 0.875rem;">Total: $${state.orderNowData.item.price}</div>
            </div>
        </div>

        <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border: 1px solid var(--border-light);">
            <form id="order-now-address-form" class="checkout-form">
                <h3 style="margin-bottom: 1rem; font-size: 1.125rem;">Delivery Details</h3>
                <input type="tel" id="on-phone" class="input-field" placeholder="Phone Number" required>
                <input type="text" id="on-address" class="input-field" placeholder="Address Line 1" required>
                <div style="display: flex; gap: 1rem;">
                    <input type="text" id="on-pincode" class="input-field" placeholder="Pincode" style="flex: 1" required>
                    <input type="email" id="on-email" class="input-field" placeholder="Email Address" style="flex: 1" required>
                </div>
                
                <button type="submit" class="btn" style="width: 100%; justify-content: center; margin-top: 1.5rem;">Continue to Payment <i class='bx bx-right-arrow-alt'></i></button>
            </form>
        </div>
    `;

    document.getElementById('order-now-address-form').addEventListener('submit', (e) => {
        e.preventDefault();
        state.orderNowData.address = {
            phone: document.getElementById('on-phone').value,
            line1: document.getElementById('on-address').value,
            pincode: document.getElementById('on-pincode').value,
            email: document.getElementById('on-email').value
        };
        renderOrderNowPaymentView();
    });
}

function renderOrderNowPaymentView() {
    modalContent.innerHTML = `
        <h2 style="margin-bottom: 1.5rem;">Payment Information</h2>
        
        <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border: 1px solid var(--border-light);">
            <form id="order-now-payment-form" class="checkout-form">
                <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
                    <label style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border: 1px solid var(--border-light); border-radius: 8px; cursor: pointer; transition: all 0.2s;">
                        <input type="radio" name="payment_method" value="online" required style="accent-color: var(--primary);"> 
                        <span style="display: flex; align-items: center; gap: 0.5rem;"><i class='bx bx-credit-card'></i> Online Payment</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border: 1px solid var(--border-light); border-radius: 8px; cursor: pointer; transition: all 0.2s;">
                        <input type="radio" name="payment_method" value="cod" required style="accent-color: var(--primary);"> 
                        <span style="display: flex; align-items: center; gap: 0.5rem;"><i class='bx bx-money'></i> Cash on Delivery</span>
                    </label>
                </div>
                
                <button type="submit" class="btn" style="width: 100%; justify-content: center;">Place Order ($${state.orderNowData.item.price})</button>
            </form>
        </div>
        <button class="btn btn-secondary" style="width: 100%; justify-content: center;" onclick="renderOrderNowAddressForm()">Back to Delivery Details</button>
    `;

    // Add visual selection styles for radio buttons
    document.querySelectorAll('input[name="payment_method"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            document.querySelectorAll('input[name="payment_method"]').forEach(r => {
                r.parentElement.style.borderColor = 'var(--border-light)';
                r.parentElement.style.background = 'transparent';
            });
            if (e.target.checked) {
                e.target.parentElement.style.borderColor = 'var(--primary)';
                e.target.parentElement.style.background = 'rgba(16, 185, 129, 0.05)';
            }
        });
    });

    document.getElementById('order-now-payment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Processing...";
        btn.disabled = true;

        const paymentMethod = document.querySelector('input[name="payment_method"]:checked').value;

        setTimeout(() => {
            const { item, address } = state.orderNowData;

            const fullAddress = `${address.line1}, Pincode: ${address.pincode} (Tel: ${address.phone}) [Email: ${address.email}]`;
            const orderId = 'LUM-' + Math.floor(10000 + Math.random() * 90000);
            const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

            const deliveryDt = new Date();
            deliveryDt.setDate(deliveryDt.getDate() + 3);
            const deliveryDateStr = deliveryDt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            state.orders[orderId] = {
                items: [item],
                total: item.price,
                paymentMethod: paymentMethod, // optional tracking 
                shipping: { address: fullAddress, date: deliveryDateStr },
                timeline: [
                    { date: today, title: 'Order Placed', completed: true },
                    { date: today, title: paymentMethod === 'cod' ? 'Cash on Delivery Requested' : 'Payment Confirmed', completed: true },
                    { date: 'Pending', title: 'Shipped via Lumina Express', completed: false },
                    { date: deliveryDateStr, title: 'Scheduled for Delivery', completed: false }
                ]
            };
            saveOrders();

            modalContent.innerHTML = `
                <div style="text-align: center; padding: 4rem 1rem;">
                    <div style="width: 80px; height: 80px; background: rgba(16, 185, 129, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem;">
                        <i class='bx bx-check' style="font-size: 3rem; color: #10b981;"></i>
                    </div>
                    <h2 style="font-size: 2rem; margin-bottom: 1rem;">Order Placed Successfully!</h2>
                    <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem;">
                        Your order <strong style="color: white;">${orderId}</strong> is scheduled for delivery on ${deliveryDateStr}.
                        <br><br>
                        <span style="padding: 0.5rem 1rem; background: rgba(66, 133, 244, 0.1); border-radius: 50px; color: #4285F4; display: inline-flex; align-items: center; gap: 0.5rem;">
                            <i class='bx bx-receipt'></i> Order details sent to your email
                        </span>
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button class="btn btn-secondary" onclick="document.body.classList.remove('modal-open'); document.querySelector('[data-link=orders]').click();">View Orders</button>
                        <button class="btn" onclick="document.body.classList.remove('modal-open')">Done</button>
                    </div>
                </div>
            `;

            // Clean up temporary order data
            delete state.orderNowData;
        }, 1200);
    });
}

// =========================================================================
// Utilities
// =========================================================================

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Boot App
document.addEventListener('DOMContentLoaded', init);
