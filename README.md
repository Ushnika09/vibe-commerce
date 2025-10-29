# Vibe Commerce - Full Stack Shopping Cart
### Video Link
![Loom link](https://www.loom.com/share/8c29bd1e62ae481cb10d77704a99f90b)

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

## 🏃‍♂️ Quick Start

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Ushnika09/vibe-commerce.git
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
NODE_ENV=development
MONGO_URI=mongodb+srv://karushnika_db_user:4mYuy0xxvSrFCDZ8@cluster0.dxwl6su.mongodb.net/
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
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── cartController.js
│   │   │   ├── checkoutController.js
│   │   │   └── productController.js
│   │   ├── models/
│   │   │   ├── Cart.js
│   │   │   ├── Order.js
│   │   │   └── Product.js
│   │   ├── routes/
│   │   │   ├── cartRoutes.js
│   │   │   ├── checkoutRoutes.js
│   │   │   └── productRoutes.js
│   │   ├── config/
│   │   │   └── db.js
│   │   └── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Cart.jsx
│   │   │   ├── CheckoutForm.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductGrid.jsx
│   │   ├── pages/
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   └── Home.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
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

### Home Page
![Home Page](./Screenshots/Home.png)

### Shopping Cart
![Shopping Cart](./Screenshots/Cart.png)

### Checkout Form
![Checkout Form](./Screenshots/Checkout.png)

### Order Confirmation
![Order Confirmation](./Screenshots/OrderConfirmed.png)


