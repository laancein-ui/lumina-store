import http.server
import socketserver
import json
import os

PORT = 3000
ORDERS_FILE = 'orders.json'

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With, Content-type")
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
        else:
            self.send_response(404)
            self.end_headers()

if not os.path.exists(ORDERS_FILE):
    with open(ORDERS_FILE, 'w') as f:
        json.dump({}, f, indent=4)

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Lumina Store API Server running on http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
