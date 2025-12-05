# 📋 API Testing Guide

Complete guide for testing all API endpoints for the Snacks Factory Management System.

---

## 🔧 Test Methods

You can test the API using any of these tools:
1. **Browser** - For GET requests
2. **cURL** - Command line tool
3. **Postman** - GUI application
4. **Insomnia** - REST client
5. **Thunder Client** - VS Code extension

---

## 🏥 Health Check

Verify your backend is running:

```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running!"
}
```

---

## 📦 Materials API

### 1. Get All Materials
```bash
curl -X GET http://localhost:5000/api/materials
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Flour",
      "quantity": 100,
      "unit": "kg",
      "price": 1.50,
      "createdAt": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

### 2. Create Material
```bash
curl -X POST http://localhost:5000/api/materials \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Refined Flour",
    "quantity": 100,
    "unit": "kg",
    "price": 1.50
  }'
```

### 3. Get Material by ID
```bash
curl -X GET http://localhost:5000/api/materials/507f1f77bcf86cd799439011
```

### 4. Update Material
```bash
curl -X PUT http://localhost:5000/api/materials/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Flour",
    "quantity": 150,
    "unit": "kg",
    "price": 2.00
  }'
```

### 5. Delete Material
```bash
curl -X DELETE http://localhost:5000/api/materials/507f1f77bcf86cd799439011
```

### 6. Reduce Material Quantity
```bash
curl -X POST http://localhost:5000/api/materials/reduce-quantity \
  -H "Content-Type: application/json" \
  -d '{
    "id": "507f1f77bcf86cd799439011",
    "quantityToReduce": 10
  }'
```

---

## ⚙️ Production API

### 1. Get All Production Records
```bash
curl -X GET http://localhost:5000/api/production
```

### 2. Create Production Record
```bash
curl -X POST http://localhost:5000/api/production \
  -H "Content-Type: application/json" \
  -d '{
    "snackName": "Salted Chips",
    "quantity": 500,
    "date": "2025-01-15",
    "materialUsed": [],
    "status": "Completed"
  }'
```

### 3. Get Production by ID
```bash
curl -X GET http://localhost:5000/api/production/507f1f77bcf86cd799439011
```

### 4. Update Production
```bash
curl -X PUT http://localhost:5000/api/production/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "snackName": "Spiced Chips",
    "quantity": 600,
    "status": "Completed"
  }'
```

### 5. Delete Production
```bash
curl -X DELETE http://localhost:5000/api/production/507f1f77bcf86cd799439011
```

---

## 📦 Inventory API

### 1. Get All Inventory Items
```bash
curl -X GET http://localhost:5000/api/inventory
```

### 2. Create Inventory Item
```bash
curl -X POST http://localhost:5000/api/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "itemName": "Salted Chips",
    "quantity": 500,
    "unit": "pieces",
    "price": 5.00,
    "sku": "SKU-001",
    "category": "Snacks"
  }'
```

### 3. Get Item by ID
```bash
curl -X GET http://localhost:5000/api/inventory/507f1f77bcf86cd799439011
```

### 4. Update Item
```bash
curl -X PUT http://localhost:5000/api/inventory/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "itemName": "Salted Chips Premium",
    "quantity": 450,
    "price": 6.00
  }'
```

### 5. Delete Item
```bash
curl -X DELETE http://localhost:5000/api/inventory/507f1f77bcf86cd799439011
```

### 6. Update Stock
```bash
curl -X POST http://localhost:5000/api/inventory/update-stock \
  -H "Content-Type: application/json" \
  -d '{
    "id": "507f1f77bcf86cd799439011",
    "quantity": 300
  }'
```

### 7. Reduce Stock
```bash
curl -X POST http://localhost:5000/api/inventory/reduce-stock \
  -H "Content-Type: application/json" \
  -d '{
    "id": "507f1f77bcf86cd799439011",
    "quantityToReduce": 50
  }'
```

---

## 🚚 Orders API

### 1. Get All Orders
```bash
curl -X GET http://localhost:5000/api/orders
```

### 2. Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "itemId": "507f1f77bcf86cd799439011",
    "quantity": 100,
    "customerName": "ABC Retail Store",
    "notes": "Priority delivery"
  }'
```

### 3. Get Order by ID
```bash
curl -X GET http://localhost:5000/api/orders/507f1f77bcf86cd799439011
```

### 4. Get Orders by Status
```bash
curl -X GET http://localhost:5000/api/orders/status/Pending
```

