# PHP Backend Integration Guide

This guide explains how to set up your PHP backend to work with the ProductHub React + Vite application.

## Quick Start

1. Set up your PHP backend with the API endpoints below
2. Configure CORS headers
3. Create the database tables
4. Set `VITE_API_URL` in your `.env` file
5. Start both servers and test

## API Endpoints Structure

Your PHP backend should implement the following RESTful API endpoints:

### Products API

```
GET    /api/products              - Get all products
GET    /api/products/{id}         - Get single product
POST   /api/products              - Create new product
PUT    /api/products/{id}         - Update product
DELETE /api/products/{id}         - Delete product
GET    /api/products/search?q=    - Search products
```

**Example Product Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Wireless Headphones",
      "category": "Electronics",
      "price": 129.99,
      "stock": 45,
      "image": "/images/headphones.png"
    }
  ]
}
```

### Suppliers API

```
GET    /api/suppliers             - Get all suppliers
GET    /api/suppliers/{id}        - Get single supplier
POST   /api/suppliers             - Create new supplier
PUT    /api/suppliers/{id}        - Update supplier
DELETE /api/suppliers/{id}        - Delete supplier
```

**Example Supplier Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "TechHub Distributors",
      "contactPerson": "John Smith",
      "email": "john@techhub.com",
      "phone": "+1 (555) 123-4567",
      "status": "Active"
    }
  ]
}
```

### Transactions API

```
GET    /api/transactions          - Get all transactions
GET    /api/transactions/{id}     - Get single transaction
POST   /api/transactions          - Create new transaction
GET    /api/transactions?date=    - Filter by date
GET    /api/transactions/stats    - Get statistics
```

**Example Transaction Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "invoiceId": "INV-2024-001",
      "date": "2024-01-15",
      "productName": "Wireless Headphones",
      "quantity": 2,
      "totalAmount": 259.98,
      "paymentStatus": "Paid"
    }
  ]
}
```

## Response Format

All endpoints should return JSON with this structure:

**Success Response:**
```json
{
  "success": true,
  "data": { /* your data here */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message here",
  "errors": { /* validation errors if any */ }
}
```

## CORS Configuration

Add these headers to your PHP responses to allow the React app to communicate:

```php
<?php
// Add at the top of all API files
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
```

## Sample PHP Endpoint

Here's a complete example of a products endpoint:

```php
<?php
// api/products/index.php

require_once '../config/database.php';

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Get all products
        $query = "SELECT * FROM products ORDER BY created_at DESC";
        $result = mysqli_query($conn, $query);
        $products = mysqli_fetch_all($result, MYSQLI_ASSOC);
        
        echo json_encode([
            'success' => true,
            'data' => $products
        ]);
        break;
        
    case 'POST':
        // Create product
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validate input
        if(!isset($data['name']) || !isset($data['price'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Name and price are required'
            ]);
            exit;
        }
        
        $query = "INSERT INTO products (name, category, price, stock, image) 
                  VALUES (?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ssdis", 
            $data['name'], 
            $data['category'] ?? '', 
            $data['price'], 
            $data['stock'] ?? 0, 
            $data['image'] ?? ''
        );
        
        if(mysqli_stmt_execute($stmt)) {
            $id = mysqli_insert_id($conn);
            echo json_encode([
                'success' => true,
                'data' => [
                    'id' => (string)$id,
                    'name' => $data['name'],
                    'category' => $data['category'] ?? '',
                    'price' => (float)$data['price'],
                    'stock' => (int)($data['stock'] ?? 0),
                    'image' => $data['image'] ?? ''
                ]
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Failed to create product'
            ]);
        }
        break;
        
    case 'PUT':
        // Update product
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $_GET['id'] ?? null;
        
        if(!$id) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Product ID is required'
            ]);
            exit;
        }
        
        $query = "UPDATE products SET name=?, category=?, price=?, stock=?, image=? WHERE id=?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ssdisi", 
            $data['name'], 
            $data['category'], 
            $data['price'], 
            $data['stock'], 
            $data['image'],
            $id
        );
        
        if(mysqli_stmt_execute($stmt)) {
            echo json_encode([
                'success' => true,
                'data' => array_merge(['id' => $id], $data)
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Failed to update product'
            ]);
        }
        break;
        
    case 'DELETE':
        // Delete product
        $id = $_GET['id'] ?? null;
        
        if(!$id) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Product ID is required'
            ]);
            exit;
        }
        
        $query = "DELETE FROM products WHERE id=?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $id);
        
        if(mysqli_stmt_execute($stmt)) {
            echo json_encode([
                'success' => true,
                'message' => 'Product deleted successfully'
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Failed to delete product'
            ]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'message' => 'Method not allowed'
        ]);
}
?>
```

## Database Configuration

Create `config/database.php`:

```php
<?php
$host = 'localhost';
$dbname = 'producthub';
$username = 'root';
$password = '';

