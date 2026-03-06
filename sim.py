import js2py

js_code = """
var defaultProducts = [{id: 1, name: "Laance Pro X ANC", price: 29999, image: "img", desc: "desc"}];
var data = [{"id":2,"created_at":"2026-03-06T10:25:56.236636+00:00","name":"Test API Product","price":500,"image":"","desc":"Testing the API directly"}];

var products = data.map(p => Object.assign({}, p, { price: Number(p.price) }));

function render() {
    return products.map(p => `
        <h3 class="product-title">${p.name}</h3>
        <div class="product-price">₹${p.price.toLocaleString('en-IN')}</div>
    `).join('');
}
try {
    console.log(render());
} catch(e) {
    console.log("Error:", e.message);
}
"""
print(js_code)
