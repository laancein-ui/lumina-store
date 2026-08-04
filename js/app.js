/* =========================================================================
   LAANCE - SPA Application Logic
   ========================================================================= */

// Mock Database & Inventory Management
const defaultProducts = [
    {
        id: 1,
        name: "Oversized Blazer - Black",
        price: 129.99,
        image: "assets/laance_black_blazer.jpg,assets/laance_black_back.jpg",
        desc: "A sophisticated, relaxed-fit blazer with a defined shoulder and a single-button closure. Crafted from a premium wool blend.",
        category: "fashion",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Beige", "Camel"],
        reviews: [
            { author: "Sara M.", rating: 5, text: "Love the fit! So comfortable and stylish. True to size." },
            { author: "Priya K.", rating: 4, text: "Great quality blazer, very versatile. Just took a while to ship." },
            { author: "Chloe L.", rating: 5, text: "Perfection! Exactly what I was looking for. Highly recommend!" }
        ]
    },
    {
        id: 2,
        name: "High-Waist Trousers - Beige",
        price: 89.50,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop",
        desc: "Tailored high-waisted trousers with wide-leg styling. Minimalist and sleek styling perfect for professional wear.",
        category: "fashion",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Beige", "Light Beige"],
        reviews: [
            { author: "Emma S.", rating: 5, text: "Perfect length and drape! Will buy in other colors." }
        ]
    },
    {
        id: 3,
        name: "Pleated Midi Skirt - Camel",
        price: 75.00,
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
        desc: "Elegant pleated midi skirt with structured pleats and elastic waistband. Easy to dress up or down.",
        category: "fashion",
        sizes: ["S", "M", "L"],
        colors: ["Beige", "Camel", "Tan"],
        reviews: []
    },
    {
        id: 4,
        name: "Silk Blouse Silk Blouse",
        price: 75.00,
        image: "assets/laance_white_blazer.jpg",
        desc: "Luxurious silk blouse featuring a clean buttonless look, relaxed drape, and breathable premium silk weave.",
        category: "fashion",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Beige", "Light Beige", "Camel"],
        reviews: []
    },
    {
        id: 5,
        name: "Trench Cort Trench Cort",
        price: 89.00,
        image: "assets/laance_beige_blazer.jpg",
        desc: "Classical double-breasted outerwear with structured storm flaps and button closures. Essential styling for cool days.",
        category: "fashion",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Light Beige", "Camel"],
        reviews: []
    },
    {
        id: 6,
        name: "Trench Cort Trench Cort",
        price: 89.00,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop",
        desc: "Minimalist modern outerwear without front buttons, styled with clean waist belts and a relaxed long fit.",
        category: "fashion",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Gray", "Camel"],
        reviews: []
    },
    {
        id: 7,
        name: "Knit Sweetr Knit Sweatey",
        price: 75.00,
        image: "assets/laance_beige_knit.jpg",
        desc: "Ultra-soft knit sweater crafted with classic cable textures. Relaxed warmth for home or outdoor wear.",
        category: "fashion",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Beige", "Light Beige"],
        reviews: []
    },
    {
        id: 8,
        name: "Oversle Midi Skirt - Dress",
        price: 75.00,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
        desc: "Sophisticated midi-length knitted dress featuring side slits and a slim ribbed turtleneck fit.",
        category: "fashion",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Gray", "Camel"],
        reviews: []
    }
];

const womenDresses = [];
const menDresses = [];
const carProducts = [];
const realEstateListings = [];
const kidProducts = [];

// Supabase Initialization
const SUPABASE_URL = 'https://trlqpkavpwweobyibcvd.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Y-e9ojdQqXcgn1tvG7-sSw_obhwpgYQ';
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

let products = [...defaultProducts, ...carProducts, ...realEstateListings, ...menDresses, ...womenDresses, ...kidProducts];
try {
    const deletedProductIds = JSON.parse(localStorage.getItem('laance_deleted_product_ids') || '[]');
    products = products.filter(p => !deletedProductIds.includes(p.id) && !deletedProductIds.includes(String(p.id)) && !deletedProductIds.includes(Number(p.id)));
} catch (e) {}

const getBackendUrl = () => {
    return (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '' || window.location.protocol === 'file:')
        ? 'http://localhost:3000'
        : 'https://lumina-store-i5tc.onrender.com';
};

const getProductImages = (product) => {
    if (!product || !product.image) return [];
    const imgStr = product.image.trim();
    if (imgStr.startsWith('[') && imgStr.endsWith(']')) {
        try {
            return JSON.parse(imgStr);
        } catch (e) {}
    }
    if (imgStr.includes(',')) {
        return imgStr.split(',').map(s => s.trim());
    }
    return [imgStr];
};

const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.75) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(dataUrl);
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

async function fetchProducts() {
    let liveProducts = [];
    try {
        if (supabaseClient) {
            const { data, error } = await supabaseClient.from('products').select('*');
            if (!error && data && data.length > 0) {
                liveProducts = data.map(p => ({ ...p, price: Number(p.price) }));
            }
        }
    } catch (err) {
        console.error('Error fetching products from Supabase:', err);
    }
    
    // Fetch from backend API
    let backendProducts = [];
    try {
        const response = await fetch(`${getBackendUrl()}/api/products`);
        if (response.ok) {
            const data = await response.json();
            if (data.products && Array.isArray(data.products)) {
                backendProducts = data.products.map(p => ({ ...p, price: Number(p.price) }));
            }
        }
    } catch (err) {
        console.error('Error fetching products from backend:', err);
    }
    
    // Load local fallback products
    let localProducts = [];
    try {
        localProducts = JSON.parse(localStorage.getItem('local_products') || '[]');
    } catch (e) {}

    // Merge live products with static ones, avoiding duplicates by ID
    const staticProducts = [...defaultProducts, ...carProducts, ...realEstateListings, ...menDresses, ...womenDresses, ...kidProducts];
    const productMap = new Map();
    staticProducts.forEach(p => productMap.set(p.id, p));
    liveProducts.forEach(p => productMap.set(p.id, p));
    backendProducts.forEach(p => productMap.set(p.id, p));
    localProducts.forEach(p => productMap.set(p.id, p));
    
    // Filter out deleted product IDs
    let deletedProductIds = [];
    try {
        deletedProductIds = JSON.parse(localStorage.getItem('laance_deleted_product_ids') || '[]');
    } catch (e) {}

    deletedProductIds.forEach(id => {
        productMap.delete(id);
        productMap.delete(String(id));
        productMap.delete(Number(id));
    });

    products = Array.from(productMap.values()).filter(p => p.category === 'fashion');
}

async function saveProducts(newItem) {
    try {
        let supabaseSuccess = false;
        if (supabaseClient) {
            const { error } = await supabaseClient.from('products').insert([
                { name: newItem.name, price: Number(newItem.price), image: newItem.image, desc: newItem.desc, category: newItem.category }
            ]);
            if (!error) {
                supabaseSuccess = true;
            } else {
                console.warn("Supabase product insert skipped/failed:", error.message);
            }
        }

        // Try saving to backend API ONLY if Supabase insert was not successful
        let backendSuccess = false;
        if (!supabaseSuccess) {
            try {
                const newId = 'backend_' + Date.now();
                const productToSave = { ...newItem, id: newId };
                const response = await fetch(`${getBackendUrl()}/api/products`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productToSave)
                });
                if (response.ok) {
                    backendSuccess = true;
                }
            } catch(e) {
                console.warn("Backend product insert failed:", e);
            }
        }

        if (!supabaseSuccess && !backendSuccess) {
            // Save locally if both fail
            const localProducts = JSON.parse(localStorage.getItem('local_products') || '[]');
            const newId = 'local_' + Date.now(); // Generate a unique ID for local products
            localProducts.push({ ...newItem, id: newId });
            localStorage.setItem('local_products', JSON.stringify(localProducts));
        }

        // Refresh local list
        await fetchProducts();
    } catch (err) {
        console.error('Error saving product:', err);
        showToast('Error submitting product');
        throw err;
    }
}

async function clearSupabaseData() {
    if (!confirm("Are you absolutely sure? This will delete ALL products, orders, and reviews from the database!")) return;
    
    try {
        showToast("Clearing database...");
        
        if (supabaseClient) {
            // Delete from all tables
            await Promise.all([
                supabaseClient.from('products').delete().neq('id', 0),
                supabaseClient.from('orders').delete().neq('id', 0),
                supabaseClient.from('reviews').delete().neq('id', 0)
            ]);
        }
        
        localStorage.removeItem('local_products');
        localStorage.removeItem('local_reviews');
        
        showToast("Database Cleared Successfully");
        location.reload(); // Refresh to show empty state
    } catch (err) {
        console.error('Error clearing data:', err);
        showToast('Error clearing data.');
    }
}

async function fetchReviews(productId) {
    try {
        let dbReviews = [];
        if (supabaseClient) {
            const { data, error } = await supabaseClient
                .from('reviews')
                .select('*')
                .eq('product_id', productId)
                .order('created_at', { ascending: false });
            if (!error && data) {
                dbReviews = data;
            }
        }
        
        // Load local fallback reviews
        const localReviewsMap = JSON.parse(localStorage.getItem('local_reviews') || '{}');
        const localReviews = localReviewsMap[productId] || [];
        
        state.reviews[productId] = [...localReviews, ...dbReviews];
        return state.reviews[productId];
    } catch (err) {
        console.error('Error fetching reviews:', err);
        const localReviewsMap = JSON.parse(localStorage.getItem('local_reviews') || '{}');
        state.reviews[productId] = localReviewsMap[productId] || [];
        return state.reviews[productId];
    }
}

async function saveReview(reviewData) {
    try {
        const newReview = {
            product_id: reviewData.productId,
            user_name: reviewData.userName,
            rating: Number(reviewData.rating),
            comment: reviewData.comment,
            created_at: new Date().toISOString()
        };

        let supabaseSuccess = false;
        if (supabaseClient) {
            const { error } = await supabaseClient.from('reviews').insert([{
                product_id: reviewData.productId,
                user_name: reviewData.userName,
                rating: Number(reviewData.rating),
                comment: reviewData.comment
            }]);
            
            if (!error) supabaseSuccess = true;
            else console.warn("Supabase review insert skipped/failed:", error.message);
        }

        // If Supabase fails (e.g. static product IDs failing foreign key/UUID checks), save locally
        if (!supabaseSuccess) {
            const localReviewsMap = JSON.parse(localStorage.getItem('local_reviews') || '{}');
            if (!localReviewsMap[reviewData.productId]) localReviewsMap[reviewData.productId] = [];
            localReviewsMap[reviewData.productId].unshift(newReview);
            localStorage.setItem('local_reviews', JSON.stringify(localReviewsMap));
        }

        // Refresh reviews in state
        await fetchReviews(reviewData.productId);
        showToast('Review submitted!');
        return true;
    } catch (err) {
        console.error('Error saving review:', err);
        showToast('Error submitting review');
        return false;
    }
}