$conn = mysqli_connect($host, $username, $password, $dbname);

if(!$conn) {
    die(json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . mysqli_connect_error()
    ]));
}
?>
```

## Database Schema

Create these tables in your MySQL database:

```sql
CREATE DATABASE IF NOT EXISTS producthub;
USE producthub;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id VARCHAR(50) UNIQUE NOT NULL,
    date DATE NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_status ENUM('Paid', 'Pending', 'Failed') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_stock ON products(stock);
CREATE INDEX idx_suppliers_status ON suppliers(status);
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_transactions_status ON transactions(payment_status);
```

## Environment Setup

1. **React App (.env in root):**
```env
VITE_API_URL=http://localhost/producthub-api
```

2. **Start your PHP server:**
```bash
# Using PHP built-in server
php -S localhost:8000 -t public/

# Or use XAMPP/WAMP/MAMP
```

3. **Start React dev server:**
```bash
npm run dev
```

## Connecting React to PHP

Update `src/lib/api.ts` to use your PHP backend:

```typescript
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
```

## Testing the Connection

1. Start PHP server
2. Start React app: `npm run dev`
3. Open browser console (F12)
4. Navigate to Products page
5. Check Network tab for API calls
6. Data should load from your PHP backend

## Authentication (Optional)

If you need authentication, implement JWT or session-based auth:

### Session-Based (Simple)
```php
<?php
session_start();

// Login endpoint
if($_POST['username'] && $_POST['password']) {
    // Verify credentials
    $_SESSION['user_id'] = $user_id;
    $_SESSION['username'] = $username;
    
    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $user_id,
            'username' => $username
        ]
    ]);
}

// Protected endpoint
session_start();
if(!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => 'Unauthorized'
    ]);
    exit;
}
?>
```

### JWT-Based (Advanced)
```php
<?php
// Use firebase/php-jwt library
require 'vendor/autoload.php';
use Firebase\JWT\JWT;

$key = "your-secret-key";

// Generate token on login
$payload = [
    'user_id' => $user_id,
    'username' => $username,
    'exp' => time() + (60 * 60) // 1 hour
];

$token = JWT::encode($payload, $key, 'HS256');

echo json_encode([
    'success' => true,
    'token' => $token
]);
?>
```

## Troubleshooting

### CORS Errors
- Make sure CORS headers are set on all PHP files
- Check that preflight OPTIONS requests return 200

### 404 Errors
- Verify PHP server is running
- Check API URL in `.env` file
- Ensure PHP files are in correct location

### Empty Responses
- Check PHP error logs
- Verify database connection
- Test endpoints with Postman first

### Database Connection Failed
- Verify MySQL is running
- Check credentials in `config/database.php`
- Ensure database exists

## Production Deployment

1. Build React app: `npm run build`
2. Upload `dist/` folder to your web server
3. Upload PHP files to same or different server
4. Update `VITE_API_URL` to production API URL
5. Rebuild: `npm run build`
6. Enable production PHP settings (disable error display, enable logging)

## Security Best Practices

- Use prepared statements (already shown in examples)
- Validate and sanitize all inputs
- Implement rate limiting
- Use HTTPS in production
- Store sensitive data in environment variables
- Implement proper authentication
- Log all API access
- Regular security audits

## Need Help?

- Check PHP error logs: `/var/log/php/error.log` or `php_error.log`
- Check browser console for frontend errors
- Test API endpoints with Postman or curl
- Verify database queries in MySQL console
