import http.server
import socketserver
import json
import os
import requests
from dotenv import load_dotenv

# Load env variables from .env if present
load_dotenv()

PORT = 3000
ORDERS_FILE = 'orders.json'

# Use environment variables or local placeholders
CASHFREE_APP_ID = os.getenv('CASHFREE_APP_ID', 'YOUR_APP_ID_HERE')
CASHFREE_SECRET_KEY = os.getenv('CASHFREE_SECRET_KEY', 'YOUR_SECRET_KEY_HERE')
CASHFREE_MODE = os.getenv('CASHFREE_MODE', 'sandbox') # Use 'production' for live

CASHFREE_BASE_URL = "https://sandbox.cashfree.com/pg" if CASHFREE_MODE == "sandbox" else "https://api.cashfree.com/pg"

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With, Content-type, x-api-version, x-client-id, x-client-secret")
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/orders':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                order_id = data.get('orderId')
                order_data = data.get('orderData')
                
                if not os.path.exists(ORDERS_FILE):
                    with open(ORDERS_FILE, 'w') as f:
                        json.dump({}, f)
                        
                with open(ORDERS_FILE, 'r') as f:
                    try:
                        orders = json.load(f)
                    except json.JSONDecodeError:
                        orders = {}
                    
                orders[order_id] = order_data
                
                with open(ORDERS_FILE, 'w') as f:
                    json.dump(orders, f, indent=4)
                    
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'success': True, 'message': 'Order saved securely'}).encode('utf-8'))
            except Exception as e:
                print("Failed to save order:", e)
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'success': False, 'message': 'Server error'}).encode('utf-8'))

        elif self.path == '/api/create-cashfree-order':
            # NEW: Handle Cashfree Order Creation securely
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                # 1. Parse request from frontend
                req_data = json.loads(post_data.decode('utf-8'))
                amount = float(req_data.get('amount', 0))
                email = req_data.get('customer_email')
                phone = req_data.get('customer_phone')
                customer_id = req_data.get('customer_id', 'cust_default')

                # 2. Call Cashfree PG Orders API
                headers = {
                    "Content-Type": "application/json",
                    "x-api-version": "2023-08-01",
                    "x-client-id": CASHFREE_APP_ID,
                    "x-client-secret": CASHFREE_SECRET_KEY
                }

                payload = {
                    "order_amount": amount,
                    "order_currency": "INR",
                    "customer_details": {
                        "customer_id": customer_id,
                        "customer_email": email,
                        "customer_phone": phone
                    },
                    "order_meta": {
                        "return_url": req_data.get('return_url', 'https://www.cashfree.com/devstudio/preview/pg/web/checkout?step=2')
                    }
                }

                response = requests.post(f"{CASHFREE_BASE_URL}/orders", headers=headers, json=payload)
                response_data = response.json()

                if response.status_code == 200:
                    # Return session ID and order details to frontend
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({
                        "payment_session_id": response_data.get("payment_session_id"),
                        "order_id": response_data.get("order_id")
                    }).encode('utf-8'))
                else:
                    self.send_response(response.status_code)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps(response_data).encode('utf-8'))

            except Exception as e:
                print("Cashfree Error:", e)
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'success': False, 'message': str(e)}).encode('utf-8'))
        else:
            super().do_GET() # Use standard GET handler for static files

if not os.path.exists(ORDERS_FILE):
    with open(ORDERS_FILE, 'w') as f:
        json.dump({}, f, indent=4)

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Laance Store API Server running on http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