Valid statuses: `Pending`, `Processing`, `Shipped`, `Delivered`

### 5. Update Order Status
```bash
curl -X PUT http://localhost:5000/api/orders/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Shipped",
    "dispatchDate": "2025-01-15"
  }'
```

### 6. Delete Order
```bash
curl -X DELETE http://localhost:5000/api/orders/507f1f77bcf86cd799439011
```

---

## 📊 Test Scenario: Complete Workflow

Follow this workflow to test the entire system:

### 1. Create Material
```bash
curl -X POST http://localhost:5000/api/materials \
  -H "Content-Type: application/json" \
  -d '{"name":"Flour","quantity":100,"unit":"kg","price":1.50}'
```
Save the returned `_id` as `MATERIAL_ID`

### 2. Create Inventory Item
```bash
curl -X POST http://localhost:5000/api/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "itemName":"Chips",
    "quantity":500,
    "unit":"pieces",
    "price":5.00,
    "sku":"SKU-001"
  }'
```
Save the returned `_id` as `ITEM_ID`

### 3. Record Production
```bash
curl -X POST http://localhost:5000/api/production \
  -H "Content-Type: application/json" \
  -d '{
    "snackName":"Salted Chips",
    "quantity":500,
    "status":"Completed"
  }'
```

### 4. Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "itemId":"ITEM_ID",
    "quantity":100,
    "customerName":"Store A"
  }'
```

### 5. Update Order Status
```bash
curl -X PUT http://localhost:5000/api/orders/ORDER_ID \
  -H "Content-Type: application/json" \
  -d '{"status":"Shipped"}'
```

### 6. View Dashboard Statistics
Visit: http://localhost:3000

---

## 🧪 Using Postman

### Import Collection

1. Open Postman
2. Click **Import**
3. Create requests for each endpoint manually, or
4. Use the cURL commands above (Postman can import cURL)

### Create Environment Variables

Set up variables for easy testing:

```
{{base_url}} = http://localhost:5000/api
{{material_id}} = [your_material_id]
{{item_id}} = [your_item_id]
{{order_id}} = [your_order_id]
```

### Example Request in Postman

```
Method: POST
URL: {{base_url}}/materials
Headers:
  Content-Type: application/json

Body (JSON):
{
  "name": "Flour",
  "quantity": 100,
  "unit": "kg",
  "price": 1.50
}
```

---

## ✅ Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | GET request successful |
| 201 | Created | POST request successful |
| 400 | Bad Request | Missing required fields |
| 404 | Not Found | Item doesn't exist |
| 500 | Server Error | Database connection issue |

---

## 🐛 Common API Errors

### "MONGO_URI is not defined"
```
Solution: Create .env file in backend with MONGO_URI
```

### "Cannot connect to MongoDB"
```
Solution: Check MongoDB Atlas connection string and credentials
```

### "Insufficient stock"
```
Solution: Ensure inventory has enough quantity before creating order
```

### "Material not found"
```
Solution: Use correct material ID
```

---

## 📝 Sample Data for Testing

### Material
```json
{
  "name": "Refined Flour",
  "quantity": 100,
  "unit": "kg",
  "price": 1.50
}
```

### Inventory Item
```json
{
  "itemName": "Salted Chips",
  "quantity": 500,
  "unit": "pieces",
  "price": 5.00,
  "sku": "SKU-001",
  "category": "Snacks"
}
```

### Production
```json
{
  "snackName": "Salted Chips",
  "quantity": 500,
  "date": "2025-01-15",
  "status": "Completed"
}
```

### Order
```json
{
  "itemId": "ITEM_ID_HERE",
  "quantity": 100,
  "customerName": "ABC Retail Store",
  "notes": "Urgent"
}
```

---

## 🚀 Automated Testing Tips

### Using Shell Script
```bash
#!/bin/bash

API="http://localhost:5000/api"

# Test Health
echo "Testing health endpoint..."
curl -X GET $API/health

# Test Materials
echo "Getting all materials..."
curl -X GET $API/materials

# Test Production
echo "Getting all production records..."
curl -X GET $API/production

# Test Inventory
echo "Getting inventory..."
curl -X GET $API/inventory

# Test Orders
echo "Getting orders..."
curl -X GET $API/orders
```

Save as `test-api.sh` and run:
```bash
chmod +x test-api.sh
./test-api.sh
```

---

## 📚 More Resources

- [Postman Documentation](https://learning.postman.com/)
- [cURL Manual](https://curl.se/docs/manual.html)
- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)

---

**Happy Testing! 🧪✨**
