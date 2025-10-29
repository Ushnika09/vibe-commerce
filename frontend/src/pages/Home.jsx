import ProductGrid from '../components/ProductGrid';

const Home = ({ onCartUpdate }) => {
  return <ProductGrid onCartUpdate={onCartUpdate} />;
};

export default Home;