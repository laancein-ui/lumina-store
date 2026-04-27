/* =========================================================================
   LAANCE - SPA Application Logic
   ========================================================================= */

// Mock Database & Inventory Management
const defaultProducts = [
    {
        id: 1,
        name: "Laance Pro X ANC",
        price: 29999,
        image: "assets/product_headphones_1772226325362.png",
        desc: "Experience pure audio bliss with industry-leading noise cancellation. Perfect for audiophiles, featuring 40hr battery life, spatial audio, and memory foam earcups."
    },
    {
        id: 2,
        name: "Zenith Health + Titanium",
        price: 49999,
        image: "assets/product_smartwatch_1772226340060.png",
        desc: "A sleek, aerospace-grade titanium smartwatch. Features an ultra-bright OLED display, ECG tracking, 100+ sports modes, and a comfortable silicone strap."
    },
    {
        id: 3,
        name: "Aero Glide Velocity",
        price: 15999,
        image: "assets/product_sneakers_1772226357442.png",
        desc: "Engineered for speed and comfort. These aesthetic white and neon-blue accented minimalist sneakers offer responsive cushioning and a breathable mesh upper."
    },
    {
        id: 4,
        name: "Laance UltraBook Pro 16",
        price: 189999,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600",
        desc: "Ultra-thin 16\" powerhouse laptop. M3 chip, 32GB RAM, 2TB SSD, and a stunning Liquid Retina XDR display that brings your work to life."
    },
    {
        id: 5,
        name: "Phantom 4K Drone",
        price: 89999,
        image: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?auto=format&fit=crop&q=80&w=600",
        desc: "Capture the world from above with cinema-grade 4K video, obstacle avoidance, and 45 minutes of flight time."
    },
    {
        id: 6,
        name: "Eclipse OLED Gaming Monitor",
        price: 74999,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600",
        desc: "32\" OLED panel with 240Hz refresh rate, 0.03ms response time, and stunning contrast for the most immersive gaming experience."
    },
    {
        id: 7,
        name: "Laance SoundBar Elite",
        price: 34999,
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=600",
        desc: "Premium 5.1 Dolby Atmos soundbar delivering cinema-quality audio in your living room. Wireless subwoofer included."
    },
    {
        id: 8,
        name: "SnapX Pro Camera",
        price: 149999,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600",
        desc: "Professional mirrorless camera with 61MP full-frame sensor, 8K video recording, and dual card slots for the serious photographer."
    }
];

const womenDresses = [
    {
        id: 101,
        name: "Midnight Silk Evening Gown",
        price: 12999,
        image: "https://images.unsplash.com/photo-1539008835279-43467f5b2335?auto=format&fit=crop&q=80&w=600",
        desc: "A stunning floor-length silk gown in deep midnight blue. Features a delicate halter neck and a sweeping train."
    },
    {
        id: 102,
        name: "Ivory Lace Summer Dress",
        price: 8499,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
        desc: "Breezy and elegant ivory dress with intricate lace detailing. Perfect for garden parties and summer weddings."
    },
    {
        id: 103,
        name: "Noir Velvet Cocktail Dress",
        price: 10999,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600",
        desc: "A classic cocktail dress made from premium noir velvet. Slim fit with a modern square neckline."
    },
    {
        id: 104,
        name: "Rose Gold Sari Set",
        price: 16999,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
        desc: "Exquisite handwoven rose gold sari with delicate zari border and matching blouse. Bridal-ready elegance."
    },
    {
        id: 105,
        name: "Emerald Maxi Wrap Dress",
        price: 6999,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600",
        desc: "Flowing deep emerald wrap dress in premium jersey fabric. Universally flattering silhouette perfect for any occasion."
    },
    {
        id: 106,
        name: "Pearl White Anarkali Suit",
        price: 14499,
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=600",
        desc: "Graceful floor-length Anarkali suit in pearl white with hand-embroidered detailing and palazzo trousers."
    }
];

const menDresses = [
    {
        id: 151,
        name: "Classic Charcoal Suit",
        price: 24999,
        image: "https://images.unsplash.com/photo-1594932224491-ca680f49fa2f?auto=format&fit=crop&q=80&w=600",
        desc: "Sharp and sophisticated charcoal suit for the modern professional. Includes jacket and trousers."
    },
    {
        id: 152,
        name: "Italian Leather Bomber",
        price: 18999,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600",
        desc: "Premium handcrafted Italian leather bomber jacket in deep espresso brown."
    },
    {
        id: 153,
        name: "Oxford White Button-Down",
        price: 3499,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600",
        desc: "The essential white button-down. High-thread-count cotton with a crisp, clean finish."
    },
    {
        id: 154,
        name: "Royal Bandhgala Sherwani",
        price: 32999,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
        desc: "Regal golden-thread embroidered sherwani for weddings and celebrations. Includes matching churidar and dupatta."
    },
    {
        id: 155,
        name: "Navy Linen Blazer",
        price: 8999,
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=600",
        desc: "Summer-weight navy linen blazer. Perfect for smart-casual occasions. Unlined for comfort in warm weather."
    },
    {
        id: 156,
        name: "Premium Denim Set",
        price: 5999,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600",
        desc: "Raw selvedge denim jacket and jeans set. Stonewashed finish with subtle distressing for a premium look."
    }
];