async function fetchOrdersFromSupabase() {
    try {
        if (!supabaseClient) return;

        let query = supabaseClient
            .from('orders')
            .select('*');

        // If logged in, only fetch user's orders
        if (state.user) {
            query = query.eq('user_id', state.user.id);
        } else {
            // For guest/anonymous, maybe only show what's in local state
            // or fetch by email if we have it? Let's just return for now
            // to avoid showing ALL orders to everyone.
            return;
        }

        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;

        if (data) {
            data.forEach(order => {
                state.orders[order.order_id] = {
                    items: JSON.parse(order.items),
                    total: order.total,
                    paymentId: order.payment_id,
                    gateway: order.gateway,
                    shipping: JSON.parse(order.shipping),
                    timeline: JSON.parse(order.timeline),
                    customerEmail: order.customer_email
                };
            });
        }
    } catch (err) {
        console.error('Error fetching orders:', err);
    }
}

async function saveOrderToSupabase(orderId, orderData) {
    try {
        if (!supabaseClient) throw new Error("Supabase client not initialized");
        const { error } = await supabaseClient.from('orders').insert([
            {
                order_id: orderId,
                customer_email: orderData.customerEmail,
                total: orderData.total,
                items: JSON.stringify(orderData.items),
                shipping: JSON.stringify(orderData.shipping),
                timeline: JSON.stringify(orderData.timeline),
                payment_id: orderData.paymentId,
                gateway: orderData.gateway,
                user_id: state.user ? state.user.id : null // Link to user if logged in
            }
        ]);
        if (error) throw error;
    } catch (err) {
        console.error('Error saving order to Supabase:', err);
    }
}

async function fetchUserProfile() {
    try {
        if (!supabaseClient || !state.user) return;

        let { data, error } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', state.user.id)
            .single();

        if (error && error.code === 'PGRST116') {
            // Profile doesn't exist, create it
            const { data: newProfile, error: insertError } = await supabaseClient
                .from('profiles')
                .insert([{ id: state.user.id, full_name: state.user.user_metadata.full_name || '', avatar_url: state.user.user_metadata.avatar_url || '' }])
                .select()
                .single();
            if (insertError) throw insertError;
            data = newProfile;
        } else if (error) {
            throw error;
        }

        state.profile = data;
    } catch (err) {
        console.error('Error fetching profile:', err);
    }
}

// Helper for safe storage access
const safeStorage = {
    get: (type, key) => {
        try {
            return window[type].getItem(key);
        } catch (e) {
            console.warn(`Storage access error for ${key}:`, e);
            return null;
        }
    },
    set: (type, key, value) => {
        try {
            window[type].setItem(key, value);
        } catch (e) {
            console.error(`Storage save error for ${key}:`, e);
        }
    }
};

// App State
const state = {
    user: null,
    profile: null,
    cart: [],
    currentView: 'home',
    currentProductId: null,
    isAdmin: safeStorage.get('sessionStorage', 'laance_admin') === 'true',
    orders: (() => {
        const raw = safeStorage.get('localStorage', 'laance_orders');
        try {
            return raw ? JSON.parse(raw) : {
                'LUM-84920': {
                    items: [{ name: 'Laance Pro X ANC', price: 349, quantity: 1 }],
                    total: 349,
                    shipping: { address: '123 Fake St, NY', date: '2023-11-01' },
                    timeline: [
                        { date: 'Oct 24, 09:00 AM', title: 'Order Placed', completed: true },
                        { date: 'Oct 28, 10:00 AM', title: 'Out for Delivery', completed: false }
                    ]
                }
            };
        } catch (e) {
            console.error('Error parsing orders:', e);
            return {};
        }
    })(),
    reviews: {
        1: [
            { user: "Marco Rossi", rating: 5, comment: "Eccezionale! La qualità del suono è incredibile." },
            { user: "Giulia B.", rating: 4, comment: "Molto comode, le porto tutto il giorno." }
        ],
        201: [
            { user: "Alberto F.", rating: 5, comment: "Vista mozzafiato. Il miglior attico della città." }
        ],
        301: [
            { user: "Ferrari Enthusiast", rating: 5, comment: "A dream come true. Engineering perfection." }
        ]
    }, // Map of productId -> reviews[]
    profile: null, // User profile data from Supabase
    allUsers: [], // List of all users (admin only)
    sortOption: 'default' // Default sorting option
};

async function fetchAllUsers() {
    try {
        if (!supabaseClient || !state.isAdmin) return;
        const { data, error } = await supabaseClient
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        state.allUsers = data || [];
    } catch (err) {
        console.error('Error fetching all users:', err);
    }
}

function saveOrders() {
    safeStorage.set('localStorage', 'laance_orders', JSON.stringify(state.orders));
}

function updateNavbarProfile() {
    const profileTrigger = document.getElementById('profile-trigger');
    const navRight = document.querySelector('.nav-right');
    if (!profileTrigger || !navRight) return;

    // Check for Private Device Access
    const isTrusted = safeStorage.get('localStorage', 'laance_device_authorized') === 'shibil_777';
    const existingAdminIcon = document.getElementById('admin-add-product');
    
    if (isTrusted && !existingAdminIcon) {
        const adminBtn = document.createElement('i');
        adminBtn.id = 'admin-add-product';
        adminBtn.className = 'bx bx-plus-circle admin-icon';
        adminBtn.style.color = 'var(--primary)';
        adminBtn.style.cursor = 'pointer';
        adminBtn.style.fontSize = '1.5rem';
        adminBtn.title = 'Add New Product';
        adminBtn.onclick = () => renderView('admin');
        navRight.insertBefore(adminBtn, profileTrigger);
    }

    if (state.user) {
        const initials = state.profile && state.profile.full_name
            ? state.profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
            : state.user.email[0].toUpperCase();
        
        profileTrigger.innerHTML = `<div style="width: 32px; height: 32px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800; border: 2px solid rgba(255,255,255,0.2);">${initials}</div>`;
    } else {
        profileTrigger.innerHTML = `<i class='bx bx-user'></i><span class="login-label">Login</span>`;
    }
}



// DOM Elements
const appRoot = document.getElementById('app-root');
const cartCount = document.getElementById('cart-count');
const cartTrigger = document.getElementById('cart-trigger');
const profileTrigger = document.getElementById('profile-trigger'); // New
const modalOverlay = document.getElementById('modal-overlay');
const checkoutModal = document.getElementById('checkout-modal');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Initialize App
async function init() {
    try {
        console.log("App Initializing...");

        // Listen for Auth Changes
        if (supabaseClient) {
            supabaseClient.auth.onAuthStateChange(async (event, session) => {
                console.log("Auth Event:", event, session);
                state.user = session ? session.user : null;
                if (state.user) {
                    await fetchUserProfile();
                } else {
                    state.profile = null;
                }

                // Update Navbar Profile Icon
                updateNavbarProfile();

                // Refresh UI if on profile page
                if (state.currentView === 'profile') {
                    renderView('profile');
                }
            });

            // Initial check
            const { data: { session } } = await supabaseClient.auth.getSession();
            state.user = session ? session.user : null;
            if (state.user) await fetchUserProfile();
            updateNavbarProfile();
        }

        // Handle Private Device Authorization
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('trust_device') === 'shibil_private_access_777') {
            safeStorage.set('localStorage', 'laance_device_authorized', 'shibil_777');
            // Clean URL without reloading
            window.history.replaceState({}, document.title, window.location.pathname);
            setTimeout(() => showToast('Creator Access Authorized for this Device!'), 500);
        }

        // Setup base dynamic elements
        setupNavigation();
        setupModal();
        setupAIChat();

        // Render Home View Immediately
        renderView('home');

        // Hide Splash Screen after a short delay so the user sees the branding
        setTimeout(() => {
            const splash = document.getElementById('splash-screen');
            if (splash) splash.classList.add('fade-out');
        }, 1000);

        // Fetch Live Products and Orders in background
        try {
            await Promise.all([
                fetchProducts(),
                fetchOrdersFromSupabase()
            ]);
            
            // Refresh UI if still on a page that needs data
            if (state.currentView === 'home' || state.currentView === 'admin' || state.currentView === 'profile') {
                renderView(state.currentView);
            }
        } catch (fetchError) {
            console.warn("Background fetch failed:", fetchError);
        }

        console.log("App Successfully Rooted.");
    } catch (e) {
        console.error("Critical Boot Error:", e);
        // Ensure splash screen is gone so error is visible
        const splash = document.getElementById('splash-screen');
        if (splash) splash.style.display = 'none';
        
        if (appRoot) {
            appRoot.innerHTML = `<div style="padding:4rem;color:red;background:#000;"><h1>System Initialization Failure</h1><p>${e.message}</p><pre style="white-space:pre-wrap;">${e.stack}</pre></div>`;
        }
    }
}


// =========================================================================
// AI Chat Logic
// =========================================================================
function setupAIChat() {
    const fab = document.getElementById('ai-chat-fab');
    const widget = document.getElementById('ai-chat-widget');
    const closeBtn = document.getElementById('ai-chat-close');
    const sendBtn = document.getElementById('ai-chat-send');
    const input = document.getElementById('ai-chat-input-text');
    const messages = document.getElementById('ai-chat-messages');

    if (!fab || !widget) return;

    fab.addEventListener('click', () => {
        widget.classList.toggle('open');
        if (widget.classList.contains('open')) {
            if (state.currentView === 'product' && state.currentProductId) {
                const product = products.find(p => String(p.id) === String(state.currentProductId));
                if (product) {
                    addAIMessage(`You're looking at the **${product.name}**. Do you have any questions about its features, or price?`);
                }
            }
        }
    });

    closeBtn.addEventListener('click', () => widget.classList.remove('open'));

    function addAIMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'ai-message';
        msg.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>₹1</strong>');
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    function addUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'user-message';
        msg.textContent = text;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    function handleSend() {
        const text = input.value.trim();
        if (!text) return;
        
        addUserMessage(text);
        input.value = '';
        
        setTimeout(() => {
            let response = "I am a smart AI assistant for Laance. ";
            
            if (state.currentView === 'product' && state.currentProductId) {
                const product = products.find(p => String(p.id) === String(state.currentProductId));
                if (product) {
                    const ltext = text.toLowerCase();
                    if (ltext.includes('price') || ltext.includes('cost') || ltext.includes('much')) {
                        response = `The **${product.name}** costs ₹${product.price.toLocaleString('en-IN')}.`;
                    } else if (ltext.includes('detail') || ltext.includes('feature') || ltext.includes('what')) {
                        response = `Here are the details for **${product.name}**: ${product.desc}`;
                    } else {
                        response = `This is a highly rated product. I definitely recommend adding the **${product.name}** to your cart!`;
                    }
                }
            } else {
                const ltext = text.toLowerCase();
                if (ltext.includes('recommend') || ltext.includes('suggest')) {
                    response = "I highly recommend our **Laance Pro X ANC** headphones or the **Zenith Health + Titanium** smartwatch.";
                } else if (ltext.includes('hello') || ltext.includes('hi')) {
                    response = "Hello! I am the Laance AI Assistant. You can ask me about our products, pricing, or recommendations.";
                } else {
                    response = "I'm your AI shopping assistant. Try navigating to a product page to ask specific details about it, or ask me for recommendations!";
                }
            }
            addAIMessage(response);
        }, 600);
    }

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
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

    // Secret Gesture: 5 clicks on logo to authorize
    let logoClicks = 0;
    let logoTimer;
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            logoClicks++;
            clearTimeout(logoTimer);
            logoTimer = setTimeout(() => { logoClicks = 0; }, 3000); // Reset after 3 seconds

            if (logoClicks === 5) {
                safeStorage.set('localStorage', 'laance_device_authorized', 'shibil_777');
                showToast('Creator Access Authorized for this Device!');
                updateNavbarProfile();
                logoClicks = 0;
            }
        });
    }
}

