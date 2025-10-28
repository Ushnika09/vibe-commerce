const axios = require('axios');

// @desc    Get all products from Fake Store API
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // Fetch products from Fake Store API
    const response = await axios.get('https://fakestoreapi.com/products');
    
    // Limit to 8 products and format the data
    const products = response.data.slice(0, 8).map(product => ({
      id: product.id,
      name: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category
    }));

    res.json(products);
  } catch (error) {
    console.error('Error fetching products from Fake Store API:', error.message);
    
    // Fallback to mock data if API fails
    const fallbackProducts = [
      {
        id: 1,
        name: 'Wireless Headphones',
        price: 79.99,
        description: 'High-quality wireless headphones',
        image: 'https://via.placeholder.com/300',
        category: 'Electronics'
      },
      {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        description: 'Feature-rich smartwatch',
        image: 'https://via.placeholder.com/300',
        category: 'Electronics'
      }
    ];
    
    res.json(fallbackProducts);
  }
};

// @desc    Get single product from Fake Store API
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    
    const product = {
      id: response.data.id,
      name: response.data.title,
      price: response.data.price,
      description: response.data.description,
      image: response.data.image,
      category: response.data.category
    };

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = {
  getProducts,
  getProductById
};