const carProducts = [
    {
        id: 301,
        name: "Laance Rosso GTO",
        price: 25000000,
        image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=600",
        desc: "A masterpiece of Italian engineering. 750hp V12 engine, handcrafted leather interior, and legendary performance."
    },
    {
        id: 302,
        name: "Milano Electric Spyder",
        price: 18500000,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600",
        desc: "The future of luxury mobility. Silent, powerful, and impeccably styled for the modern connoisseur."
    },
    {
        id: 303,
        name: "Venice Luxury Cruiser",
        price: 32000000,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600",
        desc: "Ultimate comfort meets performance. Features active suspension and an AI-driven concierge system."
    },
    {
        id: 304,
        name: "Laance Roma Classic",
        price: 8500000,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=600",
        desc: "A vintage icon reborn. Hand-restored classic Italian roadster with a modern fuel-injected engine and premium leather cabin."
    },
    {
        id: 305,
        name: "Toscana SUV Prestige",
        price: 14200000,
        image: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=600",
        desc: "Dominate any terrain in supreme luxury. Panoramic roof, 22\" alloy wheels, 600hp twin-turbo V8 and a 7-seat Nappa leather interior."
    },
    {
        id: 306,
        name: "Napoli GT Convertible",
        price: 21000000,
        image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&q=80&w=600",
        desc: "Open-air grand touring at its finest. Retractable hardtop, a 580hp engine, and hand-stitched Italian leather throughout."
    }
];

const realEstateListings = [
    {
        id: 201,
        name: "Skyline Penthouse",
        price: 85000000,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
        desc: "Luxury living at its peak. This penthouse features 360-degree city views, a private infinity pool, and smart home automation."
    },
    {
        id: 202,
        name: "Coastal Modern Villa",
        price: 125000000,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
        desc: "A masterpiece of modern architecture right on the beach. Features 5 bedrooms, a home cinema, and floor-to-ceiling windows."
    },
    {
        id: 203,
        name: "Zen Forest Retreat",
        price: 45000000,
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800",
        desc: "Escape the city in this minimalist forest cabin. Sustainable materials, geothermal heating, and complete privacy."
    },
    {
        id: 204,
        name: "Heritage Palace Bungalow",
        price: 220000000,
        image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&q=80&w=800",
        desc: "A grand colonial-era heritage bungalow with manicured gardens, 8 bedrooms, a private pool, and fully modernized interiors."
    },
    {
        id: 205,
        name: "Urban Loft Studio",
        price: 18500000,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
        desc: "Chic and modern loft in the heart of the city. Exposed brick, industrial aesthetics, and premium finishes throughout."
    },
    {
        id: 206,
        name: "Hilltop Infinity Estate",
        price: 175000000,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
        desc: "Perched above the city on a private hilltop. This 6-bedroom estate features an infinity pool, helicopter pad, and private vineyard."
    }
];

// Supabase Initialization
const SUPABASE_URL = 'https://trlqpkavpwweobyibcvd.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Y-e9ojdQqXcgn1tvG7-sSw_obhwpgYQ';
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

let products = defaultProducts;

async function fetchProducts() {
    try {
        if (!supabaseClient) return;
        const { data, error } = await supabaseClient.from('products').select('*');
        if (error) throw error;
        if (data && data.length > 0) {
            products = data.map(p => ({ ...p, price: Number(p.price) }));
        }
    } catch (err) {
        console.error('Error fetching products from Supabase:', err);
    }
}

async function saveProducts(newItem) {
    try {
        if (!supabaseClient) throw new Error("Supabase client not initialized");
        const { error } = await supabaseClient.from('products').insert([
            { name: newItem.name, price: Number(newItem.price), image: newItem.image, desc: newItem.desc }
        ]);
        if (error) throw error;

        // Refresh local list
        await fetchProducts();
    } catch (err) {
        console.error('Error saving product to Supabase:', err);
        showToast('Error saving to server');
    }
}

async function fetchReviews(productId) {
    try {
        if (!supabaseClient) return [];
        const { data, error } = await supabaseClient
            .from('reviews')
            .select('*')
            .eq('product_id', productId)
            .order('created_at', { ascending: false });
        if (error) throw error;
        state.reviews[productId] = data || [];
        return state.reviews[productId];
    } catch (err) {
        console.error('Error fetching reviews:', err);
        return [];
    }
}

