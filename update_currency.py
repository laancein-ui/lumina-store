import re

with open("js/app.js", "r") as f:
    content = f.read()

# Replace $${ with ₹${
content = content.replace("$${", "₹${")
# Replace "$119.00" with "₹119.00" (example for string literals)
content = re.sub(r'\$([0-9]+(?:\.[0-9]+)?)', r'₹\1', content)

with open("js/app.js", "w") as f:
    f.write(content)

print("Currency updated.")
