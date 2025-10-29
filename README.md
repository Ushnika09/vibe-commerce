# Vibe Commerce - Full Stack Shopping Cart

## 🚀 Features

- **Product Catalog** - Display products with images, prices, and categories
- **Shopping Cart** - Add, remove, and update item quantities  
- **Checkout System** - Complete orders with customer information
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Real-time Updates** - Cart updates instantly across components
- **Order Management** - Generate order receipts with unique numbers

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## 📦 API Endpoints

### Products
```bash
GET    /api/products          # Get all products
GET    /api/products/:id      # Get single product
```

### Cart
```bash
GET    /api/cart              # Get cart contents
POST   /api/cart              # Add item to cart
PUT    /api/cart/:id          # Update item quantity
DELETE /api/cart/:id          # Remove item from cart
DELETE /api/cart              # Clear entire cart
```

### Checkout
```bash
POST   /api/checkout          # Process order and generate receipt
```

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd vibe-commerce
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Environment Configuration**
Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
NODE_ENV=development
```

4. **Start Backend Server**
```bash
npm run dev
```
Backend will run on http://localhost:5000

5. **Frontend Setup** (new terminal)
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on http://localhost:3000

## 📁 Project Structure

```
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
```

## 🎯 Key Components

### Frontend Components
- **Navbar** - Navigation with cart item count
- **ProductCard** - Product display with add to cart
- **Cart** - Shopping cart with quantity controls  
- **CheckoutForm** - Customer information and order processing
- **CheckoutPage** - Order summary and completion

### Backend Models
- **Product** - Product catalog with name, price, image, category
- **Cart** - Shopping cart with items and quantities
- **Order** - Order management with customer details

## 🎨 Design Features

- **Modern UI** - Gradient backgrounds and smooth animations
- **Responsive Layout** - Mobile-first design approach
- **Interactive Elements** - Hover effects and loading states
- **Color Scheme** - Blue, purple, and pink gradients
- **Typography** - Clean, readable fonts with hierarchy

## 🔄 Workflow

1. **Browse Products** - View products on home page
2. **Add to Cart** - Select quantities and add items
3. **Manage Cart** - Update quantities or remove items
4. **Checkout** - Enter customer information
5. **Order Confirmation** - Receive order details and receipt

## 📱 Screenshots

*(Add your screenshots here)*
- Home page with product grid
- Shopping cart with items
- Checkout form
- Order confirmation

## 🚀 Deployment

### Backend Deployment
```bash
# Deploy to Heroku, Railway, or similar
# Set environment variables for production
```

### Frontend Deployment  
```bash
# Deploy to Netlify, Vercel, or similar
# Update API base URL for production
```

## 🧪 Testing

Test the application by:
1. Adding multiple products to cart
2. Updating quantities in cart
3. Removing items from cart
4. Completing checkout process
5. Verifying cart clears after order

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
```bash
git checkout -b feature/amazing-feature
```
3. Commit changes
```bash
git commit -m 'Add amazing feature'
```
4. Push to branch
```bash
git push origin feature/amazing-feature
```
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React team for amazing framework
- Tailwind CSS for utility-first CSS
- MongoDB for flexible database solution

---

**Note**: This is a mock e-commerce application for demonstration purposes. No real payments are processed.
