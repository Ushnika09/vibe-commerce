Vibe Commerce - Full Stack Shopping Cart
A modern, responsive e-commerce shopping cart application built with React, Node.js, Express, and MongoDB.

🚀 Features
Product Catalog: Display products with images, prices, and categories

Shopping Cart: Add, remove, and update item quantities

Checkout System: Complete orders with customer information

Responsive Design: Works seamlessly on desktop and mobile devices

Real-time Updates: Cart updates instantly across all components

Order Management: Generate order receipts with unique order numbers

🛠️ Tech Stack
Frontend
React 18

React Router DOM

Tailwind CSS

Axios for API calls

Backend
Node.js

Express.js

MongoDB with Mongoose

CORS enabled

📦 API Endpoints
Products
GET /api/products - Get all products

GET /api/products/:id - Get single product

Cart
GET /api/cart - Get cart contents

POST /api/cart - Add item to cart

PUT /api/cart/:id - Update item quantity

DELETE /api/cart/:id - Remove item from cart

DELETE /api/cart - Clear entire cart

Checkout
POST /api/checkout - Process order and generate receipt

🏃‍♂️ Quick Start
Prerequisites
Node.js (v14 or higher)

MongoDB (local or Atlas)

npm or yarn

Installation
Clone the repository

bash
git clone <your-repo-url>
cd vibe-commerce
Backend Setup

bash
cd backend
npm install
Environment Configuration
Create .env file in backend directory:

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
NODE_ENV=development
Start Backend Server

bash
npm run dev
Backend will run on http://localhost:5000

Frontend Setup (new terminal)

bash
cd frontend
npm install
npm run dev
Frontend will run on http://localhost:3000

📁 Project Structure
text
vibe-commerce/
├── backend/
│   ├── controllers/
│   │   ├── cartController.js
│   │   ├── checkoutController.js
│   │   └── productController.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── cartRoutes.js
│   │   ├── checkoutRoutes.js
│   │   └── productRoutes.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Cart.jsx
│   │   │   ├── CheckoutForm.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── CartPage.jsx
│   │   │   └── CheckoutPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json
└── README.md
🎯 Key Components
Frontend Components
Navbar: Navigation with cart item count

ProductCard: Product display with add to cart functionality

Cart: Shopping cart management with quantity controls

CheckoutForm: Customer information and order processing

CheckoutPage: Order summary and completion

Backend Models
Product: Product catalog with name, price, image, category

Cart: Shopping cart with items and quantities

Order: Order management with customer details and totals

🎨 Design Features
Modern UI: Gradient backgrounds and smooth animations

Responsive Layout: Mobile-first design approach

Interactive Elements: Hover effects and loading states

Color Scheme: Blue, purple, and pink gradients

Typography: Clean, readable fonts with proper hierarchy

🔄 Workflow
Browse Products: View products on the home page

Add to Cart: Select quantities and add items to cart

Manage Cart: Update quantities or remove items

Checkout: Enter customer information and complete order

Order Confirmation: Receive order details and receipt

📱 Screenshots
(Add your screenshots here)

Home page with product grid

Shopping cart with items

Checkout form

Order confirmation

🚀 Deployment
Backend Deployment
Deploy to Heroku, Railway, or similar platform

Set environment variables for production

Frontend Deployment
Deploy to Netlify, Vercel, or similar platform

Update API base URL for production

🧪 Testing
Test the application by:

Adding multiple products to cart

Updating quantities in cart

Removing items from cart

Completing checkout process

Verifying cart clears after order

🤝 Contributing
Fork the repository

Create feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open Pull Request

📄 License
This project is licensed under the MIT License.

👥 Authors
Your Name - Initial work

🙏 Acknowledgments
React team for amazing framework

Tailwind CSS for utility-first CSS

MongoDB for flexible database solution
