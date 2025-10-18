/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Component } from "react";
import { useTheme } from "next-themes";
import { Package, Search, ShoppingCart, Filter, Star, X, ChevronLeft, ChevronRight, MapPin, Tag, Eye } from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNotification } from "../utils/NotificationSystem";
import Loading from "../utils/Loading";
import Error from "../utils/ErrorProps";
import Footer from "../components/Footer";

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-8 text-red-500">
          Something went wrong. Please try again.
          <button
            onClick={() => window.location.reload()}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const dummyProducts = [
  { id: 1, slug: "prod1", name: "Smart TV 55\"", selling_price: 150000, compare_price: 180000, stock: 5, rating: 4.5, state: "Lagos", city: "Ikeja", country: "Nigeria", short_description: "High-quality 4K TV", product_main_image: "https://placehold.co/300x200?text=TV", discountActive: true, discount_percentage: 20, tags: ["electronics", "tv"], category: { name: "Electronics", slug: "electronics" } },
  { id: 2, slug: "prod2", name: "Men's Jacket", selling_price: 25000, stock: 10, rating: 4.0, state: "Abuja", city: "FCT", country: "Nigeria", short_description: "Stylish winter jacket", product_main_image: "https://placehold.co/300x200?text=Jacket", tags: ["fashion", "men"], category: { name: "Fashion", slug: "fashion" } },
  { id: 3, slug: "prod3", name: "Blender", selling_price: 12000, stock: 3, rating: 3.8, state: "Port Harcourt", city: "Rivers", country: "Nigeria", short_description: "Powerful kitchen blender", product_main_image: "https://placehold.co/300x200?text=Blender", tags: ["home-living"], category: { name: "Home & Living", slug: "home-living" } },
];

const dummySponsored = [
  { id: 1, slug: "sprod1", name: "Wireless Earbuds", selling_price: 15000, product_main_image: "https://placehold.co/300x200?text=Earbuds", short_description: "Great sound quality", category: { name: "Electronics", slug: "electronics" } },
  { id: 2, slug: "sprod2", name: "Laptop Bag", selling_price: 8000, product_main_image: "https://placehold.co/300x200?text=Bag", short_description: "Durable and stylish", category: { name: "Fashion", slug: "fashion" } },
  { id: 3, slug: "sprod3", name: "Smartwatch", selling_price: 25000, product_main_image: "https://placehold.co/300x200?text=Watch", short_description: "Fitness tracking included", category: { name: "Electronics", slug: "electronics" } },
];

const dummyStates = [
  { name: "Lagos", count: 20, products: dummyProducts.filter(p => p.state === "Lagos") },
  { name: "Abuja", count: 15, products: dummyProducts.filter(p => p.state === "Abuja") },
  { name: "Port Harcourt", count: 10, products: dummyProducts.filter(p => p.state === "Port Harcourt") },
];

