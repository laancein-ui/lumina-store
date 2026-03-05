import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

CASHFREE_APP_ID = os.getenv('CASHFREE_APP_ID')
CASHFREE_SECRET_KEY = os.getenv('CASHFREE_SECRET_KEY')
CASHFREE_MODE = os.getenv('CASHFREE_MODE', 'sandbox')

CASHFREE_BASE_URL = "https://sandbox.cashfree.com/pg" if CASHFREE_MODE == "sandbox" else "https://api.cashfree.com/pg"

headers = {
    "Content-Type": "application/json",
    "x-api-version": "2023-08-01",
    "x-client-id": CASHFREE_APP_ID,
    "x-client-secret": CASHFREE_SECRET_KEY
}

def test_payload(payload):
    response = requests.post(f"{CASHFREE_BASE_URL}/orders", headers=headers, json=payload)
    print("STATUS", response.status_code)
    print("RESPONSE", response.json())

print("Testing valid payload...")
test_payload({
    "order_amount": 100,
    "order_currency": "INR",
    "customer_details": {
        "customer_id": "cust_123",
        "customer_email": "test@example.com",
        "customer_phone": "9999999999"
    },
    "order_meta": {
        "return_url": "https://www.google.com"
    }
})

print("\nTesting bad phone...")
test_payload({
    "order_amount": 100,
    "order_currency": "INR",
    "customer_details": {
        "customer_id": "cust_123",
        "customer_email": "test@example.com",
        "customer_phone": "123"
    },
    "order_meta": {
        "return_url": "https://www.google.com"
    }
})

print("\nTesting bad email...")
test_payload({
    "order_amount": 100,
    "order_currency": "INR",
    "customer_details": {
        "customer_id": "cust_123",
        "customer_email": "testexample",
        "customer_phone": "9999999999"
    },
    "order_meta": {
        "return_url": "https://www.google.com"
    }
})

print("\nTesting bad customer_id...")
test_payload({
    "order_amount": 100,
    "order_currency": "INR",
    "customer_details": {
        "customer_id": "cust @#$",
        "customer_email": "test@example.com",
        "customer_phone": "9999999999"
    },
    "order_meta": {
        "return_url": "https://www.google.com"
    }
})

print("\nTesting bad return_url...")
test_payload({
    "order_amount": 100,
    "order_currency": "INR",
    "customer_details": {
        "customer_id": "cust_123",
        "customer_email": "test@example.com",
        "customer_phone": "9999999999"
    },
    "order_meta": {
        "return_url": "xyz"
    }
})