function renderView(viewName, params = {}) {
    try {
        if (!appRoot) {
            console.error("appRoot element missing!");
            return;
        }

        state.currentView = viewName;
        window.scrollTo({ top: 0, behavior: 'auto' });

        switch (viewName) {
            case 'home':
                appRoot.innerHTML = renderHome();
                bindHomeEvents();
                break;
            case 'shop':
            case 'dress':
            case 'collection':
            case 'electronics':
            case 'cars':
            case 'realestate':
            case 'kids':
                appRoot.innerHTML = renderShopPage();
                bindShopEvents();
                break;
            case 'product':
                appRoot.innerHTML = renderProductDetail(params.id);
                bindProductEvents();
                break;
            case 'checkout':
                appRoot.innerHTML = renderCheckoutPage();
                bindCheckoutEvents();
                break;
            case 'payment':
                appRoot.innerHTML = renderPaymentPage();
                bindPaymentEvents();
                break;
            case 'confirmation':
                appRoot.innerHTML = renderOrderConfirmation();
                bindConfirmationEvents();
                break;
            case 'about':
                appRoot.innerHTML = renderAboutPage();
                bindAboutEvents();
                break;
            case 'orders':
                appRoot.innerHTML = renderOrders();
                break;
            case 'admin':
                appRoot.innerHTML = renderAdmin();
                bindAdminEvents();
                // Fetch latest data for dashboard
                Promise.all([
                    fetchProducts(),
                    fetchOrdersFromSupabase(),
                    fetchAllUsers()
                ]).then(() => {
                    if (state.currentView === 'admin') {
                        appRoot.innerHTML = renderAdmin();
                        bindAdminEvents();
                    }
                });
                break;
            case 'tracking':
                appRoot.innerHTML = renderTracking();
                bindTrackingEvents();
                break;
            case 'profile':
                if (!state.user) {
                    showAuthModal();
                } else {
                    appRoot.innerHTML = renderProfile();
                    bindProfileEvents();
                }
                break;
            case 'auth':
                appRoot.innerHTML = renderAuth();
                bindAuthEvents();
                break;
            default:
                appRoot.innerHTML = `<div class="section"><h2>Page Not Found</h2></div>`;
        }
    } catch (e) {
        console.error(`Rendering error [${viewName}]:`, e);
        appRoot.innerHTML = `<div style="padding:4rem;color:red;"><h1>Rendering Error</h1><p>${e.message}</p></div>`;
    }
}

// =========================================================================
// Views
// =========================================================================

function renderHome() {
    return `
        <div class="home-view-container">
            <h1 class="home-title">Find your favourite style, all the fashion you need is here</h1>
            
            <div class="slider-wrapper">
                <button class="slider-btn prev-btn" id="home-slider-prev"><i class='bx bx-chevron-left'></i></button>
                <div class="slider-container" id="home-slider">
                    <div class="slide-card placeholder-slide" data-product-id="1">
                        <img src="assets/laance_placeholder.jpg" alt="Style Placeholder">
                    </div>
                    <div class="slide-card" data-product-id="5">
                        <img src="assets/laance_beige_blazer.jpg" alt="Beige Blazer Style">
                    </div>
                    <div class="slide-card" data-product-id="4">
                        <img src="assets/laance_white_blazer.jpg" alt="White Blazer Style">
                    </div>
                    <div class="slide-card" data-product-id="7">
                        <img src="assets/laance_beige_knit.jpg" alt="Beige Knit Style">
                    </div>
                    <div class="slide-card" data-product-id="1">
                        <img src="assets/laance_black_blazer.jpg" alt="Black Blazer Style">
                    </div>
                </div>
                <button class="slider-btn next-btn" id="home-slider-next"><i class='bx bx-chevron-right'></i></button>
            </div>

            <p class="home-promo-text">We have many promo for you everyday, don't miss out. Checkout now!</p>
            <div class="home-cta-container">
                <button class="btn btn-shop-now">SHOP NOW</button>
            </div>
        </div>
    `;
}

function bindHomeEvents() {
    const slider = document.getElementById('home-slider');
    const prevBtn = document.getElementById('home-slider-prev');
    const nextBtn = document.getElementById('home-slider-next');
    if (slider && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -260, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: 260, behavior: 'smooth' });
        });
    }

    document.querySelectorAll('.slide-card').forEach(card => {
        card.addEventListener('click', () => {
            const pid = card.getAttribute('data-product-id');
            if (pid) {
                renderView('product', { id: pid });
            }
        });
    });

    const shopNowBtn = document.querySelector('.btn-shop-now');
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', () => {
            renderView('shop');
        });
    }
}

function renderShopPage() {
    return `
        <div class="shop-view-container">
            <div class="breadcrumbs">
                <a href="#" onclick="renderView('home')">Home</a> <span>&gt;</span> <a href="#" onclick="renderView('shop')">Shop</a> <span>&gt;</span> All Products
            </div>
            
            <div class="shop-header">
                <h1 class="shop-title">Shop All Fashion</h1>
                <button class="filter-sort-btn">Filter & Sort <i class='bx bx-chevron-down'></i></button>
            </div>
            
            <div class="products-grid-new">
                ${products.map(p => {
                    const firstImage = getProductImages(p)[0] || 'assets/laance_placeholder.jpg';
                    const colorDots = (p.colors || []).map(color => {
                        let hex = '#cccccc';
                        if (color.toLowerCase() === 'black') hex = '#000000';
                        else if (color.toLowerCase() === 'beige') hex = '#ecd2b1';
                        else if (color.toLowerCase() === 'light beige') hex = '#f7ebda';
                        else if (color.toLowerCase() === 'camel') hex = '#c49a79';
                        else if (color.toLowerCase() === 'gray') hex = '#a0a0a0';
                        return `<span class="color-dot" style="background-color: ${hex};"></span>`;
                    }).join('');
                    
                    return `
                        <div class="product-card-new" data-id="${p.id}">
                            <div class="product-card-img-container">
                                <img src="${firstImage}" alt="${p.name}">
                            </div>
                            <div class="product-card-details">
                                <div class="product-card-name-row">
                                    <div class="product-card-name">${p.name}</div>
                                    <button class="product-card-bag-btn" data-id="${p.id}"><i class='bx bx-shopping-bag'></i></button>
                                </div>
                                <div class="product-card-price">₹${p.price.toFixed(2)}</div>
                                <div class="product-card-colors">
                                    ${colorDots}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <div class="pagination-container">
                <span class="pagination-link active">1</span>
                <span class="pagination-link">2</span>
                <span class="pagination-link">3</span>
            </div>
        </div>
    `;
}

function bindShopEvents() {
    document.querySelectorAll('.product-card-new').forEach(card => {
        card.querySelector('.product-card-img-container').addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            renderView('product', { id });
        });
        card.querySelector('.product-card-name').addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            renderView('product', { id });
        });
    });

    document.querySelectorAll('.product-card-bag-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.getAttribute('data-id');
            addToCart(id);
        });
    });
}

function renderCheckoutPage() {
    const item = state.orderNowData ? state.orderNowData.item : (state.cart[0] || products[0]);
    const firstImage = getProductImages(item)[0] || 'assets/laance_placeholder.jpg';
    
    const subtotal = item.price;
    let subtotalStr = "₹119.00";
    let shippingStr = "₹25.09";
    let taxesStr = "₹6.00";
    let totalStr = "₹129.99";
    
    if (item.id === 1) {
        subtotalStr = "₹119.00";
        shippingStr = "₹25.09";
        taxesStr = "₹6.00";
        totalStr = "₹129.99";
    } else {
        subtotalStr = `₹${(subtotal * 0.9).toFixed(2)}`;
        shippingStr = `₹${(subtotal * 0.1).toFixed(2)}`;
        taxesStr = `₹${(subtotal * 0.05).toFixed(2)}`;
        totalStr = `₹${subtotal.toFixed(2)}`;
    }

    return `
        <div class="checkout-container">
            <div class="breadcrumbs">
                <a href="#" onclick="renderView('home')">Home</a> <span>&gt;</span> <a href="#" onclick="renderView('shop')">Shop</a> <span>&gt;</span> <a href="#" onclick="renderView('product', {id: ${item.id}})">${item.name}</a> <span>&gt;</span> Checkout
            </div>
            
            <div class="checkout-grid">
                <div class="checkout-left-col">
                    <h2 class="checkout-header-title">Shipping Address</h2>
                    <form id="shipping-address-form" class="checkout-form-group">
                        <div class="checkout-input-wrapper">
                            <i class='bx bx-user'></i>
                            <input type="text" id="ship-name" class="checkout-input" placeholder="Full Name" required>
                        </div>
                        <div class="checkout-input-wrapper">
                            <i class='bx bx-envelope'></i>
                            <input type="email" id="ship-email" class="checkout-input" placeholder="Email Address" value="${state.user ? state.user.email : ''}" required>
                        </div>
                        <div class="checkout-input-wrapper">
                            <i class='bx bx-phone'></i>
                            <input type="tel" id="ship-phone" class="checkout-input" placeholder="Phone Number" required>
                        </div>
                        <div class="checkout-input-wrapper">
                            <input type="text" id="ship-address1" class="checkout-input" style="padding-left: 1rem;" placeholder="Address Line 1 (Street address, P.O. Box, etc.)" required>
                        </div>
                        <div class="checkout-input-wrapper">
                            <input type="text" id="ship-address2" class="checkout-input" style="padding-left: 1rem;" placeholder="Address Line 2 (Apartment, suite, unit, building, floor, etc.)">
                        </div>
                        
                        <div class="form-row-2">
                            <div class="checkout-input-wrapper">
                                <i class='bx bx-map-pin'></i>
                                <input type="text" id="ship-city" class="checkout-input" placeholder="City" required>
                            </div>
                            <div class="checkout-input-wrapper">
                                <input type="text" id="ship-state" class="checkout-input" style="padding-left: 1rem;" placeholder="State / Province / Region" required>
                            </div>
                        </div>
                        
                        <div class="form-row-2">
                            <div class="checkout-input-wrapper">
                                <input type="text" id="ship-zip1" class="checkout-input" style="padding-left: 1rem;" placeholder="ZIP / Postal Code" required>
                            </div>
                            <div class="checkout-input-wrapper">
                                <input type="text" id="ship-zip2" class="checkout-input" style="padding-left: 1rem;" placeholder="ZIP / Postal Code">
                            </div>
                        </div>
                        
                        <div class="checkout-input-wrapper">
                            <select id="ship-country" class="checkout-select">
                                <option value="United States">United States</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="India">India</option>
                                <option value="Canada">Canada</option>
                                <option value="Australia">Australia</option>
                            </select>
                        </div>
                        
                        <div class="checkout-input-wrapper">
                            <i class='bx bx-star'></i>
                            <input type="text" id="ship-landmark" class="checkout-input" placeholder="Landmark (Optional)">
                        </div>
                        
                        <button type="submit" class="btn-continue-checkout">CONTINUE TO PAYMENT</button>
                    </form>
                </div>
                
                <div class="checkout-right-col">
                    <div class="order-summary-box">
                        <h2 class="checkout-header-title">Order Summary</h2>
                        <div class="summary-item-row">
                            <div class="summary-item-img">
                                <img src="${firstImage}" alt="${item.name}">
                            </div>
                            <div class="summary-item-info">
                                <div class="summary-item-name">${item.name}</div>
                                <div class="summary-item-price">₹${item.price.toFixed(2)}</div>
                            </div>
                        </div>
                        
                        <div class="pricing-row">
                            <span>Subtotal</span>
                            <span>${subtotalStr}</span>
                        </div>
                        <div class="pricing-row">
                            <span>Estimated Shipping</span>
                            <span>${shippingStr}</span>
                        </div>
                        <div class="pricing-row">
                            <span>Taxes</span>
                            <span>${taxesStr}</span>
                        </div>
                        <div class="pricing-row total">
                            <span>Grand Total</span>
                            <span>${totalStr}</span>
                        </div>
                    </div>
                    
                    <div class="payment-method-box">
                        <h2 class="checkout-header-title">Payment Method</h2>
                        <div class="payment-method-option">
                            <input type="radio" name="checkout_payment_method" value="card" checked>
                            <label><i class='bx bx-credit-card'></i> Credit/Debit Card</label>
                        </div>
                        <div class="payment-method-option">
                            <input type="radio" name="checkout_payment_method" value="paypal">
                            <label><i class='bx bxl-paypal'></i> PayPal</label>
                        </div>
                        <div class="payment-method-option">
                            <input type="radio" name="checkout_payment_method" value="netbanking">
                            <label><i class='bx bx-wallet'></i> Net Banking</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function bindCheckoutEvents() {
    const form = document.getElementById('shipping-address-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('button[type="submit"]');
            btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Securing Session...";
            btn.disabled = true;
            
            const paymentMethod = document.querySelector('input[name="checkout_payment_method"]:checked')?.value || 'card';
            
            if (!state.orderNowData) {
                state.orderNowData = {
                    item: state.cart[0] || products[0],
                    quantity: 1
                };
            }
            
            const item = state.orderNowData.item;
            const subtotal = item.price;
            let total = subtotal;
            if (item.id === 1) total = 129.99;
            
            const shipping = {
                name: document.getElementById('ship-name').value,
                email: document.getElementById('ship-email').value,
                phone: document.getElementById('ship-phone').value,
                line1: document.getElementById('ship-address1').value,
                line2: document.getElementById('ship-address2').value,
                city: document.getElementById('ship-city').value,
                state: document.getElementById('ship-state').value,
                zip: document.getElementById('ship-zip1').value,
                country: document.getElementById('ship-country').value,
                method: paymentMethod
            };
            state.orderNowData.shippingAddress = shipping;
            
            const fullAddress = `${shipping.line1}, ${shipping.line2}, ${shipping.city}, ${shipping.state}, ${shipping.zip}, ${shipping.country}`;

            try {
                // Call backend for Cashfree Order
                const response = await fetch('https://lumina-store-i5tc.onrender.com/api/create-cashfree-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: total,
                        customer_email: shipping.email || 'customer@example.com',
                        customer_phone: shipping.phone || '9999999999',
                        customer_id: "cust_" + Date.now()
                    })
                });

                const data = await response.json();

                if (data.payment_session_id) {
                    let cashfree = null;
                    try { cashfree = Cashfree({ mode: "production" }); } catch (err) { console.warn(err); }
                    if (!cashfree) throw new Error('Payment gateway unavailable.');
                    
                    cashfree.checkout({
                        paymentSessionId: data.payment_session_id,
                        redirectTarget: "_modal"
                    }).then((result) => {
                        if (result.error) {
                            showToast("Payment Failed: " + result.error.message);
                            btn.innerHTML = "CONTINUE TO PAYMENT";
                            btn.disabled = false;
                            return;
                        }
                        
                        // Payment Successful
                        const orderId = Math.floor(Math.random() * 90000 + 10000);
                        const deliveryDate = new Date();
                        deliveryDate.setDate(deliveryDate.getDate() + 4);
                        const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
                        const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                        const deliveryStr = `${dayNames[deliveryDate.getDay()]}, ${monthNames[deliveryDate.getMonth()]} ${deliveryDate.getDate()}${deliveryDate.getDate() === 1 ? 'st' : deliveryDate.getDate() === 2 ? 'nd' : deliveryDate.getDate() === 3 ? 'rd' : 'th'}.`;
                        
                        state.lastOrder = {
                            id: orderId,
                            item,
                            shipping,
                            customerName: shipping.name || 'Guest',
                            last4: '1234',
                            deliveryStr
                        };
                        
                        let orders = [];
                        try { orders = JSON.parse(localStorage.getItem('laance_orders') || '[]'); } catch(e) {}
                        orders.push({ id: 'ORD-' + orderId, date: new Date().toLocaleDateString(), item: item.name, price: item.price, status: 'Processing' });
                        localStorage.setItem('laance_orders', JSON.stringify(orders));
                        
                        state.cart = [];
                        updateCartIcon();
                        
                        saveToGoogleSheets(
                            shipping.name || 'Guest', 
                            shipping.email || '', 
                            shipping.phone || '', 
                            fullAddress, 
                            shipping.zip || '', 
                            item.name || '', 
                            'Cashfree'
                        );
                        
                        renderView('confirmation');
                    });
                } else {
                    throw new Error(data.message || "Failed to create payment session");
                }
            } catch (err) {
                console.error("Checkout Error:", err);
                showToast("Error: " + err.message);
                btn.innerHTML = "CONTINUE TO PAYMENT";
                btn.disabled = false;
            }
        });
    }
}