const ProductDetails = ({ product, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <button onClick={onClose} className="mb-4 text-blue-500 hover:text-blue-600"><X size={24} /></button>
      <div className="flex flex-col md:flex-row gap-6">
        <img src={product.product_main_image || "https://placehold.co/300x200?text=No+Image"} alt={product.name} className="w-full md:w-1/2 h-64 object-cover rounded-lg" />
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{product.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">{product.short_description || "No description"}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Long Description:</strong> {product.long_description || "N/A"}</p>
          <div className="flex items-center mb-2">
            <p className="text-xl font-bold text-blue-500 dark:text-blue-400">
              ₦{product.has_active_discount ? product.final_price : product.selling_price}
            </p>
            {product.has_active_discount && <p className="text-sm text-gray-500 line-through ml-2">₦{product.compare_price}</p>}
          </div>
          <div className="flex items-center mb-2">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="ml-1 text-gray-700 dark:text-gray-300">{product.rating || 0}</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">({product.reviews_count || 0} reviews)</span>
          </div>
          <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'} mb-2`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
          </p>
          <p className="text-sm text-gray-500 mb-2 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />{product.city}, {product.state}, {product.country}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Brand:</strong> {product.brand?.name || "N/A"}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Warehouse:</strong> {product.warehouse?.name || "N/A"} ({product.warehouse?.address || "N/A"})</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Seller:</strong> {product.user?.name || "N/A"}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Category:</strong> {product.category?.name || "N/A"}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Views:</strong> {product.views_count || 0}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Sold:</strong> {product.sold_count || 0}</p>
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const { theme, setTheme } = useTheme();
  const { addNotification } = useNotification();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState(dummyProducts);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [stateProducts, setStateProducts] = useState([]);
  const [sponsoredProducts, setSponsoredProducts] = useState(dummySponsored);
  const [states, setStates] = useState(dummyStates);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const baseUrl = "https://api-ojaflow.taskflow.com.ng/api";

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const catsRes = await fetch(`${baseUrl}/product-categories`);
      if (catsRes.ok) {
        const catsData = await catsRes.json();
        const normalizedCategories = catsData.data.data?.map(cat => ({
          id: cat.id,
          name: cat.name || "Unnamed Category",
          slug: cat.slug,
          productCount: 0
        }));
        console.log(normalizedCategories)
        setCategories(normalizedCategories);
      } else {
        addNotification("Failed to fetch categories", "error");
      }

      const prodsRes = await fetch(`${baseUrl}/salable/products`);
      if (prodsRes.ok) {
        const prodsData = await prodsRes.json();
        const productsWithProps = prodsData.data.map(p => ({
          ...p,
          discountActive: p.discount_starts_at && p.discount_ends_at
            ? new Date() >= new Date(p.discount_starts_at) && new Date() <= new Date(p.discount_ends_at)
            : false,
          tags: Array.isArray(p.tags) ? p.tags : [],
          product_main_image: p.product_main_image || "https://placehold.co/300x200?text=No+Image",
          rating: p.rating || 0,
          category: p.category || { name: "N/A", slug: "" },
          final_price: p.has_active_discount ? p.selling_price * (1 - p.discount_percentage / 100) : p.selling_price,
          has_active_discount: p.discount_percentage && p.discount_starts_at && p.discount_ends_at
        }));
        setProducts(productsWithProps);
        setSponsoredProducts(productsWithProps.filter(p => p.is_sponsored).slice(0, 10) || dummySponsored);

        const stateMap = productsWithProps.reduce((acc, p) => {
          const st = p.state || 'Unknown';
          if (!acc[st]) acc[st] = { name: st, count: 0, products: [] };
          acc[st].count++;
          acc[st].products.push(p);
          return acc;
        }, {});
        setStates(Object.values(stateMap));

        const catsWithCount = categories.map(cat => ({
          ...cat,
          productCount: productsWithProps.filter(p => p.category?.slug === cat.slug).length
        }));
        console.log(catsWithCount)
        // setCategories(catsWithCount);
        addNotification("Data loaded successfully", "success");
      } else {
        addNotification("Failed to fetch products", "error");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Please try again.");
      addNotification("Error loading data", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory({ name: cat.name, slug: cat.slug });
    setCategoryProducts(products.filter(p => p.category?.slug === cat.slug));
    setFilterOpen(false);
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    if (state) {
      const filtered = products.filter(p => p.state === state);
      setStateProducts(filtered);
    } else {
      setStateProducts([]);
    }
    setFilterOpen(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      try {
        const res = await fetch(`${baseUrl}/salable/products?search=${searchTerm}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.data.map(p => ({
            ...p,
            tags: Array.isArray(p.tags) ? p.tags : [],
            product_main_image: p.product_main_image || "https://placehold.co/300x200?text=No+Image",
            rating: p.rating || 0,
            category: p.category || { name: "N/A", slug: "" },
            final_price: p.has_active_discount ? p.selling_price * (1 - p.discount_percentage / 100) : p.selling_price,
            has_active_discount: p.discount_percentage && p.discount_starts_at && p.discount_ends_at
          })));
        } else {
          addNotification("Search failed, using local filter", "warning");
          setProducts(products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())));
        }
      } catch (err) {
        console.error(err);
        addNotification("Search failed, using local filter", "warning");
        setProducts(products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())));
      }
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleFilter = () => setFilterOpen(!filterOpen);

  const handlePriceFilter = (e) => {
    const [min, max] = e.target.value.split(',').map(Number);
    setPriceRange([min || 0, max || 100000]);
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const filteredProducts = products.filter(p =>
    p.selling_price >= priceRange[0] &&
    p.selling_price <= priceRange[1] &&
    (selectedTags.length === 0 || selectedTags.some(tag => p.tags.includes(tag))) &&
    (!selectedState || p.state === selectedState)
  );

  const uniqueTags = [...new Set(products.flatMap(p => p.tags || []))];

  if (!mounted || isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <ErrorBoundary>
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
              {/* <h1 className="text-3xl font-bold text-blue-500 dark:text-blue-400">OjaFlow</h1> */}
              <button onClick={toggleTheme} className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
            <nav className="hidden md:flex space-x-8 text-lg">
              <a href="#home" className="hover:text-blue-500 dark:hover:text-blue-400 transition">Home</a>
              <a href="#categories" className="hover:text-blue-500 dark:hover:text-blue-400 transition">Categories</a>
              <a href="#deals" className="hover:text-blue-500 dark:hover:text-blue-400 transition">Deals</a>
              <a href="#states" className="hover:text-blue-500 dark:hover:text-blue-400 transition">By State</a>
            </nav>
            <form onSubmit={handleSearch} className="relative flex-1 max-w-xl mx-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600">
                <Search size={18} />
              </button>
            </form>
            <div className="flex items-center space-x-4">
              <button onClick={toggleTheme} className="hidden md:block p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <ShoppingCart className="w-6 h-6 text-blue-500 dark:text-blue-400 cursor-pointer" />
              <button onClick={toggleFilter} className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Filter Sidebar */}
        {filterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:bg-opacity-0 md:static md:w-64 md:min-h-screen">
            <div className="bg-white dark:bg-gray-800 w-64 h-full p-6 shadow-lg md:shadow-none">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Filters</h3>
                <button onClick={toggleFilter} className="md:hidden text-gray-600 dark:text-gray-300">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Price Range (₦)</h4>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full accent-blue-500"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>₦0</span>
                    <span>₦{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">State</h4>
                  <select
                    value={selectedState}
                    onChange={handleStateChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                  >
                    <option value="">All States</option>
                    {states.map(state => (
                      <option key={state.name} value={state.name}>{state.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {uniqueTags.length > 0 ? (
                      uniqueTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => handleTagToggle(tag)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedTags.includes(tag)
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          } hover:bg-blue-500 hover:text-white transition`}
                        >
                          {tag}
                        </button>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">No tags available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Banner Section */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome to OjaFlow!</h2>
            <p className="text-lg mb-6">Discover amazing deals and shop the latest products across Nigeria.</p>
            <button className="bg-white text-blue-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
              Shop Now
            </button>
          </div>
        </section>

        {/* All Products */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.slug}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
                >
                  {product.has_active_discount && (
                    <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {product.discount_percentage}% OFF
                    </span>
                  )}
                  <img
                    src={product.product_main_image}
                    alt={product.name}
                    className="w-full h-40 sm:h-48 object-cover"
                    onError={(e) => { e.target.src = "https://placehold.co/300x200?text=No+Image"; }}
                  />
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-sm sm:text-lg mb-1 text-gray-900 dark:text-gray-100">{product.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-1 line-clamp-2">{product.short_description}</p>
                    <div className="flex items-center mb-1">
                      <p className="text-lg sm:text-xl font-bold text-blue-500 dark:text-blue-400">
                        ₦{product.final_price || product.selling_price}
                      </p>
                      {product.has_active_discount && <p className="text-xs sm:text-sm text-gray-500 line-through ml-1">₦{product.compare_price}</p>}
                    </div>
                    <div className="flex items-center mb-1">
                      <Star className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-500 fill-current" />
                      <span className="ml-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{product.rating}</span>
                    </div>
                    <p className={`text-xs sm:text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'} mb-1`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                    </p>
                    <button
                      onClick={() => handleProductClick(product)}
                      className="w-full bg-blue-500 text-white py-1 sm:py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-xs sm:text-sm"
                    >
                      <Eye className="w-3 sm:w-4 h-3 sm:h-4 mr-1" /> View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-4">No products found matching your criteria.</p>
            )}
          </div>
        </section>

        {/* Categories Carousel */}
    <section id="categories" className="py-12 bg-white dark:bg-gray-800">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">Shop by Category</h2>
    <Carousel
      showThumbs={false}
      infiniteLoop
      autoPlay
      interval={4000}
      centerMode
      centerSlidePercentage={100 / (categories.length > 0 ? Math.min(categories.length, 7) : 1)}
      emulateTouch
      showArrows={true}
      renderArrowPrev={(clickHandler, hasPrev) => hasPrev && (
        <button onClick={clickHandler} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 z-10">
          <ChevronLeft size={20} />
        </button>
      )}
      renderArrowNext={(clickHandler, hasNext) => hasNext && (
        <button onClick={clickHandler} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 z-10">
          <ChevronRight size={20} />
        </button>
      )}
      renderIndicator={(onClickHandler, isSelected, index) => (
        <button
          onClick={onClickHandler}
          className={`w-2 h-2 rounded-full mx-1 ${isSelected ? 'bg-blue-500' : 'bg-gray-300'}`}
        />
      )}
    >
      {categories.length > 0 ? (
        categories.map((cat) => (
          <div key={cat.slug} className="px-1 sm:px-2">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-lg p-3 sm:p-4 text-center cursor-pointer hover:shadow-xl transition-shadow duration-300 h-32 sm:h-40 flex flex-col items-center justify-center">
              <Package className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-2 text-blue-500 dark:text-blue-400" />
              <h3 className="text-sm sm:text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">{cat.name}</h3>
              <p className="text-xs sm:text-lg font-bold text-blue-500 dark:text-blue-400">{cat.productCount} Products</p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center p-4 text-gray-500 dark:text-gray-400">Loading categories...</div>
      )}
    </Carousel>
  </div>
</section>
        {/* Category Products */}
        {selectedCategory && (
          <section className="py-12 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Products in {selectedCategory.name}</h2>
                <button onClick={() => setSelectedCategory(null)} className="text-blue-500 dark:text-blue-400 hover:underline">Back to Categories</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {categoryProducts.map((product) => (
                  <div
                    key={product.slug}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
                  >
                    {product.has_active_discount && (
                      <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {product.discount_percentage}% OFF
                      </span>
                    )}
                    <img
                      src={product.product_main_image}
                      alt={product.name}
                      className="w-full h-40 sm:h-48 object-cover"
                      onError={(e) => { e.target.src = "https://placehold.co/300x200?text=No+Image"; }}
                    />
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-lg mb-1 text-gray-900 dark:text-gray-100">{product.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-1 line-clamp-2">{product.short_description}</p>
                      <div className="flex items-center mb-1">
                        <p className="text-lg sm:text-xl font-bold text-blue-500 dark:text-blue-400">
                          ₦{product.final_price || product.selling_price}
                        </p>
                        {product.has_active_discount && <p className="text-xs sm:text-sm text-gray-500 line-through ml-1">₦{product.compare_price}</p>}
                      </div>
                      <div className="flex items-center mb-1">
                        <Star className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-500 fill-current" />
                        <span className="ml-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{product.rating}</span>
                      </div>
                      <p className={`text-xs sm:text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'} mb-1`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                      </p>
                      <button
                        onClick={() => handleProductClick(product)}
                        className="w-full bg-blue-500 text-white py-1 sm:py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-xs sm:text-sm"
                      >
                        <Eye className="w-3 sm:w-4 h-3 sm:h-4 mr-1" /> View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Sponsored Products */}
        <section id="deals" className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">Sponsored Deals</h2>
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              interval={3000}
              centerMode
              centerSlidePercentage={33.33}
              emulateTouch
              showArrows={true}
              renderArrowPrev={(clickHandler, hasPrev) => hasPrev && (
                <button onClick={clickHandler} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 z-10">
                  <ChevronLeft size={20} />
                </button>
              )}
              renderArrowNext={(clickHandler, hasNext) => hasNext && (
                <button onClick={clickHandler} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 z-10">
                  <ChevronRight size={20} />
                </button>
              )}
              renderIndicator={(onClickHandler, isSelected, index) => (
                <button
                  onClick={onClickHandler}
                  className={`w-2 h-2 rounded-full mx-1 ${isSelected ? 'bg-blue-500' : 'bg-gray-300'}`}
                />
              )}
            >
              {sponsoredProducts.map((product) => (
                <div key={product.slug} className="px-1 sm:px-2  h-[60vh] ">
                  <div className="bg-gradient-to-br from-gray-100  to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-lg p-3 sm:p-4 text-center hover:shadow-xl transition-shadow duration-300 h-48 sm:h-56 flex flex-col items-center justify-center">
                    <p className="text-blue-800 dark:text-blue-200 mb-1 flex items-center justify-center"><Tag className="w-3 sm:w-4 h-3 sm:h-4 mr-1" /> Sponsored</p>
                    <img
                      src={product.product_main_image}
                      alt={product.name}
                      className="w-32 h-24 sm:w-40 sm:h-32 object-cover rounded-lg mb-2"
                      onError={(e) => { e.target.src = "https://placehold.co/300x200?text=No+Image"; }}
                    />
                    <h3 className="font-semibold text-sm sm:text-lg mb-1 text-gray-900 dark:text-gray-100">{product.name}</h3>
                    <p className="text-xl font-bold text-blue-500 dark:text-blue-400 mb-1">₦{product.selling_price}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-2">{product.short_description}</p>
                    <button
                      onClick={() => handleProductClick({ ...product, category: product.category })}
                      className="w-full bg-blue-500 text-white py-1 sm:py-2 rounded-lg hover:bg-blue-600 transition-colors text-xs sm:text-sm"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </section>

        {/* States Carousel */}
        <section id="states" className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">Shop by State</h2>
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              interval={4000}
              centerMode
              centerSlidePercentage={33.33}
              emulateTouch
              showArrows={true}
              renderArrowPrev={(clickHandler, hasPrev) => hasPrev && (
                <button onClick={clickHandler} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 z-10">
                  <ChevronLeft size={20} />
                </button>
              )}
              renderArrowNext={(clickHandler, hasNext) => hasNext && (
                <button onClick={clickHandler} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 z-10">
                  <ChevronRight size={20} />
                </button>
              )}
              renderIndicator={(onClickHandler, isSelected, index) => (
                <button
                  onClick={onClickHandler}
                  className={`w-2 h-2 rounded-full mx-1 ${isSelected ? 'bg-blue-500' : 'bg-gray-300'}`}
                />
              )}
            >
              {states.map((state) => (
                <div key={state.name} className="px-1 sm:px-2">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-lg p-3 sm:p-4 text-center cursor-pointer hover:shadow-xl transition-shadow duration-300 h-32 sm:h-40 flex flex-col items-center justify-center">
                    <MapPin className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-2 text-blue-500 dark:text-blue-400" />
                    <h3 className="text-sm sm:text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">{state.name}</h3>
                    <p className="text-xs sm:text-lg font-bold text-blue-500 dark:text-blue-400">{state.count} Products</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </section>

        {/* State Products */}
        {selectedState && (
          <section className="py-12 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Products from {selectedState}</h2>
                <button onClick={() => setSelectedState("")} className="text-blue-500 dark:text-blue-400 hover:underline">Back to States</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {stateProducts.map((product) => (
                  <div
                    key={product.slug}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
                  >
                    {product.has_active_discount && (
                      <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {product.discount_percentage}% OFF
                      </span>
                    )}
                    <img
                      src={product.product_main_image}
                      alt={product.name}
                      className="w-full h-40 sm:h-48 object-cover"
                      onError={(e) => { e.target.src = "https://placehold.co/300x200?text=No+Image"; }}
                    />
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-lg mb-1 text-gray-900 dark:text-gray-100">{product.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-1 line-clamp-2">{product.short_description}</p>
                      <div className="flex items-center mb-1">
                        <p className="text-lg sm:text-xl font-bold text-blue-500 dark:text-blue-400">
                          ₦{product.final_price || product.selling_price}
                        </p>
                        {product.has_active_discount && <p className="text-xs sm:text-sm text-gray-500 line-through ml-1">₦{product.compare_price}</p>}
                      </div>
                      <div className="flex items-center mb-1">
                        <Star className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-500 fill-current" />
                        <span className="ml-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{product.rating}</span>
                      </div>
                      <p className={`text-xs sm:text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'} mb-1`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                      </p>
                      <button
                        onClick={() => handleProductClick(product)}
                        className="w-full bg-blue-500 text-white py-1 sm:py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-xs sm:text-sm"
                      >
                        <Eye className="w-3 sm:w-4 h-3 sm:h-4 mr-1" /> View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {selectedProduct && <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Home;


























// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect, Component } from "react";
// import { useTheme } from "next-themes";
// import { Package, Search, ShoppingCart, Filter, Star, X, ChevronLeft, ChevronRight, MapPin, Tag, Eye } from "lucide-react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { useNotification } from "../utils/NotificationSystem";
// import Loading from "../utils/Loading";
// import Error from "../utils/ErrorProps";
// import Footer from "../components/Footer";

// // Error Boundary Component
// class ErrorBoundary extends Component {
//   state = { hasError: false };

//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="text-center p-8 text-red-500">
//           Something went wrong. Please try again.
//           <button
//             onClick={() => window.location.reload()}
//             className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Retry
//           </button>
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }

// const ProductDetails = ({ product, onClose }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//     <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
//       <button onClick={onClose} className="mb-4 text-blue-500 hover:text-blue-600"><X size={24} /></button>
//       <div className="flex flex-col md:flex-row gap-6">
//         <img src={product.product_main_image || "https://placehold.co/300x200?text=No+Image"} alt={product.name} className="w-full md:w-1/2 h-64 object-cover rounded-lg" />
//         <div className="flex-1">
//           <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{product.name}</h3>
//           <p className="text-gray-600 dark:text-gray-400 mb-2">{product.short_description || "No description"}</p>
//           <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Long Description:</strong> {product.long_description || "N/A"}</p>
//           <div className="flex items-center mb-2">
//             <p className="text-xl font-bold text-blue-500 dark:text-blue-400">
//               ₦{product.has_active_discount ? product.final_price : product.selling_price}
//             </p>
//             {product.has_active_discount && <p className="text-sm text-gray-500 line-through ml-2">₦{product.compare_price}</p>}
//           </div>
//           <div className="flex items-center mb-2">
//             <Star className="w-5 h-5 text-yellow-500 fill-current" />
//             <span className="ml-1 text-gray-700 dark:text-gray-300">{product.rating || 0}</span>
//             <span className="ml-2 text-gray-600 dark:text-gray-400">({product.reviews_count || 0} reviews)</span>
//           </div>
//           <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'} mb-2`}>
//             {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
//           </p>
//           <p className="text-sm text-gray-500 mb-2 flex items-center">
//             <MapPin className="w-4 h-4 mr-1" />{product.city}, {product.state}, {product.country}
//           </p>
//           <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Brand:</strong> {product.brand?.name || "N/A"}</p>
//           <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Warehouse:</strong> {product.warehouse?.name || "N/A"} ({product.warehouse?.address || "N/A"})</p>
//           <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Seller:</strong> {product.user?.name || "N/A"}</p>
//           <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Category:</strong> {product.category?.name || "N/A"}</p>
//           <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Views:</strong> {product.views_count || 0}</p>
//           <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Sold:</strong> {product.sold_count || 0}</p>
//           <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
//             <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const Home = () => {
//   const { theme, setTheme } = useTheme();
//   const { addNotification } = useNotification();
//   const [mounted, setMounted] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [categoryProducts, setCategoryProducts] = useState([]);
//   const [selectedState, setSelectedState] = useState("");
//   const [stateProducts, setStateProducts] = useState([]);
//   const [sponsoredProducts, setSponsoredProducts] = useState([]);
//   const [states, setStates] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [warehouses, setWarehouses] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [transfers, setTransfers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [priceRange, setPriceRange] = useState([0, 100000]);
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const baseUrl = "https://api-ojaflow.taskflow.com.ng/api";

//   useEffect(() => {
//     setMounted(true);
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       // Fetch categories
//       const catsRes = await fetch(`${baseUrl}/product-categories`);
//       const catsData = await catsRes.json();
//       if (catsRes.ok && catsData.data?.data) {
//         const normalizedCategories = catsData.data.data.map(cat => ({
//           id: cat.id,
//           name: cat.name || "Unnamed Category",
//           slug: cat.slug,
//           productCount: 0
//         }));
//         setCategories(normalizedCategories);
//       } else {
//         addNotification("Failed to fetch categories", "error");
//       }

//       // Fetch products
//       const prodsRes = await fetch(`${baseUrl}/salable/products`);
//       const prodsData = await prodsRes.json();
//       if (prodsRes.ok && prodsData.data) {
//         const productsWithProps = prodsData.data.map(p => ({
//           ...p,
//           discountActive: p.discount_starts_at && p.discount_ends_at
//             ? new Date() >= new Date(p.discount_starts_at) && new Date() <= new Date(p.discount_ends_at)
//             : false,
//           tags: Array.isArray(p.tags) ? p.tags : [],
//           product_main_image: p.product_main_image || "https://placehold.co/300x200?text=No+Image",
//           rating: p.rating || 0,
//           category: p.category || { name: "N/A", slug: "" },
//           final_price: p.has_active_discount ? p.selling_price * (1 - p.discount_percentage / 100) : p.selling_price,
//           has_active_discount: p.discount_percentage && p.discount_starts_at && p.discount_ends_at
//         }));
//         setProducts(productsWithProps);
//         setSponsoredProducts(productsWithProps.filter(p => p.is_sponsored).slice(0, 10));

//         // Group products by state
//         const stateMap = productsWithProps.reduce((acc, p) => {
//           const st = p.state || 'Unknown';
//           if (!acc[st]) acc[st] = { name: st, count: 0, products: [] };
//           acc[st].count++;
//           acc[st].products.push(p);
//           return acc;
//         }, {});
//         setStates(Object.values(stateMap));

//         // Update categories with product counts
//         const catsWithCount = categories.map(cat => ({
//           ...cat,
//           productCount: productsWithProps.filter(p => p.category?.slug === cat.slug).length
//         }));
//         setCategories(catsWithCount);
//         addNotification("Products loaded successfully", "success");
//       } else {
//         addNotification("Failed to fetch products", "error");
//       }

//       // Fetch brands
//       const brandsRes = await fetch(`${baseUrl}/brands`);
//       const brandsData = await brandsRes.json();
//       if (brandsRes.ok && brandsData.data) {
//         setBrands(brandsData.data);
//       } else {
//         addNotification("Failed to fetch brands", "error");
//       }

//       // Fetch warehouses
//       const warehousesRes = await fetch(`${baseUrl}/warehouses/list`);
//       const warehousesData = await warehousesRes.json();
//       if (warehousesRes.ok && warehousesData.data) {
//         setWarehouses(warehousesData.data);
//       } else {
//         addNotification("Failed to fetch warehouses", "error");
//       }

//       // Fetch tags
//       const tagsRes = await fetch(`${baseUrl}/tags`);
//       const tagsData = await tagsRes.json();
//       if (tagsRes.ok && tagsData.data) {
//         setTags(tagsData.data);
//       } else {
//         addNotification("Failed to fetch tags", "error");
//       }

//       // Fetch warehouse transfers
//       const transfersRes = await fetch(`${baseUrl}/warehouse-transfers`);
//       const transfersData = await transfersRes.json();
//       if (transfersRes.ok && transfersData.data) {
//         setTransfers(transfersData.data);
//       } else {
//         addNotification("Failed to fetch warehouse transfers", "error");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch data. Please try again.");
//       addNotification("Error loading data", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCategoryClick = (cat) => {
//     setSelectedCategory({ name: cat.name, slug: cat.slug });
//     setCategoryProducts(products.filter(p => p.category?.slug === cat.slug));
//     setFilterOpen(false);
//   };

//   const handleStateChange = (e) => {
//     const state = e.target.value;
//     setSelectedState(state);
//     if (state) {
//       const filtered = products.filter(p => p.state === state);
//       setStateProducts(filtered);
//     } else {
//       setStateProducts([]);
//     }
//     setFilterOpen(false);
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       try {
//         const res = await fetch(`${baseUrl}/salable/products?search=${searchTerm}`);
//         const data = await res.json();
//         if (res.ok && data.data) {
//           setProducts(data.data.map(p => ({
//             ...p,
//             tags: Array.isArray(p.tags) ? p.tags : [],
//             product_main_image: p.product_main_image || "https://placehold.co/300x200?text=No+Image",
//             rating: p.rating || 0,
//             category: p.category || { name: "N/A", slug: "" },
//             final_price: p.has_active_discount ? p.selling_price * (1 - p.discount_percentage / 100) : p.selling_price,
//             has_active_discount: p.discount_percentage && p.discount_starts_at && p.discount_ends_at
//           })));
//         } else {
//           addNotification("Search failed, using local filter", "warning");
//           setProducts(products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())));
//         }
//       } catch (err) {
//         console.error(err);
//         addNotification("Search failed, using local filter", "warning");
//         setProducts(products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())));
//       }
//     }
//   };

//   const toggleTheme = () => {
//     setTheme(theme === 'dark' ? 'light' : 'dark');
//   };

//   const toggleFilter = () => setFilterOpen(!filterOpen);

//   const handlePriceFilter = (e) => {
//     const [min, max] = e.target.value.split(',').map(Number);
//     setPriceRange([min || 0, max || 100000]);
//   };

//   const handleTagToggle = (tag) => {
//     setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
//   };

//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//   };

//   const filteredProducts = products.filter(p =>
//     p.selling_price >= priceRange[0] &&
//     p.selling_price <= priceRange[1] &&
//     (selectedTags.length === 0 || selectedTags.some(tag => p.tags.includes(tag))) &&
//     (!selectedState || p.state === selectedState)
//   );

//   const uniqueTags = [...new Set(products.flatMap(p => p.tags || []))];

//   if (!mounted || isLoading) return <Loading />;
//   if (error) return <Error />;

//   return (
//     <ErrorBoundary>
//       <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
//         {/* Header */}
//         <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
//           <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
//             <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
//               <h1 className="text-3xl font-bold text-blue-500 dark:text-blue-400">OjaFlow</h1>
//               <button onClick={toggleTheme} className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700">
//                 {theme === 'dark' ? '☀️' : '🌙'}
//               </button>
//             </div>
//             <nav className="hidden md:flex space-x-8 text-lg">
//               <a href="#home" className="hover:text-blue-500 dark:hover:text-blue-400 transition">Home</a>
//               <a href="#categories" className="hover:text-blue-500 dark:hover:text-blue-400 transition">Categories</a>
//               <a href="#deals" className="hover:text-blue-500 dark:hover:text-blue-400 transition">Deals</a>
//               <a href="#states" className="hover:text-blue-500 dark:hover:text-blue-400 transition">By State</a>
//             </nav>
//             <form onSubmit={handleSearch} className="relative flex-1 max-w-xl mx-4">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search for products..."
//                 className="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200"
//               />
//               <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600">
//                 <Search size={18} />
//               </button>
//             </form>
//             <div className="flex items-center space-x-4">
//               <button onClick={toggleTheme} className="hidden md:block p-2 rounded-full bg-gray-200 dark:bg-gray-700">
//                 {theme === 'dark' ? '☀️' : '🌙'}
//               </button>
//               <ShoppingCart className="w-6 h-6 text-blue-500 dark:text-blue-400 cursor-pointer" />
//               <button onClick={toggleFilter} className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition">
//                 <Filter className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Filter Sidebar */}
//         {filterOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:bg-opacity-0 md:static md:w-64 md:min-h-screen">
//             <div className="bg-white dark:bg-gray-800 w-64 h-full p-6 shadow-lg md:shadow-none">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Filters</h3>
//                 <button onClick={toggleFilter} className="md:hidden text-gray-600 dark:text-gray-300">
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>
//               <div className="space-y-6">
//                 <div>
//                   <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Price Range (₦)</h4>
//                   <input
//                     type="range"
//                     min="0"
//                     max="100000"
//                     step="1000"
//                     value={priceRange[1]}
//                     onChange={(e) => setPriceRange([0, Number(e.target.value)])}
//                     className="w-full accent-blue-500"
//                   />
//                   <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
//                     <span>₦0</span>
//                     <span>₦{priceRange[1].toLocaleString()}</span>
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">State</h4>
//                   <select
//                     value={selectedState}
//                     onChange={handleStateChange}
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
//                   >
//                     <option value="">All States</option>
//                     {states.map(state => (
//                       <option key={state.name} value={state.name}>{state.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Tags</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {uniqueTags.length > 0 ? (
//                       uniqueTags.map(tag => (
//                         <button
//                           key={tag}
//                           onClick={() => handleTagToggle(tag)}
//                           className={`px-3 py-1 rounded-full text-sm ${
//                             selectedTags.includes(tag)
//                               ? 'bg-blue-500 text-white'
//                               : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
//                           } hover:bg-blue-500 hover:text-white transition`}
//                         >
//                           {tag}
//                         </button>
//                       ))
//                     ) : (
//                       <p className="text-sm text-gray-500 dark:text-gray-400">No tags available</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Banner Section */}
//         <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-12">
//           <div className="container mx-auto px-4 text-center">
//             <h2 className="text-4xl font-bold mb-4">Welcome to OjaFlow!</h2>
//             <p className="text-lg mb-6">Discover amazing deals and shop the latest products across Nigeria.</p>
//             <button className="bg-white text-blue-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
//               Shop Now
//             </button>
//           </div>
//         </section>

//         {/* All Products */}
//         <section className="py-12 bg-gray-50 dark:bg-gray-900">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">Featured Products</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//               {filteredProducts.map((product) => (
//                 <div
//                   key={product.slug}
//                   className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
//                 >
//                   {product.has_active_discount && (
//                     <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
//                       {product.discount_percentage}% OFF
//                     </span>
//                   )}
//                   <img
//                     src={product.product_main_image}
//                     alt={product.name}
//                     className="w-full h-40 sm:h-48 object-cover"
//                     onError={(e) => { e.target.src = "https://placehold.co/300x200?text=No+Image"; }}
//                   />
//                   <div className="p-3 sm:p-4">
//                     <h3 className="font-semibold text-sm sm:text-lg mb-1 text-gray-900 dark:text-gray-100">{product.name}</h3>
//                     <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-1 line-clamp-2">{product.short_description}</p>
//                     <div className="flex items-center mb-1">
//                       <p className="text-lg sm:text-xl font-bold text-blue-500 dark:text-blue-400">
//                         ₦{product.final_price || product.selling_price}
//                       </p>
//                       {product.has_active_discount && <p className="text-xs sm:text-sm text-gray-500 line-through ml-1">₦{product.compare_price}</p>}
//                     </div>
//                     <div className="flex items-center mb-1">
//                       <Star className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-500 fill-current" />
//                       <span className="ml-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{product.rating}</span>
//                     </div>
//                     <p className={`text-xs sm:text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'} mb-1`}>
//                       {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
//                     </p>
//                     <button
//                       onClick={() => handleProductClick(product)}
//                       className="w-full bg-blue-500 text-white py-1 sm:py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-xs sm:text-sm"
//                     >
//                       <Eye className="w-3 sm:w-4 h-3 sm:h-4 mr-1" /> View Details
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {filteredProducts.length === 0 && (
//               <p className="text-center text-gray-500 dark:text-gray-400 mt-4">No products found matching your criteria.</p>
//             )}
//           </div>
//         </section>

//         {/* Categories Carousel */}
//         <section id="categories" className="py-12 bg-white dark:bg-gray-800">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">Shop by Category</h2>
//             <Carousel
//               showThumbs={false}
//               infiniteLoop
//               autoPlay
//               interval={4000}
//               centerMode
//               centerSlidePercentage={100 / (categories.length > 6 ? 6 : categories.length)}
//               emulateTouch
//               showArrows={true}
//               renderArrowPrev={(clickHandler, hasPrev) => hasPrev && (
//                 <button onClick={clickHandler} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 z-10">
//                   <ChevronLeft size={20} />
//                 </button>
//               )}
//               renderArrowNext={(clickHandler, hasNext) => hasNext && (
//                 <button onClick={clickHandler} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 z-10">
//                   <ChevronRight size={20} />
//                 </button>
//               )}
//               renderIndicator={(onClickHandler, isSelected, index) => (
//                 <button
//                   onClick={onClickHandler}
//                   className={`w-2 h-2 rounded-full mx-1 ${isSelected ? 'bg-blue-500' : 'bg-gray-300'}`}
//                 />
//               )}
//             >
//               {categories.map((cat) => (
//                 <div key={cat.slug} className="px-1 sm:px-2">
//                   <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-lg p-3 sm:p-4 text-center cursor-pointer hover:shadow-xl transition-shadow duration-300 h-32 sm:h-40 flex flex-col items-center justify-center">
//                     <Package className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-2 text-blue-500 dark:text-blue-400" />
//                     <h3 className="text-sm sm:text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">{cat.name}</h3>
//                     <p className="text-xs sm:text-lg font-bold text-blue-500 dark:text-blue-400">{cat.productCount} Products</p>
//                   </div>
//                 </div>
//               ))}
//             </Carousel>
//           </div>
//         </section>

//         {/* Category Products */}
//         {selectedCategory && (
//           <section className="py-12 bg-gray-50 dark:bg-gray-900">
//             <div className="container mx-auto px-4">
//               <div className="flex justify-between items-center mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Products in {selectedCategory.name}</h2>
//                 <button onClick={() => setSelectedCategory(null)} className="text-blue-500 dark:text-blue-400 hover:underline">Back to Categories</button>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                 {categoryProducts.map((product) => (
//                   <div
//                     key={product.slug}
//                     className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
//                   >
//                     {product.has_active_discount && (
//                       <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
//                         {product.discount_percentage}% OFF
//                       </span>
//                     )}
//                     <img
//                       src={product.product_main_image}
//                       alt={product.name}
//                       className="w-full h-40 sm:h-48 object-cover"
//                       onError={(e) => { e.target.src = "https://placehold.co/300x200?text=No+Image"; }}
//                     />
//                     <div className="p-3 sm:p-4">
//                       <h3 className="font-semibold text-sm sm:text-lg mb-1 text-gray-900 dark:text-gray-100">{product.name}</h3>
//                       <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-1 line-clamp-2">{product.short_description}</p>
//                       <div className="flex items-center mb-1">
//                         <p className="text-lg sm:text-xl font-bold text-blue-500 dark:text-blue-400">
//                           ₦{product.final_price || product.selling_price}
//                         </p>
//                         {product.has_active_discount && <p className="text-xs sm:text-sm text-gray-500 line-through ml-1">₦{product.compare_price}</p>}
//                       </div>
//                       <div className="flex items-center mb-1">
//                         <Star className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-500 fill-current" />
//                         <span className="ml-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{product.rating}</span>
//                       </div>
//                       <p className={`text-xs sm:text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'} mb-1`}>
//                         {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
//                       </p>
//                       <button
//                         onClick={() => handleProductClick(product)}
//                         className="w-full bg-blue-500 text-white py-1 sm:py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-xs sm:text-sm"
//                       >
//                         <Eye className="w-3 sm:w-4 h-3 sm:h-4 mr-1" /> View Details
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         )}

//         {/* Sponsored Products */}
//         <section id="deals" className="py-12 bg-white dark:bg-gray-800">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">Sponsored Deals</h2>
//           <Carousel
//             showThumbs={false}
//             infiniteLoop
//             autoPlay
//             interval={3000}
//             centerMode
//             centerSlidePercentage={33.33}
//             emulateTouch
//             showArrows={true}
//             renderArrowPrev={(clickHandler, hasPrev) => hasPrev && (
//               <button onClick={clickHandler} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 z-10">
//                 <ChevronLeft size={20} />
//               </button>
//             )}
//             renderArrowNext={(clickHandler, hasNext) => hasNext && (
//               <button onClick={clickHandler} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 z-10">
//                 <ChevronRight size={20} />
//               </button>
//             )}
//             renderIndicator={(onClickHandler, isSelected, index) => (
//               <button
//                 onClick={onClickHandler}
//                 className={`w-2 h-2 rounded-full mx-1 ${isSelected ? 'bg-blue-500' : 'bg-gray-300'}`}
//               />
//             )}
//           >
//             {sponsoredProducts.map((product) => (
//               <div key={product.slug} className="px-1 sm:px-2">
//                 <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-lg p-3 sm:p-4 text-center hover:shadow-xl transition-shadow duration-300 h-48 sm:h-56 flex flex-col items-center justify-center">
//                   <p className="text-blue-800 dark:text-blue-200 mb-1 flex items-center justify-center"><Tag className="w-3 sm:w-4 h-3 sm:h-4 mr-1" /> Sponsored</p>
//                   <img
//                     src={product.product_main_image}
//                     alt={product.name}
//                     className="w-32 h-24 sm:w-40 sm:h-32 object-cover rounded-lg mb-2"
//                     onError={(e) => { e.target.src = "https://placehold.co/300x200?text=No+Image"; }}
//                   />
//                   <h3 className="font-semibold text-sm sm:text-lg mb-1 text-gray-900 dark:text-gray-100">{product.name}</h3>
//                   <p className="text-xl font-bold text-blue-500 dark:text-blue-400 mb-1">₦{product.selling_price}</p>
//                   <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-2">{product.short_description}</p>
//                   <button
//                     onClick={() => handleProductClick(product)}
//                     className="w-full bg-blue-500 text-white py-1 sm:py-2 rounded-lg hover:bg-blue-600 transition-colors text-xs sm:text-sm"
//                   >
//                     Shop Now
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </Carousel>
//           </div>
//         </section>

//         {/* States Carousel */}
//         <section id="states" className="py-12 bg-gray-50 dark:bg-gray-900">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">Shop by State</h2>
//             <Carousel
//               showThumbs={false}
//               infiniteLoop
//               autoPlay
//               interval={4000}
//               centerMode
//               centerSlidePercentage={33.33}
//               emulateTouch
//               showArrows={true}
//               renderArrowPrev={(clickHandler, hasPrev) => hasPrev && (
//                 <button onClick={clickHandler} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 z-10">
//                   <ChevronLeft size={20} />
//                 </button>
//               )}
//               renderArrowNext={(clickHandler, hasNext) => hasNext && (
//                 <button onClick={clickHandler} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 z-10">
//                   <ChevronRight size={20} />
//                 </button>
//               )}
//               renderIndicator={(onClickHandler, isSelected, index) => (
//                 <button
//                   onClick={onClickHandler}
//                   className={`w-2 h-2 rounded-full mx-1 ${isSelected ? 'bg-blue-500' : 'bg-gray-300'}`}
//                 />
//               )}
//             >
//               {states.map((state) => (
//                 <div key={state.name} className="px-1 sm:px-2">
//                   <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-lg p-3 sm:p-4 text-center cursor-pointer hover:shadow-xl transition-shadow duration-300 h-32 sm:h-40 flex flex-col items-center justify-center">
//                     <MapPin className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-2 text-blue-500 dark:text-blue-400" />
//                     <h3 className="text-sm sm:text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">{state.name}</h3>
//                     <p className="text-xs sm:text-lg font-bold text-blue-500 dark:text-blue-400">{state.count} Products</p>
//                   </div>
//                 </div>
//               ))}
//             </Carousel>
//           </div>
//         </section>

//         {/* State Products */}
//         {selectedState && (
//           <section className="py-12 bg-white dark:bg-gray-800">
//             <div className="container mx-auto px-4">
//               <div className="flex justify-between items-center mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Products from {selectedState}</h2>
//                 <button onClick={() => setSelectedState("")} className="text-blue-500 dark:text-blue-400 hover:underline">Back to States</button>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                 {stateProducts.map((product) => (
//                   <div
//                     key={product.slug}
//                     className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
//                   >
//                     {product.has_active_discount && (
//                       <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
//                         {product.discount_percentage}% OFF
//                       </span>
//                     )}
//                     <img
//                       src={product.product_main_image}
//                       alt={product.name}
//                       className="w-full h-40 sm:h-48 object-cover"
//                       onError={(e) => { e.target.src = "https://placehold.co/300x200?text=No+Image"; }}
//                     />
//                     <div className="p-3 sm:p-4">
//                       <h3 className="font-semibold text-sm sm:text-lg mb-1 text-gray-900 dark:text-gray-100">{product.name}</h3>
//                       <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-1 line-clamp-2">{product.short_description}</p>
//                       <div className="flex items-center mb-1">
//                         <p className="text-lg sm:text-xl font-bold text-blue-500 dark:text-blue-400">
//                           ₦{product.final_price || product.selling_price}
//                         </p>
//                         {product.has_active_discount && <p className="text-xs sm:text-sm text-gray-500 line-through ml-1">₦{product.compare_price}</p>}
//                       </div>
//                       <div className="flex items-center mb-1">
//                         <Star className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-500 fill-current" />
//                         <span className="ml-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{product.rating}</span>
//                       </div>
//                       <p className={`text-xs sm:text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'} mb-1`}>
//                         {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
//                       </p>
//                       <button
//                         onClick={() => handleProductClick(product)}
//                         className="w-full bg-blue-500 text-white py-1 sm:py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-xs sm:text-sm"
//                       >
//                         <Eye className="w-3 sm:w-4 h-3 sm:h-4 mr-1" /> View Details
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         )}

//         {selectedProduct && <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

//         <Footer />
//       </div>
//     </ErrorBoundary>
//   );
// };

// export default Home;