async function saveReview(reviewData) {
    try {
        if (!supabaseClient) throw new Error("Supabase client not initialized");
        const { error } = await supabaseClient.from('reviews').insert([
            {
                product_id: reviewData.productId,
                user_name: reviewData.userName,
                rating: Number(reviewData.rating),
                comment: reviewData.comment
            }
        ]);
        if (error) throw error;
        await fetchReviews(reviewData.productId); // Refresh
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
    user: null, // Current Supabase User
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
    reviews: {}, // Map of productId -> reviews[]
    profile: null // User profile data from Supabase
};

function saveOrders() {
    safeStorage.set('localStorage', 'laance_orders', JSON.stringify(state.orders));
}

function updateNavbarProfile() {
    const profileTrigger = document.getElementById('profile-trigger');
    if (!profileTrigger) return;

    if (state.user) {
        const initials = state.profile && state.profile.full_name
            ? state.profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
            : state.user.email[0].toUpperCase();
        
        profileTrigger.innerHTML = `<div style="width: 32px; height: 32px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800; border: 2px solid rgba(255,255,255,0.2);">${initials}</div>`;
    } else {
        profileTrigger.innerHTML = `<i class='bx bx-user'></i>`;
    }
}

function startClock() {
    const clock = document.getElementById('current-time');
    if (!clock) return;

    function update() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        clock.textContent = `${hours}:${minutes}`;
    }
    
    update();
    setInterval(update, 60000);
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

        // Handle Trusted Device Logic
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('trust_device') === 'laance_admin_secure') {
            safeStorage.set('localStorage', 'laance_device_trusted', 'true');
            // Clean URL without reloading
            window.history.replaceState({}, document.title, window.location.pathname);
            setTimeout(() => showToast('Device Authorized for Admin Access!'), 500);
        }

        // Setup base dynamic elements
        setupNavigation();
        setupModal();

        // Render Home View Immediately
        renderView('home');

        // Fetch Live Products and Orders
        await Promise.all([
            fetchProducts(),
            fetchOrdersFromSupabase()
        ]);

        // Refresh UI with latest data if on home or admin
        if (state.currentView === 'home' || state.currentView === 'admin' || state.currentView === 'profile') {
            renderView(state.currentView);
        }

        startClock();
        console.log("App Successfully Rooted.");
    } catch (e) {
        console.error("Critical Boot Error:", e);
        if (appRoot) {
            appRoot.innerHTML = `<div style="padding:4rem;color:red;background:#000;"><h1>System Initialization Failure</h1><p>${e.message}</p><pre style="white-space:pre-wrap;">${e.stack}</pre></div>`;
        }
    }
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
            case 'product':
                appRoot.innerHTML = renderProductDetail(params.id);
                bindProductEvents();
                break;
            case 'orders':
                appRoot.innerHTML = renderOrders();
                break;
            case 'admin':
                appRoot.innerHTML = renderAdmin();
                bindAdminEvents();
                break;
            case 'tracking':
                appRoot.innerHTML = renderTracking();
                bindTrackingEvents();
                break;
            case 'electronics':
                appRoot.innerHTML = renderElectronicsPage();
                bindCategoryEvents();
                break;
            case 'dress':
                appRoot.innerHTML = renderDressPage();
                bindCategoryEvents();
                break;
            case 'cars':
                appRoot.innerHTML = renderCarsPage();
                bindCategoryEvents();
                break;
            case 'realestate':
                appRoot.innerHTML = renderRealEstatePage();
                bindCategoryEvents();
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
        <div class="section hero" style="background: rgba(0,0,0,0.2); border-radius: 40px; backdrop-filter: blur(5px); border: 1px solid var(--border-light); margin-top: 2rem;">
            <div class="hero-content">
                <h1>Everything you need <br><span>In one place.</span></h1>
                <p>From premium electronics to luxury real estate and fashion. Experience the Laance lifestyle.</p>
                <div style="display: flex; gap: 1rem;">
                    <a href="#" class="btn" onclick="document.getElementById('categories-section').scrollIntoView({behavior: 'smooth'})">Explore Categories</a>
                </div>
            </div>
            <div class="hero-image-wrap">
                <img src="assets/hero_banner.jpg" alt="Laance Premium Multi-Store" class="hero-image" style="border-radius: 30px; box-shadow: 0 0 60px rgba(79,70,229,0.4);">
            </div>
        </div>

        <div class="section" id="categories-section">
            <h2 class="section-title">Shop by Category</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <!-- Electronics Category -->
                <div class="category-card" onclick="renderView('electronics')" style="cursor: pointer; height: 400px; display: flex; flex-direction: column; justify-content: flex-end; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8)), url('assets/electronics_bg.jpg'); background-size: cover; background-position: center; border: 1px solid var(--primary); border-radius: 20px; transition: var(--transition); overflow: hidden;">
                    <div style="padding: 2rem;">
                        <h3 style="color: white; font-size: 1.5rem; margin-bottom: 0.5rem;">Electronics</h3>
                        <p style="color: var(--text-muted);">Next-gen tech and gadgets.</p>
                        <button class="btn" style="margin-top: 1rem; width: 100%;">Explore Tech</button>
                    </div>
                </div>

                <!-- Fashion Category -->
                <div class="category-card" onclick="renderView('dress')" style="cursor: pointer; height: 400px; display: flex; flex-direction: column; justify-content: flex-end; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1490481658042-3073a679df34?auto=format&fit=crop&q=80&w=600'); background-size: cover; background-position: center; border: 1px solid var(--secondary); border-radius: 20px; transition: var(--transition); overflow: hidden;">
                    <div style="padding: 2rem;">
                        <h3 style="color: white; font-size: 1.5rem; margin-bottom: 0.5rem;">Fashion</h3>
                        <p style="color: var(--text-muted);">Premium fashion & style.</p>
                        <button class="btn" style="margin-top: 1rem; width: 100%; background: var(--secondary);">Explore Fashion</button>
                    </div>
                </div>

                <!-- Real Estate Category -->
                <div class="category-card" onclick="renderView('realestate')" style="cursor: pointer; height: 400px; display: flex; flex-direction: column; justify-content: flex-end; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8)), url('assets/realestate_bg.jpg'); background-size: cover; background-position: center; border: 1px solid #10b981; border-radius: 20px; transition: var(--transition); overflow: hidden;">
                    <div style="padding: 2rem;">
                        <h3 style="color: white; font-size: 1.5rem; margin-bottom: 0.5rem;">Real Estate</h3>
                        <p style="color: var(--text-muted);">Luxury homes and villas.</p>
                        <button class="btn" style="margin-top: 1rem; width: 100%; background: #10b981; border: none;">Explore Properties</button>
                    </div>
                </div>

                <!-- Cars Category -->
                <div class="category-card" onclick="renderView('cars')" style="cursor: pointer; height: 400px; display: flex; flex-direction: column; justify-content: flex-end; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8)), url('assets/car_bg.jpg'); background-size: cover; background-position: center; border: 1px solid #f59e0b; border-radius: 20px; transition: var(--transition); overflow: hidden;">
                    <div style="padding: 2rem;">
                        <h3 style="color: white; font-size: 1.5rem; margin-bottom: 0.5rem;">Cars</h3>
                        <p style="color: var(--text-muted);">Italian passion in motion.</p>
                        <button class="btn" style="margin-top: 1rem; width: 100%; background: #f59e0b; border: none;">Explore Cars</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="section" id="products-grid">
            <h2 class="section-title">Trending Innovation</h2>
            <div class="products-grid">
                ${products.slice(0, 3).map(p => {
                    const priceNum = Number(p.price);
                    const formattedPrice = Number.isFinite(priceNum) ? priceNum.toLocaleString('en-IN') : 'TBA';
                    return `
                        <div class="product-card" data-id="${p.id || 0}">
                            <img src="${p.image || '#'}" alt="${p.name || 'Product'}" class="product-image">
                            <div class="product-info">
                                <div>
                                    <h3 class="product-title">${p.name || 'New Item'}</h3>
                                    <div class="product-price">₹${formattedPrice}</div>
                                </div>
                            </div>
                            <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                                <button class="btn add-to-cart-btn" data-id="${p.id || 0}" style="flex: 1;">Add to Cart</button>
                                <button class="btn btn-secondary order-now-btn" data-id="${p.id || 0}" style="flex: 1;">Order Now</button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function renderElectronicsPage() {
    return `
        <!-- Header -->
        <div class="section hero" style="min-height: 40vh; align-items: center; justify-content: center; text-align: center;">
            <div class="hero-content" style="max-width: 100%;">
                <h1>Dispositivi <br><span>Elettronici.</span></h1>
                <p>Eccellenza in Innovazione & Engineering since 1974.</p>
            </div>
        </div>

        <!-- Electronics Section with Custom Background -->
        <div class="section" id="electronics-section" style="padding: 8rem 2rem; margin-top: 2rem; position: relative; border-radius: 40px; overflow: hidden; background: url('assets/electronics_bg.jpg'); background-size: cover; background-position: center;">
            <!-- Overlay for readability -->
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1;"></div>
            
            <div style="position: relative; z-index: 2;">
                <h2 class="section-title" style="color: var(--primary); border-bottom-color: var(--primary);">Tech Showcase</h2>
                <div class="products-grid">
                    ${products.map(p => renderProductCard(p)).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderRealEstatePage() {
    return `
        <!-- Header -->
        <div class="section hero" style="min-height: 40vh; align-items: center; justify-content: center; text-align: center;">
            <div class="hero-content" style="max-width: 100%;">
                <h1>Officio <br><span>Immobiliare.</span></h1>
                <p>Eccellenza in Immobili & Luxury Living since 1974.</p>
            </div>
        </div>

        <!-- Real Estate Section with Custom Background -->
        <div class="section" id="realestate-section" style="padding: 8rem 2rem; margin-top: 2rem; position: relative; border-radius: 40px; overflow: hidden; background: url('assets/realestate_bg.jpg'); background-size: cover; background-position: center;">
            <!-- Overlay for readability -->
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1;"></div>
            
            <div style="position: relative; z-index: 2;">
                <h2 class="section-title" style="color: #10b981; border-bottom-color: #10b981;">Exclusive Listings</h2>
                <div class="products-grid">
                    ${realEstateListings.map(p => renderProductCard(p)).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderCarsPage() {
    return `
        <!-- Header -->
        <div class="section hero" style="min-height: 40vh; align-items: center; justify-content: center; text-align: center;">
            <div class="hero-content" style="max-width: 100%;">
                <h1>Italia <br><span>Milano.</span></h1>
                <p>Passione in Miniatura & Excellence in Engineering.</p>
            </div>
        </div>

        <!-- Cars Section with Custom Background -->
        <div class="section" id="cars-section" style="padding: 8rem 2rem; margin-top: 2rem; position: relative; border-radius: 40px; overflow: hidden; background: url('assets/car_bg.jpg'); background-size: cover; background-position: center;">
            <!-- Overlay for readability -->
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1;"></div>
            
            <div style="position: relative; z-index: 2;">
                <h2 class="section-title" style="color: #f59e0b; border-bottom-color: #f59e0b;">Exotic Collection</h2>
                <div class="products-grid">
                    ${carProducts.map(p => renderProductCard(p)).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderDressPage() {
    return `
        <!-- Header -->
        <div class="section hero" style="min-height: 40vh; align-items: center; justify-content: center; text-align: center;">
            <div class="hero-content" style="max-width: 100%;">
                <h1>Fashion <br><span>Collection.</span></h1>
                <p>Curated elegance for Men and Women.</p>
            </div>
        </div>

        <!-- Men's Section with Custom Background -->
        <div class="section" id="men-section" style="padding: 6rem 2rem; margin-top: 2rem; position: relative; border-radius: 40px; overflow: hidden; background: url('assets/men_bg.jpg'); background-size: cover; background-position: center;">
            <!-- Dark Overlay for readability -->
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 1;"></div>
            
            <div style="position: relative; z-index: 2;">
                <h2 class="section-title" style="color: white; border-bottom-color: var(--primary);">Men's Essentials</h2>
                <div class="products-grid">
                    ${menDresses.map(p => renderProductCard(p)).join('')}
                </div>
            </div>
        </div>

        <!-- Women's Section with Custom Background -->
        <div class="section" id="women-section" style="padding: 6rem 2rem; margin-top: 4rem; position: relative; border-radius: 40px; overflow: hidden; background: url('assets/women_bg.jpg'); background-size: cover; background-position: center;">
            <!-- Overlay to ensure readability -->
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.7); z-index: 1;"></div>
            
            <div style="position: relative; z-index: 2;">
                <h2 class="section-title" style="color: #d63384; border-bottom-color: #d63384;">Women's Collection</h2>
                <div class="products-grid">
                    ${womenDresses.map(p => renderProductCard(p)).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderProductCard(p) {
    const formattedPrice = Number(p.price).toLocaleString('en-IN');
    return `
        <div class="product-card" data-id="${p.id || 0}" onclick="startOrderNowFlow(${p.id || 0})">
            <img src="${p.image || '#'}" alt="${p.name || 'Product'}" class="product-image">
            <div class="product-info">
                <div>
                    <h3 class="product-title">${p.name || 'New Item'}</h3>
                    <div class="product-price">₹${formattedPrice}</div>
                </div>
            </div>
            <div style="display: flex; gap: 0.5rem; margin-top: 1rem;" onclick="event.stopPropagation()">
                <button class="btn add-to-cart-btn" data-id="${p.id || 0}" style="flex: 1;">Add to Cart</button>
                <button class="btn btn-secondary order-now-btn" data-id="${p.id || 0}" style="flex: 1;">Order Now</button>
            </div>
        </div>
    `;
}

function renderCategory(title, items) {
    return `
        <div class="section hero" style="min-height: 40vh; align-items: center; justify-content: center; text-align: center;">
            <div class="hero-content" style="max-width: 100%;">
                <h1>${title} <br><span>Collection.</span></h1>
                <p>Curated excellence for your refined lifestyle.</p>
            </div>
        </div>

        <div class="section" id="products-grid">
            <h2 class="section-title">${title} Showcase</h2>
            <div class="products-grid">
                ${items.map(p => {
                    const priceNum = Number(p.price);
                    const formattedPrice = Number.isFinite(priceNum) ? priceNum.toLocaleString('en-IN') : 'TBA';
                    return `
                        <div class="product-card" data-id="${p.id || 0}" onclick="startOrderNowFlow(${p.id || 0})">
                            <img src="${p.image || '#'}" alt="${p.name || 'Product'}" class="product-image">
                            <div class="product-info">
                                <div>
                                    <h3 class="product-title">${p.name || 'New Item'}</h3>
                                    <div class="product-price">${title === 'Real Estate' ? '₹' : '₹'}${formattedPrice}</div>
                                </div>
                            </div>
                            <div style="display: flex; gap: 0.5rem; margin-top: 1rem;" onclick="event.stopPropagation()">
                                <button class="btn add-to-cart-btn" data-id="${p.id || 0}" style="flex: 1;">${title === 'Real Estate' ? 'Enquire' : 'Add to Cart'}</button>
                                <button class="btn btn-secondary order-now-btn" data-id="${p.id || 0}" style="flex: 1;">${title === 'Real Estate' ? 'Visit' : 'Order Now'}</button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function bindCategoryEvents() {
    // We can reuse the same event binding logic
    bindHomeEvents();
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

    // Trigger async review fetch in background without blocking
    if (!state.reviews[id]) {
        fetchReviews(id).then(() => {
            if (state.currentView === 'product' && state.currentProductId === id) {
                renderView('product', { id });
            }
        });
    }

    state.currentProductId = id;
    const productReviews = state.reviews[id] || [];

    return `
        <div class="section">
            <div class="product-detail-view">
                <div class="detail-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="detail-info">
                    <div style="color: var(--primary); font-weight: 600; font-size: 1rem; margin-bottom: 0.5rem; text-transform: uppercase;">Premium Series</div>
                    <h1>${product.name}</h1>
                    <div class="price">₹${product.price.toLocaleString('en-IN')}</div>
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

            <!-- Reviews Section -->
            <div style="margin-top: 5rem; max-width: 800px;">
                <h2 style="font-size: 2rem; margin-bottom: 2rem;">Customer Reviews</h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;">
                    <!-- Review List -->
                    <div>
                        ${productReviews.length === 0 ? `
                            <div style="padding: 2rem; background: var(--bg-surface); border-radius: 20px; text-align: center; color: var(--text-muted);">
                                No reviews yet. Be the first to share your experience!
                            </div>
                        ` : productReviews.map(r => `
                            <div style="padding: 1.5rem; background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 20px; margin-bottom: 1.5rem;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                    <div style="font-weight: 600; color: var(--text-main);">${r.user_name}</div>
                                    <div style="color: #fbbf24;">
                                        ${Array(5).fill(0).map((_, i) => `<i class='bx ${i < r.rating ? 'bxs-star' : 'bx-star'}'></i>`).join('')}
                                    </div>
                                </div>
                                <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.5;">${r.comment}</p>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Add Review Form -->
                    <div>
                        <div style="padding: 2rem; background: var(--bg-surface); border: 1px solid var(--primary); border-radius: 24px; box-shadow: 0 0 20px var(--primary-glow);">
                            <h3 style="margin-bottom: 1.5rem;">Write a Review</h3>
                            <form id="add-review-form" style="display: flex; flex-direction: column; gap: 1rem;">
                                <div>
                                    <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--text-muted);">Your Name</label>
                                    <input type="text" id="review-user-name" class="input-field" placeholder="Enter your name" required style="width: 100%;">
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--text-muted);">Rating</label>
                                    <div id="rating-stars" style="color: #fbbf24; font-size: 1.5rem; cursor: pointer; display: flex; gap: 0.5rem;">
                                        <i class='bx bxs-star star' data-rating="1"></i>
                                        <i class='bx bxs-star star' data-rating="2"></i>
                                        <i class='bx bxs-star star' data-rating="3"></i>
                                        <i class='bx bxs-star star' data-rating="4"></i>
                                        <i class='bx bxs-star star' data-rating="5"></i>
                                    </div>
                                    <input type="hidden" id="review-rating" value="5">
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--text-muted);">Feedback</label>
                                    <textarea id="review-comment" class="input-field" rows="4" placeholder="Share your experience with this product..." required style="width: 100%; border-radius: 15px; resize: none;"></textarea>
                                </div>
                                <button type="submit" class="btn" style="width: 100%; justify-content: center; margin-top: 1rem;">
                                    Submit Review
                                </button>
                            </form>
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

    // Rating Star Logic
    const stars = document.querySelectorAll('#rating-stars .star');
    const ratingInput = document.getElementById('review-rating');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-rating');
            ratingInput.value = rating;
            stars.forEach((s, i) => {
                if (i < rating) {
                    s.classList.replace('bx-star', 'bxs-star');
                } else {
                    s.classList.replace('bxs-star', 'bx-star');
                }
            });
        });
    });

    // Review Form Submission
    const reviewForm = document.getElementById('add-review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = reviewForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Submitting...";
            btn.disabled = true;

            const reviewData = {
                productId: state.currentProductId,
                userName: document.getElementById('review-user-name').value,
                rating: document.getElementById('review-rating').value,
                comment: document.getElementById('review-comment').value
            };

            const success = await saveReview(reviewData);
            if (success) {
                renderView('product', { id: state.currentProductId }); // Refresh view
            } else {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
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
    if (localStorage.getItem('laance_device_trusted') !== 'true') {
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
                <div style="display: flex; gap: 1rem;">
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
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.875rem;">Image URL</label>
                            <input type="text" id="new-item-image" class="input-field" style="width: 100%;" placeholder="https:// images.unsplash.com/...">
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
                    <h2 style="margin-bottom: 2rem; font-size: 1.5rem;">Current Inventory (${products.length})</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem;">
                        ${products.map(p => `
                            <div style="display: flex; align-items: center; gap: 1rem; background: var(--bg-surface); padding: 1rem; border-radius: 15px; border: 1px solid var(--border-light);">
                                <img src="${p.image}" style="width: 50px; height: 50px; border-radius: 10px; object-fit: cover;">
                                <div style="flex: 1; overflow: hidden;">
                                    <div style="font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.name}</div>
                                    <div style="color: var(--primary); font-size: 0.85rem;">₹${p.price.toLocaleString('en-IN')}</div>
                                </div>
                            </div>
                        `).join('')}
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
                    sessionStorage.setItem('laance_admin', 'true');
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
            let image = document.getElementById('new-item-image').value.trim();
            const desc = document.getElementById('new-item-desc').value;

            if (!image) {
                // Fallback placeholder image
                image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop";
            }

            const btn = addForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Publishing...";
            btn.disabled = true;

            const newItem = {
                name,
                price,
                image,
                desc
            };

            await saveProducts(newItem);

            btn.innerHTML = originalText;
            btn.disabled = false;

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
                        <div style="color: var(--text-muted); font-size: 0.875rem;">Qty: ${item.quantity} × ₹${item.price.toLocaleString('en-IN')}</div>
                    </div>
                    <div class="price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
                </div>
            `).join('')}
        </div>
        
        <div class="cart-total">
            <span>Total</span>
            <span style="color: var(--secondary)">₹${total.toLocaleString('en-IN')}</span>
        </div>
        
        <!-- Shipping form before payment -->
        <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border: 1px solid var(--border-light);">
            <form id="checkout-form" class="checkout-form">
                <h3 style="margin-bottom: 1rem; font-size: 1.125rem;">Delivery Details</h3>
                <input type="text" id="cart-address" class="input-field" placeholder="Full Delivery Address" required>
                <div style="display: flex; gap: 1rem;">
                    <input type="text" id="cart-city" class="input-field" placeholder="City" style="flex: 1" required>
                    <input type="text" id="cart-pincode" class="input-field" placeholder="Pincode" style="flex: 1" required>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <input type="tel" id="cart-phone" class="input-field" placeholder="Phone Number" style="flex: 1" required>
                    <input type="email" id="cart-email" class="input-field" placeholder="Email Address" style="flex: 1" value="${state.user ? state.user.email : ''}" required>
                </div>
                
                <!-- Cashfree Pay Button -->
                <button type="submit" id="cashfree-cart-btn" class="btn" style="width: 100%; justify-content: center; margin-top: 1.5rem;">
                    <i class='bx bx-lock-alt'></i>&nbsp; Pay Securely via Cashfree ₹${total.toLocaleString('en-IN')}
                </button>
                <p style="text-align:center; color: var(--text-muted); font-size: 0.8rem; margin-top: 0.75rem;">
                    <i class='bx bx-shield-quarter'></i> Secured by Cashfree · UPI · Cards · Netbanking
                </p>
            </form>
        </div>
    `;

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        handleCashfreeCheckout(e, total, groupedCart);
    });
}

// Cashfree V3 Initialization
const cashfree = Cashfree({
    mode: "production" // CHANGED: Now in production mode
});

async function handleCashfreeCheckout(e, total, items) {
    // Collect shipping details from the form
    const address = document.getElementById('cart-address').value;
    const city = document.getElementById('cart-city').value;
    const pincode = document.getElementById('cart-pincode').value;
    const phone = document.getElementById('cart-phone').value;
    const email = document.getElementById('cart-email').value;
    const fullAddress = `${address}, ${city}, ${pincode} (Tel: ${phone})`;

    const btn = document.getElementById('cashfree-cart-btn');
    if (btn) {
        btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Securing Session...";
        btn.disabled = true;
    }

    try {
        // 1. Call your real backend to create a Cashfree Order
        const amountINR = total; // Now already in INR

        const response = await fetch('https://lumina-store-i5tc.onrender.com/api/create-cashfree-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: amountINR,
                customer_email: email,
                customer_phone: phone,
                customer_id: "cust_" + Date.now()
            })
        });

        const data = await response.json();

        if (data.payment_session_id) {
            // 2. Launch Cashfree Checkout
            cashfree.checkout({
                paymentSessionId: data.payment_session_id,
                redirectTarget: "_modal" // Opens in a secure modal
            }).then((result) => {
                if (result.error) {
                    showToast("Payment Failed: " + result.error.message);
                    if (btn) { btn.innerHTML = "Retry Payment"; btn.disabled = false; }
                    return;
                }

                // For demonstration, we'll finalize the order locally
                // In a production app, you should verify payment on backend
                const customerName = email.split('@')[0] || 'Customer';
                saveToGoogleSheets(customerName, email, phone, `${address}, ${city}`, pincode);
                finalizeCashfreeOrder(items, total, fullAddress, email, data.order_id);
            });
        } else {
            throw new Error(data.message || "Failed to create payment session");
        }

    } catch (err) {
        console.error("Cashfree Checkout Error:", err);
        showToast("Error: " + err.message);
        if (btn) { btn.innerHTML = "Retry Payment"; btn.disabled = false; }
    }
}

function finalizeCashfreeOrder(items, total, fullAddress, email, paymentId) {
    const orderId = 'LUM-' + Math.floor(10000 + Math.random() * 90000);
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const deliveryDt = new Date();
    deliveryDt.setDate(deliveryDt.getDate() + 3);
    const deliveryDateStr = deliveryDt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    state.orders[orderId] = {
        items,
        total,
        paymentId,
        gateway: 'Cashfree',
        shipping: { address: fullAddress, date: deliveryDateStr },
        customerEmail: email, // Save email for admin reference
        timeline: [
            { date: today, title: 'Order Placed', completed: true },
            { date: today, title: 'Payment Confirmed via Cashfree', completed: true },
            { date: 'Pending', title: 'Shipped via Laance Express', completed: false },
            { date: deliveryDateStr, title: 'Scheduled for Delivery', completed: false }
        ]
    };

    // Save locally and sync to Supabase
    saveOrders();
    saveOrderToSupabase(orderId, state.orders[orderId]);

    state.cart = [];
    updateCartIcon();

    modalContent.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem;">
            <div style="width: 80px; height: 80px; background: rgba(16, 185, 129, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem;">
                <i class='bx bx-check' style="font-size: 3rem; color: #10b981;"></i>
            </div>
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">Order Placed Successfully!</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">Cashfree Ref: <code style="color:#10b981">${paymentId}</code></p>
            <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem;">
                Your order <strong style="color: white;">${orderId}</strong> is scheduled for delivery on ${deliveryDateStr}.
                <br><br>
                <span style="padding: 0.5rem 1rem; background: rgba(66, 133, 244, 0.1); border-radius: 50px; color: #4285F4; display: inline-flex; align-items: center; gap: 0.5rem;">
                    <i class='bx bxl-gmail'></i> Receipt sent to ${email}
                </span>
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-secondary" onclick="document.body.classList.remove('modal-open'); document.querySelector('[data-link=tracking]').click();">Track Order</button>
                <button class="btn" onclick="document.body.classList.remove('modal-open')">Done</button>
            </div>
        </div>
    `;
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
                <div style="color: var(--text-muted); font-size: 0.875rem;">Total: ₹${state.orderNowData.item.price.toLocaleString('en-IN')}</div>
            </div>
        </div>

        <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border: 1px solid var(--border-light);">
            <form id="order-now-address-form" class="checkout-form">
                <h3 style="margin-bottom: 1rem; font-size: 1.125rem;">Delivery Details</h3>
                <input type="tel" id="on-phone" class="input-field" placeholder="Phone Number" required>
                <input type="text" id="on-address" class="input-field" placeholder="Address Line 1" required>
                <div style="display: flex; gap: 1rem;">
                    <input type="text" id="on-pincode" class="input-field" placeholder="Pincode" style="flex: 1" required>
                    <input type="email" id="on-email" class="input-field" placeholder="Email Address" style="flex: 1" value="${state.user ? state.user.email : ''}" required>
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
                
                <button type="submit" class="btn" style="width: 100%; justify-content: center;">Place Order (₹${state.orderNowData.item.price.toLocaleString('en-IN')})</button>
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
        const paymentMethod = document.querySelector('input[name="payment_method"]:checked').value;
        const { item, address } = state.orderNowData;
        const fullAddress = `${address.line1}, Pincode: ${address.pincode} (Tel: ${address.phone})`;

        if (paymentMethod === 'cod') {
            // Cash on Delivery — no payment gateway needed
            btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Placing Order...";
            btn.disabled = true;
            setTimeout(() => {
                const customerName = address.email.split('@')[0] || 'Customer';
                saveToGoogleSheets(customerName, address.email, address.phone, address.line1, address.pincode);
                finalizeOrderNow(item, fullAddress, address.email, null, 'cod');
            }, 1000);
        } else {
            // Online Payment via Cashfree
            const amountINR = item.price; // Now already in INR

            btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Securing Session...";
            btn.disabled = true;

            // Call real backend for "Order Now" flow
            fetch('https://lumina-store-i5tc.onrender.com/api/create-cashfree-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: amountINR,
                    customer_email: address.email,
                    customer_phone: address.phone,
                    customer_id: "cust_" + Date.now()
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.payment_session_id) {
                        cashfree.checkout({
                            paymentSessionId: data.payment_session_id,
                            redirectTarget: "_modal"
                        }).then((result) => {
                            if (result.error) {
                                showToast("Payment Failed: " + result.error.message);
                                btn.innerHTML = "Retry Payment";
                                btn.disabled = false;
                                return;
                            }
                            const customerName = address.email.split('@')[0] || 'Customer';
                            saveToGoogleSheets(customerName, address.email, address.phone, address.line1, address.pincode);
                            finalizeOrderNow(item, fullAddress, address.email, data.order_id, 'online');
                        });
                    } else {
                        throw new Error(data.message || "Session creation failed");
                    }
                })
                .catch(err => {
                    console.error("Fast Checkout Error:", err);
                    showToast("Error: " + err.message);
                    btn.innerHTML = "Retry Payment";
                    btn.disabled = false;
                });
        }
    });
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
        gateway: method === 'online' ? 'Cashfree' : null,
        shipping: { address: fullAddress, date: deliveryDateStr },
        timeline: [
            { date: today, title: 'Order Placed', completed: true },
            { date: today, title: method === 'cod' ? 'Cash on Delivery Selected' : 'Payment Confirmed via Cashfree', completed: true },
            { date: 'Pending', title: 'Shipped via Laance Express', completed: false },
            { date: deliveryDateStr, title: 'Scheduled for Delivery', completed: false }
        ]
    };
    saveOrders();
    delete state.orderNowData;

    modalContent.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem;">
            <div style="width: 80px; height: 80px; background: rgba(16, 185, 129, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem;">
                <i class='bx bx-check' style="font-size: 3rem; color: #10b981;"></i>
            </div>
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">Order Placed Successfully!</h2>
            ${paymentId ? `<p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">Cashfree ID: <code style="color:#10b981">${paymentId}</code></p>` : ''}
            <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem;">
                Your order <strong style="color: white;">${orderId}</strong> is scheduled for delivery on ${deliveryDateStr}.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-secondary" onclick="document.body.classList.remove('modal-open'); document.querySelector('[data-link=tracking]').click();">Track Order</button>
                <button class="btn" onclick="document.body.classList.remove('modal-open')">Done</button>
            </div>
        </div>
    `;
}

// =========================================================================
// Utilities
// =========================================================================

function saveToGoogleSheets(name, email, phone, address, pincode) {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyKlRqIAHgAN1sjXqoG9pmgGWXfcjUlfNdzlQZokL97iWh90DRb9MUZPUbgWAyqWYwU/exec';

    const formData = new FormData();
    formData.append('Name', name || '');
    formData.append('Email', email || '');
    formData.append('Phone', phone || '');
    formData.append('Address', address || '');
    formData.append('Pincode', pincode || '');

    fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' })
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
        const { error } = await supabaseClient.auth.signInWithOAuth({ 
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });
        if (error) showToast("Google Login Error: " + error.message);
    });

    document.getElementById('btn-facebook').addEventListener('click', async () => {
        if (!supabaseClient) return showToast("Social login unavailable");
        const { error } = await supabaseClient.auth.signInWithOAuth({ 
            provider: 'facebook',
            options: {
                redirectTo: window.location.origin
            }
        });
        if (error) showToast("Facebook Login Error: " + error.message);
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