function renderPaymentPage() {
    const item = state.orderNowData ? state.orderNowData.item : (state.cart[0] || products[0]);
    const firstImage = getProductImages(item)[0] || 'assets/laance_placeholder.jpg';
    
    const subtotal = item.price;
    let subtotalStr = "₹119.00";
    let shippingStr = "₹25.09";
    let taxesStr = "₹6.00";
    let totalStr = "₹129.99";
    
    if (item.id === 1) {
        subtotalStr = "₹119.00";
        shippingStr = "₹25.09";
        taxesStr = "₹6.00";
        totalStr = "₹129.99";
    } else {
        subtotalStr = `₹${(subtotal * 0.9).toFixed(2)}`;
        shippingStr = `₹${(subtotal * 0.1).toFixed(2)}`;
        taxesStr = `₹${(subtotal * 0.05).toFixed(2)}`;
        totalStr = `₹${subtotal.toFixed(2)}`;
    }

    return `
        <div class="checkout-container">
            <div class="breadcrumbs">
                <a href="#" onclick="renderView('home')">Home</a> <span>&gt;</span> <a href="#" onclick="renderView('shop')">Shop</a> <span>&gt;</span> <a href="#" onclick="renderView('product', {id: ${item.id}})">${item.name}</a> <span>&gt;</span> <a href="#" onclick="renderView('checkout')">Checkout</a> <span>&gt;</span> Payment
            </div>
            
            <div class="checkout-grid">
                <div class="checkout-left-col">
                    <h2 class="checkout-header-title">Payment Details</h2>
                    <form id="payment-details-form" class="checkout-form-group">
                        <div style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                            <span>Credit / Debit Card</span>
                            <div style="display: flex; gap: 0.5rem;">
                                <img src="https://img.icons8.com/color/32/000000/visa.png" style="height: 20px;"/>
                                <img src="https://img.icons8.com/color/32/000000/mastercard.png" style="height: 20px;"/>
                                <img src="https://img.icons8.com/color/32/000000/amex.png" style="height: 20px;"/>
                            </div>
                        </div>
                        
                        <div class="checkout-input-wrapper">
                            <i class='bx bx-credit-card'></i>
                            <input type="text" id="pay-card-number" class="checkout-input" placeholder="Card Number" required>
                        </div>
                        
                        <div class="form-row-2">
                            <div class="checkout-input-wrapper">
                                <input type="text" id="pay-expiry" class="checkout-input" style="padding-left: 1rem;" placeholder="Expiry Date (MM/YY)" required>
                            </div>
                            <div class="checkout-input-wrapper">
                                <input type="password" id="pay-cvv" class="checkout-input" style="padding-left: 1rem;" placeholder="CVV" required>
                                <i class='bx bx-help-circle' style="left: auto; right: 1rem; cursor: pointer;" title="3-digit security code on the back of your card"></i>
                            </div>
                        </div>
                        
                        <div class="checkout-input-wrapper">
                            <input type="text" id="pay-name" class="checkout-input" style="padding-left: 1rem;" placeholder="Cardholder Name" required>
                        </div>
                        
                        <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; cursor: pointer;">
                            <input type="checkbox" id="pay-save-card" style="accent-color: #111111;"> Save card for future use
                        </label>
                        
                        <div style="margin-top: 2rem;">
                            <div style="font-weight: 600; font-size: 0.95rem;">Digital Wallets</div>
                            <div class="digital-wallets-row">
                                <button type="button" class="wallet-btn" id="pay-gpay"><img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay"></button>
                                <button type="button" class="wallet-btn" id="pay-applepay"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay"></button>
                                <button type="button" class="wallet-btn" id="pay-amazonpay"><img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Amazon_Pay_logo.svg" alt="Amazon Pay"></button>
                                <button type="button" class="wallet-btn" id="pay-paypal"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal"></button>
                            </div>
                        </div>
                        
                        <div style="margin-top: 1.5rem;">
                            <div style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Net Banking</div>
                            <select id="pay-netbanking" class="checkout-select">
                                <option value="">Select Bank</option>
                                <option value="SBI">SBI, HDFC, ICICI, Bank</option>
                                <option value="HDFC">HDFC Bank</option>
                                <option value="ICICI">ICICI Bank</option>
                            </select>
                        </div>
                        
                        <button type="submit" class="btn-continue-checkout" style="margin-top: 2.5rem; max-width: 100%;">CONFIRM PAYMENT & PLACE ORDER</button>
                    </form>
                </div>
                
                <div class="checkout-right-col">
                    <div class="order-summary-box">
                        <h2 class="checkout-header-title">Order Summary</h2>
                        <div class="summary-item-row">
                            <div class="summary-item-img">
                                <img src="${firstImage}" alt="${item.name}">
                            </div>
                            <div class="summary-item-info">
                                <div class="summary-item-name">${item.name}</div>
                                <div class="summary-item-price">₹${item.price.toFixed(2)}</div>
                            </div>
                        </div>
                        
                        <div class="pricing-row">
                            <span>Subtotal</span>
                            <span>${subtotalStr}</span>
                        </div>
                        <div class="pricing-row">
                            <span>Estimated Shipping</span>
                            <span>${shippingStr}</span>
                        </div>
                        <div class="pricing-row">
                            <span>Taxes</span>
                            <span>${taxesStr}</span>
                        </div>
                        <div class="pricing-row total">
                            <span>Grand Total</span>
                            <span>${totalStr}</span>
                        </div>
                    </div>
                    
                    <div class="secure-checkout-box">
                        <i class='bx bx-lock-alt'></i>
                        <div class="secure-checkout-text">
                            <strong>Secure Checkout</strong><br>
                            Secure Checkout how to data secure all you security security in this security.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function bindPaymentEvents() {
    const form = document.getElementById('payment-details-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Processing Payment...";
            btn.disabled = true;
            
            setTimeout(() => {
                const item = state.orderNowData ? state.orderNowData.item : (state.cart[0] || products[0]);
                const shipping = state.orderNowData ? state.orderNowData.shippingAddress : {};
                const cardNumber = document.getElementById('pay-card-number')?.value || '';
                const last4 = cardNumber.replace(/\s/g,'').slice(-4) || '4321';
                
                const orderId = Math.floor(Math.random() * 90000 + 10000);
                const customerName = shipping.name || (state.profile?.full_name) || 'Guest';
                
                // Build delivery date string ~3-5 days from now
                const deliveryDate = new Date();
                deliveryDate.setDate(deliveryDate.getDate() + 4);
                const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
                const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                const deliveryStr = `${dayNames[deliveryDate.getDay()]}, ${monthNames[deliveryDate.getMonth()]} ${deliveryDate.getDate()}${deliveryDate.getDate() === 1 ? 'st' : deliveryDate.getDate() === 2 ? 'nd' : deliveryDate.getDate() === 3 ? 'rd' : 'th'}.`;
                
                state.lastOrder = {
                    id: orderId,
                    item,
                    shipping,
                    customerName,
                    last4,
                    deliveryStr
                };
                
                const addressStr = `${shipping.line1 || ''} ${shipping.line2 || ''} ${shipping.city || ''} ${shipping.state || ''} ${shipping.country || ''}`.trim();
                saveToGoogleSheets(
                    shipping.name || 'Guest', 
                    shipping.email || '', 
                    shipping.phone || '', 
                    addressStr, 
                    shipping.zip || '', 
                    item.name || '', 
                    shipping.method || 'Credit Card'
                );
                
                let orders = [];
                try { orders = JSON.parse(localStorage.getItem('laance_orders') || '[]'); } catch(e) {}
                orders.push({ id: 'ORD-' + orderId, date: new Date().toLocaleDateString(), item: item.name, price: item.price, status: 'Processing' });
                localStorage.setItem('laance_orders', JSON.stringify(orders));
                
                state.cart = [];
                updateCartIcon();
                
                renderView('confirmation');
            }, 1800);
        });
    }
}

function renderOrderConfirmation() {
    const order = state.lastOrder;
    if (!order) return renderHome();
    
    const item = order.item;
    const shipping = order.shipping || {};
    const firstImage = getProductImages(item)[0] || 'assets/laance_placeholder.jpg';
    
    const subtotal = item.price;
    const subtotalStr = `₹${(subtotal * 0.9).toFixed(2)}`;
    const shippingStr = `₹${(subtotal * 0.1 * 0.95).toFixed(2)}`;
    const taxesStr = `₹${(subtotal * 0.05).toFixed(2)}`;
    const totalStr = `₹${subtotal.toFixed(2)}`;
    
    return `
        <div class="checkout-container">
            <div class="breadcrumbs">
                <a href="#" onclick="renderView('home')">Home</a> <span>&gt;</span> <a href="#" onclick="renderView('shop')">Shop</a> <span>&gt;</span> <a href="#" onclick="renderView('product', {id: ${item.id}})">${item.name}</a> <span>&gt;</span> Checkout <span>&gt;</span> Payment <span>&gt;</span> <strong>Order Confirmation</strong>
            </div>
            
            <div class="confirmation-hero">
                <div class="confirmation-check"><i class='bx bx-check'></i></div>
                <h1 class="confirmation-title">Thank you for your purchase, ${order.customerName.split(' ')[0]}!</h1>
                <p class="confirmation-subtitle">Order #${order.id} Confirmed</p>
                <p class="confirmation-delivery">Expected delivery by ${order.deliveryStr}</p>
            </div>
            
            <div class="confirmation-summary-box">
                <h2 class="confirmation-summary-title">Order Summary - #${order.id}</h2>
                
                <div class="confirmation-grid">
                    <div class="confirmation-left">
                        <div class="conf-section-title">Shipping & Billing Details</div>
                        <div class="conf-detail-row"><strong>Customer Name:</strong></div>
                        <div class="conf-detail-row">${order.customerName}</div>
                        <div class="conf-detail-row">${shipping.line1 || 'Address not provided'}</div>
                        <div class="conf-detail-row">${shipping.line2 || ''}</div>
                        <div class="conf-detail-row">${shipping.zip || ''} ${shipping.city || ''}</div>
                        <div class="conf-detail-row" style="margin-top: 0.8rem;"><strong>Payment Method:</strong></div>
                        <div class="conf-detail-row">Credit Card - ending in ${order.last4}</div>
                    </div>
                    
                    <div class="confirmation-right">
                        <div class="summary-item-row">
                            <div class="summary-item-img">
                                <img src="${firstImage}" alt="${item.name}">
                            </div>
                            <div class="summary-item-info">
                                <div class="summary-item-name">${item.name}</div>
                                <div class="summary-item-price">${totalStr}</div>
                            </div>
                        </div>
                        
                        <div class="pricing-row">
                            <span>Subtotal</span>
                            <span>${subtotalStr}</span>
                        </div>
                        <div class="pricing-row">
                            <span>Shipping</span>
                            <span>${shippingStr}</span>
                        </div>
                        <div class="pricing-row">
                            <span>Taxes</span>
                            <span>${taxesStr}</span>
                        </div>
                        <div class="pricing-row total">
                            <span>Grand Total</span>
                            <span>${totalStr}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 2.5rem;">
                <button class="btn-continue-checkout" id="download-invoice-btn" style="display: inline-flex; align-items: center; gap: 0.6rem; max-width: 300px; margin: 0 auto;">
                    <i class='bx bx-download'></i> DOWNLOAD INVOICE (PDF)
                </button>
                <p style="font-size: 0.85rem; color: #888888; margin-top: 1rem;">A copy of your invoice has also been sent to your email address.</p>
            </div>
        </div>
    `;
}

function bindConfirmationEvents() {
    const dlBtn = document.getElementById('download-invoice-btn');
    if (dlBtn) {
        dlBtn.addEventListener('click', () => {
            showToast('Invoice download started!');
        });
    }
}

function renderAboutPage() {
    return `
        <div class="checkout-container" style="max-width: 800px; text-align: center; margin: 8rem auto 5rem auto;">
            <h1 style="font-size: 2.3rem; margin-bottom: 2rem; font-weight: 500;">About LAANCE</h1>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #333333; margin-bottom: 3rem; font-weight: 350;">
                Founded on the principles of minimalist design, top-tier craftsmanship, and modern aesthetics, 
                LAANCE represents the pinnacle of contemporary style. We curate and design luxury fashion 
                staples that are tailored to the modern lifestyle.
            </p>
            <div style="position: relative; max-width: 440px; margin: 0 auto 2rem auto;">
                <img src="assets/shibil_sha_2.jpg" alt="Founder" style="width: 100%; border-radius: 20px; box-shadow: 0 15px 30px rgba(0,0,0,0.08);">
            </div>
            <h2 style="font-size: 1.6rem; font-weight: 600; margin-bottom: 0.5rem; color: #111111;">Shibil Sha M.P.</h2>
            <p style="color: #666666; font-style: italic; font-size: 0.95rem;">Founder & Visionary</p>
        </div>
    `;
}
function bindAboutEvents() {}

function bindCategoryEvents() {
    bindHomeEvents();
}

function renderProductDetail(id) {
    const product = products.find(p => String(p.id) === String(id));
    if (!product) return renderHome();

    if (!state.reviews[id]) {
        fetchReviews(id).then(() => {
            if (state.currentView === 'product' && state.currentProductId === id) {
                renderView('product', { id });
            }
        });
    }

    state.currentProductId = id;

    const userName = state.profile?.full_name || state.user?.email?.split('@')[0] || 'Guest';
    const userEmail = state.user?.email || 'N/A';
    saveToGoogleSheets(userName, userEmail, 'N/A', 'Product Clicked', 'N/A', `View: ${product.name}`, 'N/A');

    const productReviews = state.reviews[id] || [];
    const allReviews = [...(product.reviews || []), ...productReviews];

    const images = getProductImages(product);
    const mainImage = images[0] || 'assets/laance_placeholder.jpg';

    // Generate thumbnails. If there are no secondary images, we'll generate mock ones for Blazer or reuse main images
    let thumbnailsHTML = '';
    if (product.id === 1) {
        // Blazer thumbnails
        const blazerThumbs = ['assets/laance_black_blazer.jpg', 'assets/laance_black_back.jpg', 'assets/laance_black_blazer.jpg'];
        thumbnailsHTML = blazerThumbs.map((img, idx) => `
            <div class="thumbnail-item ${idx === 0 ? 'active' : ''}">
                <img src="${img}" alt="Blazer Thumbnail ${idx + 1}">
            </div>
        `).join('');
    } else {
        // Generic thumbnails using main image
        const placeholderThumbs = [mainImage, mainImage, mainImage];
        thumbnailsHTML = placeholderThumbs.map((img, idx) => `
            <div class="thumbnail-item ${idx === 0 ? 'active' : ''}">
                <img src="${img}" alt="Thumbnail ${idx + 1}">
            </div>
        `).join('');
    }

    const sizesHTML = (product.sizes || ["S", "M", "L", "XL", "XXL"]).map((sz, idx) => `
        <button class="size-btn ${sz === 'M' ? 'active' : ''}" data-size="${sz}">${sz}</button>
    `).join('');

    const colorsHTML = (product.colors || ["Black", "Beige", "Camel"]).map((col, idx) => {
        let hex = '#cccccc';
        if (col.toLowerCase() === 'black') hex = '#000000';
        else if (col.toLowerCase() === 'beige') hex = '#ecd2b1';
        else if (col.toLowerCase() === 'light beige') hex = '#f7ebda';
        else if (col.toLowerCase() === 'camel') hex = '#c49a79';
        else if (col.toLowerCase() === 'gray') hex = '#a0a0a0';
        return `
            <button class="color-pill ${idx === 0 ? 'active' : ''}" data-color="${col}">
                <span class="color-pill-dot" style="background-color: ${hex};"></span>
                ${col}
            </button>
        `;
    }).join('');

    return `
        <div class="product-detail-container">
            <div class="breadcrumbs">
                <a href="#" onclick="renderView('home')">Home</a> <span>&gt;</span> <a href="#" onclick="renderView('shop')">Shop</a> <span>&gt;</span> ${product.name}
            </div>
            
            <div class="product-detail-grid">
                <!-- Left column: Gallery -->
                <div class="product-gallery">
                    <div class="main-product-img">
                        <img id="product-detail-main-img" src="${mainImage}" alt="${product.name}">
                    </div>
                    <div class="thumbnail-list">
                        ${thumbnailsHTML}
                    </div>
                </div>
                
                <!-- Right column: Product Info -->
                <div class="product-info-panel">
                    <h1 class="product-detail-title">${product.name}</h1>
                    <div class="product-detail-price">₹${product.price.toFixed(2)}</div>
                    
                    <p class="product-detail-desc">${product.desc}</p>
                    
                    <div class="option-section">
                        <span class="option-label">Size</span>
                        <div class="sizes-container">
                            ${sizesHTML}
                        </div>
                    </div>
                    
                    <div class="option-section">
                        <span class="option-label">Color</span>
                        <div class="colors-container-new">
                            ${colorsHTML}
                        </div>
                    </div>
                    
                    <div class="purchase-row">
                        <div class="quantity-selector">
                            <button class="quantity-btn dec-qty">-</button>
                            <span class="quantity-value">1</span>
                            <button class="quantity-btn inc-qty">+</button>
                        </div>
                        <button class="btn-add-to-cart" data-id="${product.id}">ADD TO CART</button>
                    </div>
                    
                    <div class="detail-links">
                        <a class="detail-link-item"><i class='bx bx-notepad'></i> Size Guide</a>
                        <a class="detail-link-item"><i class='bx bx-transfer-alt'></i> Shipping & Returns</a>
                    </div>
                    
                    <!-- Customer Reviews -->
                    <div class="reviews-section">
                        <h2 class="reviews-title">Customer Reviews</h2>
                        <div class="reviews-list">
                            ${allReviews.length === 0 ? `
                                <p style="color: #666666; font-size: 0.9rem;">No reviews yet. Be the first to write a review!</p>
                            ` : allReviews.map(r => `
                                <div class="review-item">
                                    <div class="review-header">
                                        <span class="review-author">${r.author || r.user_name}</span>
                                        <span class="review-stars">
                                            ${Array(5).fill(0).map((_, i) => `<i class='bx ${i < (r.rating || 5) ? 'bxs-star' : 'bx-star'}'></i>`).join('')}
                                        </span>
                                    </div>
                                    <p class="review-text">${r.text || r.comment}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function bindProductEvents() {
    const addBtn = document.querySelector('.btn-add-to-cart');
    if (addBtn) {
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = addBtn.getAttribute('data-id');
            
            const sizeBtn = document.querySelector('.size-btn.active');
            const colorPill = document.querySelector('.color-pill.active');
            const qtyVal = document.querySelector('.quantity-value');
            
            const selectedSize = sizeBtn ? sizeBtn.getAttribute('data-size') : 'M';
            const selectedColor = colorPill ? colorPill.getAttribute('data-color') : 'Black';
            const quantity = qtyVal ? parseInt(qtyVal.textContent) : 1;
            
            // Add custom props
            const product = products.find(p => String(p.id) === String(id));
            if (product) {
                for (let i = 0; i < quantity; i++) {
                    state.cart.push({ ...product, size: selectedSize, color: selectedColor });
                }
                updateCartIcon();
                showToast(`${product.name} added to cart!`);
                
                const userName = state.profile?.full_name || state.user?.email?.split('@')[0] || 'Guest';
                const userEmail = state.user?.email || 'N/A';
                saveToGoogleSheets(userName, userEmail, 'N/A', 'Add to Cart', 'N/A', `Cart: ${product.name} (${selectedSize})`, 'N/A');
            }
        });
    }

    // Size button selection
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Color pill selection
    document.querySelectorAll('.color-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.color-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });

    // Quantity selectors
    const decBtn = document.querySelector('.dec-qty');
    const incBtn = document.querySelector('.inc-qty');
    const qtyVal = document.querySelector('.quantity-value');
    if (decBtn && incBtn && qtyVal) {
        decBtn.addEventListener('click', () => {
            let val = parseInt(qtyVal.textContent);
            if (val > 1) {
                qtyVal.textContent = val - 1;
            }
        });
        incBtn.addEventListener('click', () => {
            let val = parseInt(qtyVal.textContent);
            qtyVal.textContent = val + 1;
        });
    }

    // Product Gallery switching
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    const mainImg = document.getElementById('product-detail-main-img');
    if (mainImg) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                const src = thumb.querySelector('img').src;
                mainImg.style.opacity = '0.3';
                setTimeout(() => {
                    mainImg.src = src;
                    mainImg.style.opacity = '1';
                }, 150);
            });
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
    if (safeStorage.get('localStorage', 'laance_device_authorized') !== 'shibil_777') {
        return `
            <div class="section" style="max-width: 500px; margin: 0 auto; text-align: center;">
                <h1 class="section-title">Access Denied</h1>
                <div style="background: var(--bg-surface); padding: 3rem 2rem; border-radius: 20px; border: 1px solid var(--border-light);">
                    <i class='bx bx-mobile-alt' style="font-size: 4rem; margin-bottom: 2rem; color: #ef4444;"></i>
                    <h3 style="margin-bottom: 1rem; color: white;">Device Not Recognized</h3>
                    <p style="color: var(--text-muted); line-height: 1.6;">This device is not authorized to manage products. The Creator Dashboard is restricted to your personal phone and laptop.</p>
                </div>
            </div>
        `;
    }

    if (!state.isAdmin) {
        return `
            <div class="section" style="max-width: 500px; margin: 0 auto; text-align: center;">
                <h1 class="section-title">Creator Access</h1>
                <div style="background: var(--bg-surface); padding: 3rem 2rem; border-radius: 20px; border: 1px solid var(--border-light);">
                    <i class='bx bx-lock-alt' style="font-size: 4rem; margin-bottom: 2rem; color: var(--text-muted);"></i>
                    <form id="admin-login-form" style="display: flex; flex-direction: column; gap: 1rem;">
                        <input type="email" id="admin-id" class="input-field" placeholder="laancein@gmail.com" required>
                        <input type="password" id="admin-password" class="input-field" placeholder="Password" required>
                        <button type="submit" class="btn" style="justify-content: center;">Authorize Access</button>
                    </form>
                    <p style="margin-top: 2rem; font-size: 0.875rem; color: var(--text-muted);">Secure Creator Entry</p>
                </div>
            </div>
        `;
    }

    return `
        <div class="section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
                <h1 class="section-title" style="margin-bottom: 0;">Creator Dashboard</h1>
                <div style="display: flex; gap: 1rem;">
                      <button id="admin-clear-db-btn" class="btn btn-secondary" style="padding: 0.5rem 1.5rem; background: #ef4444; border-color: #ef4444; color: white;"><i class='bx bx-trash'></i> Clear DB</button>
                      <button id="admin-logout-btn" class="btn btn-secondary" style="padding: 0.5rem 1.5rem;"><i class='bx bx-log-out'></i> Lock</button>
                 </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;">
                <!-- Add Product Form -->
                <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 20px; padding: 2.5rem;">
                    <h2 style="margin-bottom: 2rem; font-size: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                        <i class='bx bx-plus-circle' style="color: var(--primary);"></i> Add New Item
                    </h2>
                    <form id="add-product-form" style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.875rem;">Product Name</label>
                            <input type="text" id="new-item-name" class="input-field" style="width: 100%;" placeholder="e.g. Laance Ultra Pods" required>
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.875rem;">Price (₹)</label>
                            <input type="number" id="new-item-price" class="input-field" style="width: 100%;" min="1" placeholder="9999" required>
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.875rem;">Product Images</label>
                            <div class="admin-form-tabs">
                                <div class="admin-form-tab active" id="tab-btn-upload">Drag & Drop</div>
                                <div class="admin-form-tab" id="tab-btn-url">Image URLs</div>
                            </div>
                            
                            <!-- Upload Tab Content -->
                            <div class="admin-tab-content active" id="tab-content-upload">
                                <div class="drag-drop-zone" id="image-drag-drop-zone">
                                    <i class='bx bx-cloud-upload'></i>
                                    <p style="font-weight: 500; margin: 0;">Drag & Drop Images here</p>
                                    <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0;">or click to browse from device</p>
                                    <input type="file" id="new-item-image-files" multiple accept="image/*" style="display:none;">
                                </div>
                                <div class="preview-thumbnails" id="image-upload-previews"></div>
                            </div>
                            
                            <!-- URL Tab Content -->
                            <div class="admin-tab-content" id="tab-content-url">
                                <input type="text" id="new-item-image" class="input-field" style="width: 100%;" placeholder="Paste image URLs (comma-separated)">
                                <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem; margin-bottom: 0;">For multiple images, separate URLs with a comma.</p>
                            </div>
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.875rem;">Category Section</label>
                            <select id="new-item-category" class="input-field" style="width: 100%;" required>
                                <option value="electronics">Electronics / Tech</option>
                                <option value="men">Men's Fashion</option>
                                <option value="women">Women's Fashion</option>
                                <option value="realestate">Real Estate</option>
                                <option value="cars">Cars</option>
                                <option value="kids">Kids</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.875rem;">Description</label>
                            <textarea id="new-item-desc" class="input-field" style="width: 100%; min-height: 120px; border-radius: 12px; resize: vertical;" placeholder="Tell customers about this innovation..." required></textarea>
                        </div>
                        <button type="submit" class="btn" style="width: 100%; justify-content: center; margin-top: 1rem;">Publish to Store</button>
                    </form>
                </div>
                
                <!-- Orders View -->
                <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 20px; padding: 2.5rem; display: flex; flex-direction: column;">
                    <h2 style="margin-bottom: 2rem; font-size: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                         <i class='bx bx-receipt' style="color: var(--secondary);"></i> Recent Sales
                    </h2>
                    <div style="flex: 1; overflow-y: auto; max-height: 600px; padding-right: 0.5rem;">
                        ${Object.keys(state.orders).length === 0 ? `
                             <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                                <i class='bx bx-ghost' style="font-size: 3rem; opacity: 0.3;"></i>
                                <p>No orders yet. They will appear here!</p>
                             </div>
                        ` : Object.entries(state.orders).sort((a, b) => b[0].localeCompare(a[0])).map(([id, order]) => `
                            <div style="padding: 1.5rem; border: 1px solid var(--border-light); border-radius: 15px; margin-bottom: 1rem; background: rgba(255,255,255,0.02);">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                    <span style="font-weight: 800; color: var(--primary);">${id}</span>
                                    <span style="font-size: 0.8rem; color: var(--text-muted);">${order.customerEmail || 'No Email'}</span>
                                </div>
                                <div style="font-weight: 600; margin-bottom: 0.5rem;">₹${order.total.toLocaleString('en-IN')}</div>
                                <div style="font-size: 0.85rem; color: var(--text-muted);">${order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                 <!-- Inventory Preview -->
                <div style="grid-column: 1 / -1; margin-top: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                        <h2 style="font-size: 1.5rem;">Current Inventory (${products.length})</h2>
                        <h2 style="font-size: 1.5rem;">Registered Users (${state.allUsers.length})</h2>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;">
                        <!-- Products List -->
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem;">
                            ${products.map(p => `
                                <div style="display: flex; align-items: center; gap: 1rem; background: var(--bg-surface); padding: 1rem; border-radius: 15px; border: 1px solid var(--border-light); position: relative;">
                                    <img src="${getProductImages(p)[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'}" style="width: 50px; height: 50px; border-radius: 10px; object-fit: cover;">
                                    <div style="flex: 1; overflow: hidden;">
                                        <div style="font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.name}</div>
                                        <div style="color: var(--primary); font-size: 0.85rem;">₹${p.price.toLocaleString('en-IN')}</div>
                                    </div>
                                    <button class="delete-product-btn" data-id="${p.id}" style="background: none; border: none; color: #ef4444; cursor: pointer; padding: 0.5rem; font-size: 1.2rem;" title="Delete Product">
                                        <i class='bx bx-trash'></i>
                                    </button>
                                </div>
                            `).join('')}
                        </div>

                        <!-- Users List -->
                        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 20px; padding: 2.5rem; max-height: 600px; overflow-y: auto;">
                            ${state.allUsers.length === 0 ? `
                                <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                                    <p>No users registered yet.</p>
                                </div>
                            ` : state.allUsers.map(u => `
                                <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border-bottom: 1px solid var(--border-light);">
                                    <div style="width: 40px; height: 40px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem;">
                                        ${u.full_name ? u.full_name[0].toUpperCase() : '?'}
                                    </div>
                                    <div style="flex: 1;">
                                        <div style="font-weight: 600; color: white;">${u.full_name || 'Anonymous User'}</div>
                                        <div style="font-size: 0.8rem; color: var(--text-muted);">Member since: ${new Date(u.created_at).toLocaleDateString()}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
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
                const id = document.getElementById('admin-id').value;
                const code = document.getElementById('admin-password').value;
                if (id === 'laancein@gmail.com' && code === '640') {
                    state.isAdmin = true;
                    sessionStorage.setItem('laance_admin', 'true');
                    renderView('admin');
                    showToast('Creator Mode Activated');
                } else {
                    showToast('Invalid ID or Password');
                }
            });
        }
        return;
    }

    // Form tab toggling
    const tabUpload = document.getElementById('tab-btn-upload');
    const tabUrl = document.getElementById('tab-btn-url');
    const contentUpload = document.getElementById('tab-content-upload');
    const contentUrl = document.getElementById('tab-content-url');
    let activeTab = 'upload'; // default

    if (tabUpload && tabUrl) {
        tabUpload.addEventListener('click', () => {
            tabUpload.classList.add('active');
            tabUrl.classList.remove('active');
            contentUpload.classList.add('active');
            contentUrl.classList.remove('active');
            activeTab = 'upload';
        });

        tabUrl.addEventListener('click', () => {
            tabUrl.classList.add('active');
            tabUpload.classList.remove('active');
            contentUrl.classList.add('active');
            contentUpload.classList.remove('active');
            activeTab = 'url';
        });
    }

    // Drag & Drop File Upload handling
    const dropZone = document.getElementById('image-drag-drop-zone');
    const fileInput = document.getElementById('new-item-image-files');
    const previewsContainer = document.getElementById('image-upload-previews');
    let uploadedImagesBase64 = [];

    const updatePreviews = () => {
        if (!previewsContainer) return;
        previewsContainer.innerHTML = uploadedImagesBase64.map((img, idx) => `
            <div class="preview-thumb-wrap">
                <img src="${img}" alt="Preview thumbnail">
                <button type="button" class="preview-thumb-remove" data-index="${idx}">×</button>
            </div>
        `).join('');

        // Bind remove button events
        previewsContainer.querySelectorAll('.preview-thumb-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(btn.getAttribute('data-index'));
                uploadedImagesBase64.splice(idx, 1);
                updatePreviews();
            });
        });
    };

    const processFiles = async (files) => {
        for (const file of files) {
            if (!file.type.startsWith('image/')) continue;
            try {
                const compressed = await compressImage(file, 800, 800, 0.75);
                uploadedImagesBase64.push(compressed);
            } catch (e) {
                console.error("Failed to compress file:", e);
            }
        }
        updatePreviews();
    };

    if (dropZone) {
        dropZone.addEventListener('click', () => fileInput.click());

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        ['dragleave', 'dragend'].forEach(evt => {
            dropZone.addEventListener(evt, () => dropZone.classList.remove('dragover'));
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            if (e.dataTransfer.files.length) {
                processFiles(e.dataTransfer.files);
            }
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                processFiles(fileInput.files);
            }
        });
    }

    const clearDbBtn = document.getElementById('admin-clear-db-btn');
    if (clearDbBtn) {
        clearDbBtn.addEventListener('click', clearSupabaseData);
    }

    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            state.isAdmin = false;
            sessionStorage.removeItem('laance_admin');
            renderView('home');
            showToast('Creator Mode Deactivated');
        });
    }

    const addForm = document.getElementById('add-product-form');
    if (addForm) {
        addForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('new-item-name').value;
            const price = parseInt(document.getElementById('new-item-price').value);
            const category = document.getElementById('new-item-category').value;
            const desc = document.getElementById('new-item-desc').value;
            
            let finalImageStr = '';
            
            if (activeTab === 'upload') {
                if (uploadedImagesBase64.length === 0) {
                    showToast('Please upload at least one image or paste an image URL');
                    return;
                }
                finalImageStr = JSON.stringify(uploadedImagesBase64);
            } else {
                const urlVal = document.getElementById('new-item-image').value.trim();
                if (!urlVal) {
                    showToast('Please enter an image URL');
                    return;
                }
                if (urlVal.includes(',')) {
                    // Store as JSON array of trimmed URLs
                    const urls = urlVal.split(',').map(u => u.trim()).filter(Boolean);
                    finalImageStr = JSON.stringify(urls);
                } else {
                    finalImageStr = urlVal;
                }
            }

            const btn = addForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Publishing...";
            btn.disabled = true;

            const newItem = {
                name,
                price,
                image: finalImageStr || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
                desc,
                category
            };

            try {
                await saveProducts(newItem);
                showToast('Item Published to Store!');
                renderView('admin'); // Refresh dashboard
            } catch (err) {
                // Error toast already handled in saveProducts
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
    }

    // Handle Delete Buttons
    document.querySelectorAll('.delete-product-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this product?')) {
                const originalContent = btn.innerHTML;
                btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i>";
                btn.disabled = true;

                try {
                    let deletedLocally = false;
                    if (String(id).startsWith('local_')) {
                        const localProducts = JSON.parse(localStorage.getItem('local_products') || '[]');
                        const filtered = localProducts.filter(p => String(p.id) !== String(id));
                        localStorage.setItem('local_products', JSON.stringify(filtered));
                        deletedLocally = true;
                    } else if (String(id).startsWith('backend_')) {
                        await fetch(`${getBackendUrl()}/api/products?id=${id}`, {
                            method: 'DELETE'
                        });
                    } else if (supabaseClient) {
                        const { error } = await supabaseClient.from('products').delete().eq('id', id);
                        if (error) throw error;
                    }
                    
                    // Track deleted product IDs locally to ensure static/cached entries disappear
                    const deletedProductIds = JSON.parse(localStorage.getItem('laance_deleted_product_ids') || '[]');
                    if (!deletedProductIds.includes(id)) {
                        deletedProductIds.push(id);
                        deletedProductIds.push(String(id));
                        if (!isNaN(id)) deletedProductIds.push(Number(id));
                        localStorage.setItem('laance_deleted_product_ids', JSON.stringify(deletedProductIds));
                    }
                    
                    showToast('Product Deleted Successfully');
                    await fetchProducts(); // Refresh local list
                    renderView('admin'); // Re-render dashboard
                } catch (err) {
                    console.error('Delete error:', err);
                    showToast('Error deleting product');
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                }
            }
        });
    });
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
                                    <div style="font-weight: 600;">₹${order.total.toLocaleString('en-IN')}</div>
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
                                        <span>₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
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
    const product = products.find(p => String(p.id) === String(productId));
    if (product) {
        state.cart.push({ ...product });
        updateCartIcon();
        showToast(`${product.name} added to cart!`);

        // Log 'Add to Cart' click to Google Sheets
        const userName = state.profile?.full_name || state.user?.email?.split('@')[0] || 'Guest';
        const userEmail = state.user?.email || 'N/A';
        saveToGoogleSheets(userName, userEmail, 'N/A', 'Add to Cart', 'N/A', `Cart: ${product.name}`, 'N/A');
    }
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
        const existing = acc.find(item => String(item.id) === String(current.id));
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
            ${groupedCart.map(item => {
                const firstImage = getProductImages(item)[0] || 'assets/laance_placeholder.jpg';
                return `
                    <div class="cart-item">
                        <img src="${firstImage}" alt="${item.name}">
                        <div class="cart-item-info flex" style="flex:1;">
                            <h4>${item.name}</h4>
                            <div style="color: var(--text-muted); font-size: 0.875rem;">Qty: ${item.quantity} × ₹${item.price.toFixed(2)}</div>
                        </div>
                        <div class="price">₹${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                `;
            }).join('')}
        </div>
        
        <div class="cart-total">
            <span>Total</span>
            <span style="font-weight: 700;">₹${total.toFixed(2)}</span>
        </div>
        
        <button id="cart-checkout-btn" style="
            width: 100%;
            margin-top: 1.5rem;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 30px;
            padding: 0.9rem 2rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            letter-spacing: 1px;
            font-family: var(--font-main);
            transition: var(--transition);
        ">PROCEED TO CHECKOUT</button>
    `;

    document.getElementById('cart-checkout-btn').addEventListener('click', () => {
        // Set the cart as the order source
        if (state.cart.length > 0) {
            state.orderNowData = {
                item: state.cart[0],
                quantity: state.cart.reduce((s, i) => s + 1, 0)
            };
        }
        // Close modal and go to checkout
        document.body.classList.remove('modal-open');
        renderView('checkout');
    });
}

// =========================================================================
// Cashfree SDK stub — kept to prevent reference errors from old code paths
// =========================================================================
let cashfree = null;
function getCashfree() { return null; }

// =========================================================================
// Order Now Fast Checkout Flow — now routes to our custom checkout page
// =========================================================================

function startOrderNowFlow(productId) {
    const product = products.find(p => String(p.id) === String(productId));
    if (!product) return;

    state.orderNowData = {
        item: { ...product, quantity: 1 }
    };

    // Close modal if open, navigate to our custom checkout page
    document.body.classList.remove('modal-open');
    renderView('checkout');
}

function finalizeOrderNow(item, fullAddress, email, paymentId, method) {
    const orderId = 'LUM-' + Math.floor(10000 + Math.random() * 90000);
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const deliveryDt = new Date();
    deliveryDt.setDate(deliveryDt.getDate() + 3);
    const deliveryDateStr = deliveryDt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    state.orders[orderId] = {
        items: [item],
        total: item.price,
        paymentMethod: method,
        paymentId: paymentId || 'COD',
        shipping: { address: fullAddress, date: deliveryDateStr },
        timeline: [
            { date: today, title: 'Order Placed', completed: true },
            { date: today, title: method === 'cod' ? 'Cash on Delivery Selected' : 'Payment Confirmed', completed: true },
            { date: 'Pending', title: 'Shipped via Laance Express', completed: false },
            { date: deliveryDateStr, title: 'Scheduled for Delivery', completed: false }
        ]
    };
    saveOrders();
    delete state.orderNowData;
    document.body.classList.remove('modal-open');
    showToast('Order placed successfully!');
    renderView('home');
}

// =========================================================================
// Utilities
// =========================================================================

function saveToGoogleSheets(name, email, phone, address, pincode, productName, paymentMethod) {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxmKpf4TJAbowXZaHLVDDmAtdTez05nCY4Vib0utVOup3l-Go2zBc7KDbm3E7C-wn59/exec';

    // Sending via URL parameters is the most reliable method for Google Apps Script
    const params = new URLSearchParams({
        'Name': name || '',
        'Email': email || '',
        'Phone': phone || '',
        'Address': address || '',
        'Pincode': pincode || '',
        'Product': productName || '',
        'Payment': paymentMethod || ''
    });

    fetch(`${scriptURL}?${params.toString()}`, { 
        method: 'POST', 
        mode: 'no-cors' 
    })
    .then(() => console.log('Successfully saved to Google Sheets'))
    .catch(error => console.error('Error saving to Google Sheets:', error.message));
}

// =========================================================================
// Authentication & Profiles
// =========================================================================

function showAuthModal() {
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = renderAuth();
    bindAuthEvents();
    document.body.classList.add('modal-open');
}

function renderAuth() {
    return `
        <div class="auth-form-container" style="margin: 0; padding: 1rem; border: none; backdrop-filter: none; background: transparent;">
            <h2 id="auth-title">Welcome Back</h2>
            <div class="auth-tabs">
                <div class="auth-tab active" id="tab-login">Login</div>
                <div class="auth-tab" id="tab-signup">Sign Up</div>
            </div>
            
            <form id="auth-form" class="checkout-form">
                <div id="signup-fields" style="display: none;">
                    <input type="text" id="auth-name" class="input-field" placeholder="Full Name">
                </div>
                <input type="email" id="auth-email" class="input-field" placeholder="Email Address" required>
                <input type="password" id="auth-password" class="input-field" placeholder="Password" required>
                <button type="submit" class="btn" style="width: 100%; justify-content: center; margin-top: 1rem;" id="auth-submit-btn">
                    Login
                </button>
            </form>
            
            <div class="social-auth">
                <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem;">Or continue with</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="btn-social" id="btn-google">
                        <i class='bx bxl-google'></i> Google
                    </div>
                    <div class="btn-social" id="btn-facebook">
                        <i class='bx bxl-facebook'></i> Facebook
                    </div>
                </div>
            </div>
        </div>
    `;
}

function bindAuthEvents() {
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');
    const authTitle = document.getElementById('auth-title');
    const authSubmitBtn = document.getElementById('auth-submit-btn');
    const signupFields = document.getElementById('signup-fields');
    const authForm = document.getElementById('auth-form');

    let isLogin = true;

    tabLogin.addEventListener('click', () => {
        isLogin = true;
        tabLogin.classList.add('active');
        tabSignup.classList.remove('active');
        authTitle.textContent = "Welcome Back";
        authSubmitBtn.textContent = "Login";
        signupFields.style.display = 'none';
        document.getElementById('auth-name').required = false;
    });

    tabSignup.addEventListener('click', () => {
        isLogin = false;
        tabSignup.classList.add('active');
        tabLogin.classList.remove('active');
        authTitle.textContent = "Create Account";
        authSubmitBtn.textContent = "Create Account";
        signupFields.style.display = 'block';
        document.getElementById('auth-name').required = true;
    });

    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;
        const fullName = document.getElementById('auth-name').value;

        authSubmitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Processing...";
        authSubmitBtn.disabled = true;

        if (!supabaseClient) {
            showToast("Login service currently unavailable");
            authSubmitBtn.innerHTML = isLogin ? "Login" : "Create Account";
            authSubmitBtn.disabled = false;
            return;
        }

        try {
            if (isLogin) {
                const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
                if (error) throw error;
                showToast("Welcome back!");
            } else {
                const { error } = await supabaseClient.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { full_name: fullName }
                    }
                });
                if (error) throw error;
                showToast("Account created! Check your email to confirm.");
                alert("Please check your email inbox to confirm your account before logging in.");
            }
            document.body.classList.remove('modal-open');
            renderView('home');
        } catch (err) {
            console.error("Auth Error:", err);
            showToast(err.message);
            authSubmitBtn.innerHTML = isLogin ? "Login" : "Create Account";
            authSubmitBtn.disabled = false;
        }
    });

    document.getElementById('btn-google').addEventListener('click', async () => {
        if (!supabaseClient) return showToast("Social login unavailable");
        const isIframe = window !== window.parent;
        const { data, error } = await supabaseClient.auth.signInWithOAuth({ 
            provider: 'google',
            options: {
                redirectTo: window.location.origin,
                skipBrowserRedirect: isIframe
            }
        });
        if (error) {
            showToast("Google Login Error: " + error.message);
        } else if (isIframe && data?.url) {
            window.top.location.href = data.url;
        }
    });

    document.getElementById('btn-facebook').addEventListener('click', async () => {
        if (!supabaseClient) return showToast("Social login unavailable");
        const isIframe = window !== window.parent;
        const { data, error } = await supabaseClient.auth.signInWithOAuth({ 
            provider: 'facebook',
            options: {
                redirectTo: window.location.origin,
                skipBrowserRedirect: isIframe
            }
        });
        if (error) {
            showToast("Facebook Login Error: " + error.message);
        } else if (isIframe && data?.url) {
            window.top.location.href = data.url;
        }
    });
}

function renderProfile() {
    const userInitials = state.profile && state.profile.full_name
        ? state.profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
        : state.user.email[0].toUpperCase();

    return `
        <div class="section">
            <h1 class="section-title" style="text-align: left;">Your Account</h1>
            
            <div class="profile-dashboard">
                <aside class="profile-sidebar">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <div class="profile-avatar" style="margin: 0 auto 1.5rem;">${userInitials}</div>
                        <h3 style="margin-bottom: 0.25rem;">${state.profile && state.profile.full_name || 'Guest User'}</h3>
                        <p style="font-size: 0.875rem;">${state.user.email}</p>
                    </div>
                    
                    <nav>
                        <div class="profile-nav-item active" data-tab="overview">
                            <i class='bx bx-grid-alt'></i> Dashboard
                        </div>
                        <div class="profile-nav-item" data-tab="orders">
                            <i class='bx bx-package'></i> Orders
                        </div>
                        <div class="profile-nav-item" data-tab="addresses">
                            <i class='bx bx-map'></i> Saved Addresses
                        </div>
                        <div class="profile-nav-item" data-tab="payments">
                            <i class='bx bx-credit-card'></i> Payment Methods
                        </div>
                        <div class="profile-nav-item" id="btn-logout" style="color: #ef4444; margin-top: 2rem;">
                            <i class='bx bx-log-out'></i> Sign Out
                        </div>
                    </nav>
                </aside>
                
                <main id="profile-content" class="profile-content-card">
                    ${renderProfileOverview()}
                </main>
            </div>
        </div>
    `;
}

function renderProfileOverview() {
    return `
        <h2 style="margin-bottom: 2rem;">Dashboard Overview</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 3rem;">
            <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 16px; border: 1px solid var(--border-light);">
                <div style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 0.5rem;">Total Orders</div>
                <div style="font-size: 2rem; font-weight: 800; color: var(--primary);">${Object.keys(state.orders).length}</div>
            </div>
            <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 16px; border: 1px solid var(--border-light);">
                <div style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 0.5rem;">Member Status</div>
                <div style="font-size: 2rem; font-weight: 800; color: #fbbf24;">Elite</div>
            </div>
        </div>
        
        <h3>Recent Activity</h3>
        <p style="margin-top: 1rem;">Welcome back to your premium dashboard. Here you can manage your orders, delivery preferences, and secure payments.</p>
        <button class="btn" style="margin-top: 2rem;" onclick="document.querySelector('[data-tab=orders]').click()">View All Orders</button>
    `;
}

function bindProfileEvents() {
    const content = document.getElementById('profile-content');
    const navItems = document.querySelectorAll('.profile-nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.id === 'btn-logout') {
                supabaseClient.auth.signOut();
                renderView('home');
                showToast("Signed out successfully");
                return;
            }

            const tab = item.getAttribute('data-tab');
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            switch (tab) {
                case 'overview':
                    content.innerHTML = renderProfileOverview();
                    break;
                case 'orders':
                    content.innerHTML = renderOrders();
                    break;
                case 'addresses':
                    content.innerHTML = `
                        <h2 style="margin-bottom: 2rem;">Saved Addresses</h2>
                        <div style="padding: 3rem; text-align: center; color: var(--text-muted); background: rgba(0,0,0,0.1); border-radius: 20px;">
                            <i class='bx bx-map-pin' style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                            <p>No saved addresses yet.</p>
                            <button class="btn btn-secondary" style="margin-top: 2rem;">+ Add New Address</button>
                        </div>
                    `;
                    break;
                case 'payments':
                    renderPaymentMethods(content);
                    break;
            }
        });
    });
}

function renderPaymentMethods(container) {
    container.innerHTML = `
        <h2 style="margin-bottom: 2rem;">Payment Methods</h2>
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            ${state.cards && state.cards.length > 0 ? state.cards.map(card => `
                <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); padding: 1.5rem; border-radius: 16px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <i class='bx bxl-visa' style="font-size: 2.5rem; color: #1a1f71;"></i>
                        <div>
                            <div style="font-weight: 600;">•••• •••• •••• ${card.last4}</div>
                            <div style="color: var(--text-muted); font-size: 0.8rem;">Expires ${card.expiry}</div>
                        </div>
                    </div>
                    <span style="color: var(--primary); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px;">Default</span>
                </div>
            `).join('') : `
                <div style="padding: 3rem; text-align: center; color: var(--text-muted); background: rgba(0,0,0,0.1); border-radius: 20px;">
                    <i class='bx bx-credit-card-front' style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                    <p>No payment methods saved.</p>
                </div>
            `}
            
            <button class="btn btn-secondary" style="margin-top: 1rem;" id="btn-add-card-toggle">+ Add New Card</button>
            
            <div id="add-card-form-container" style="display: none; margin-top: 2rem; background: rgba(255,255,255,0.02); padding: 2rem; border-radius: 20px; border: 1px solid var(--primary-glow);">
                <h3 style="margin-bottom: 1.5rem;">Secure Card Entry</h3>
                <form id="add-card-form" style="display: flex; flex-direction: column; gap: 1rem;">
                    <input type="text" id="card-number" class="input-field" placeholder="Card Number (16 digits)" maxlength="16" required>
                    <div style="display: flex; gap: 1rem;">
                        <input type="text" id="card-expiry" class="input-field" placeholder="MM/YY" maxlength="5" style="flex: 1" required>
                        <input type="password" id="card-cvv" class="input-field" placeholder="CVV" maxlength="3" style="flex: 1" required>
                    </div>
                    <button type="submit" class="btn" style="width: 100%; justify-content: center; margin-top: 1rem;">Save Card Securely</button>
                </form>
            </div>
        </div>
    `;

    document.getElementById('btn-add-card-toggle').addEventListener('click', () => {
        const form = document.getElementById('add-card-form-container');
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('add-card-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const num = document.getElementById('card-number').value;
        const exp = document.getElementById('card-expiry').value;
        
        if (!state.cards) state.cards = [];
        state.cards.push({
            last4: num.slice(-4),
            expiry: exp
        });
        
        showToast("Card saved successfully!");
        renderPaymentMethods(container);
    });
}

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Boot App
document.addEventListener('DOMContentLoaded', init);
