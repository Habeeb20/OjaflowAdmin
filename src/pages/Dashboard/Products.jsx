
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { Package, Search, Filter, ShoppingCart, Star, Plus, Minus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../utils/NotificationSystem";
import Loading from "../../utils/Loading";
import Error from "../../utils/ErrorProps";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductsPage = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [childrenCategories, setChildrenCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const productsPerPage = 12;

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const popularRes = await fetch(`${baseUrl}/api/product-categories/popular`);
      if (popularRes.ok) {
        const popularData = await popularRes.json();
        setPopularCategories(popularData.data || []);
      }

      const electronicsRes = await fetch(`${baseUrl}/api/product-categories/details/electronics-technology`);
      if (electronicsRes.ok) {
        const electronicsData = await electronicsRes.json();
        setCategories([electronicsData.data || {}]);
      }

      const searchRes = await fetch(`${baseUrl}/api/product-categories/search?term=laptop`);
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        setSearchResults(searchData.data || []);
      }

      const childrenRes = await fetch(`${baseUrl}/api/product-categories`);
      if (childrenRes.ok) {
        const childrenData = await childrenRes.json();
        console.log(childrenData, "your children data is here!!!")
        setChildrenCategories(childrenData.data || []);
      }

      const mockProducts = [
        {
          id: 1,
          name: "Wireless Headphones",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
          category: "Electronics",
          rating: 4.5,
          inStock: true,
        },
        {
          id: 2,
          name: "Smart Watch",
          price: 199.99,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
          category: "Wearables",
          rating: 4.8,
          inStock: true,
        },
        {
          id: 3,
          name: "Coffee Maker",
          price: 49.99,
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
          category: "Kitchen",
          rating: 4.2,
          inStock: false,
        },
        {
          id: 4,
          name: "Laptop Stand",
          price: 29.99,
          image: "https://images.unsplash.com/photo-1587829741301-dc798b83defb?w=400&h=300&fit=crop",
          category: "Accessories",
          rating: 4.0,
          inStock: true,
        },
        {
          id: 5,
          name: "Bluetooth Speaker",
          price: 59.99,
          image: "https://images.unsplash.com/photo-1593797350502-8e4e4eb1bf8c?w=400&h=300&fit=crop",
          category: "Audio",
          rating: 4.7,
          inStock: true,
        },
        {
          id: 6,
          name: "Office Chair",
          price: 299.99,
          image: "https://images.unsplash.com/photo-1520975955270-7d7f4e5f8b91?w=400&h=300&fit=crop",
          category: "Furniture",
          rating: 4.3,
          inStock: true,
        },
        {
          id: 7,
          name: "Gaming Mouse",
          price: 39.99,
          image: "https://images.unsplash.com/photo-1511707171634-e28efd0e6c9e?w=400&h=300&fit=crop",
          category: "Gaming",
          rating: 4.6,
          inStock: true,
        },
        {
          id: 8,
          name: "USB-C Cable",
          price: 9.99,
          image: "https://images.unsplash.com/photo-1558618047-3c8c76a1e2e6?w=400&h=300&fit=crop",
          category: "Accessories",
          rating: 4.1,
          inStock: true,
        },
        {
          id: 9,
          name: "Wireless Keyboard",
          price: 79.99,
          image: "https://images.unsplash.com/photo-1590816344408-5e8d0a87d0d9?w=400&h=300&fit=crop",
          category: "Electronics",
          rating: 4.4,
          inStock: false,
        },
        {
          id: 10,
          name: "Desk Lamp",
          price: 24.99,
          image: "https://images.unsplash.com/photo-1558618047-3c8c76a1e2e6?w=400&h=300&fit=crop",
          category: "Office",
          rating: 4.2,
          inStock: true,
        },
        {
          id: 11,
          name: "Power Bank",
          price: 34.99,
          image: "https://images.unsplash.com/photo-1608248523530-3e6d3a3e6e6a?w=400&h=300&fit=crop",
          category: "Accessories",
          rating: 4.5,
          inStock: true,
        },
        {
          id: 12,
          name: "Notebook",
          price: 14.99,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
          category: "Stationery",
          rating: 4.0,
          inStock: true,
        },
      ];

      const allProducts = [...searchResults, ...childrenCategories, ...mockProducts];
      setProducts(allProducts);
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
      addNotification("Error loading products", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addNotification(`${product.name} added to cart!`, "success");
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filtered = category === "all" ? products : products.filter(p => p.category === category);
    setProducts(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setProducts(filtered.length > 0 ? filtered : products);
      addNotification(`Searching for "${searchTerm}"`, "info");
    }
  };

  const handleRetry = () => {
    setError(null);
    fetchData();
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} onRetry={handleRetry} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-info-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-background-dark text-foreground dark:text-foreground-dark">
      {/* Sticky Header with Search */}
      <header className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-lg sticky top-0 z-50 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold text-primary-500 drop-shadow-md">
            Ojaflow Products
          </h1>
          <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for products..."
              className="inventory-input pl-10 pr-4 py-2 w-full rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-300"
            />
          </form>
          <button
            onClick={() => navigate("/admin/inventory/add")}
            className="inventory-button-primary flex items-center space-x-2 px-4 py-2"
          >
            <Plus size={20} />
            <span>Add Product</span>
          </button>
        </div>
      </header>

      {/* Featured Video Slides */}
      <div className="container mx-auto py-8">
        <div className="inventory-card p-6 rounded-xl shadow-2xl">
          <h2 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark mb-4">
            Featured Products
          </h2>
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={5000}
            className="rounded-xl overflow-hidden"
          >
            <div>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
                title="Featured Product 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl"
              />
            </div>
            <div>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/zpOULjyy-n8?autoplay=0"
                title="Featured Product 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl"
              />
            </div>
            <div>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/9bZkp7q19f0?autoplay=0"
                title="Featured Product 3"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl"
              />
            </div>
          </Carousel>
        </div>
      </div>

      {/* Categories and Products */}
      <div className="container mx-auto px-4 py-8">
          <div className="lg:w-1/4 space-y-6">
            <div className="inventory-card p-6 rounded-xl shadow-2xl">
              <h3 className="text-xl font-semibold text-foreground dark:text-foreground-dark mb-4 flex items-center">
                <Filter className="mr-2 text-primary-500" />
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                    selectedCategory === "all" ? "bg-primary-500 text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  All Products
                </button>
                {popularCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.name)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      selectedCategory === cat.name ? "bg-secondary-500 text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.name)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      selectedCategory === cat.name ? "bg-success-500 text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Categories */}
          {/* <div className="lg:w-1/4 space-y-6">
            <div className="inventory-card p-6 rounded-xl shadow-2xl">
              <h3 className="text-xl font-semibold text-foreground dark:text-foreground-dark mb-4 flex items-center">
                <Filter className="mr-2 text-primary-500" />
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                    selectedCategory === "all" ? "bg-primary-500 text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  All Products
                </button>
                {popularCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.name)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      selectedCategory === cat.name ? "bg-secondary-500 text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.name)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      selectedCategory === cat.name ? "bg-success-500 text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div> */}

          {/* Main Products Grid */}
          <div className="lg:w-4/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((product) => (
                <div
                  key={product.id}
                  className="inventory-card bg-white/90 dark:bg-neutral-900/80 backdrop-blur-md rounded-xl shadow-2xl hover:shadow-glow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => openProductDetails(product)}
                >
                  <img
                    src={product.image || "https://via.placeholder.com/400x300?text=No+Image"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground-dark mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-foreground-secondary dark:text-foreground-secondary-dark mb-2 line-clamp-1">
                      {product.category}
                    </p>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(product.rating) ? "text-warning-500 fill-current" : "text-warning-200"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-warning-500 ml-2">{product.rating}</span>
                    </div>
                    <p className="text-2xl font-bold text-primary-500 mb-4">${product.price.toFixed(2)}</p>
                    <span className={`text-sm font-medium ${
                      product.inStock ? "text-success-500" : "text-error-500"
                    }`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-8 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-primary-900"
              >
                Previous
              </button>
              {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    currentPage === i + 1
                      ? "bg-primary-500 text-white"
                      : "hover:bg-primary-100 dark:hover:bg-primary-900 text-foreground"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(products.length / productsPerPage)))}
                disabled={currentPage === Math.ceil(products.length / productsPerPage)}
                className="px-3 py-2 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-primary-900"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="inventory-card bg-white/90 dark:bg-neutral-900/80 backdrop-blur-md rounded-xl shadow-2xl p-6 w-full max-w-md">
            <button
              onClick={closeProductDetails}
              className="absolute top-4 right-4 text-foreground dark:text-foreground-dark hover:text-primary-500 transition-colors duration-200"
            >
              <X size={24} />
            </button>
            <img
              src={selectedProduct.image || "https://via.placeholder.com/400x300?text=No+Image"}
              alt={selectedProduct.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
              }}
            />
            <h3 className="text-xl font-semibold text-foreground dark:text-foreground-dark mb-2">
              {selectedProduct.name}
            </h3>
            <p className="text-sm text-foreground-secondary dark:text-foreground-secondary-dark mb-2">
              {selectedProduct.category}
            </p>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < Math.floor(selectedProduct.rating) ? "text-warning-500 fill-current" : "text-warning-200"
                  }`}
                />
              ))}
              <span className="text-sm text-warning-500 ml-2">{selectedProduct.rating}</span>
            </div>
            <p className="text-2xl font-bold text-primary-500 mb-4">${selectedProduct.price.toFixed(2)}</p>
            <p className={`text-sm font-medium ${
              selectedProduct.inStock ? "text-success-500" : "text-error-500"
            } mb-4`}>
              {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
            </p>
            <div className="flex items-center mb-4">
              <button
                onClick={decreaseQuantity}
                className="inventory-button-secondary p-2 rounded-l-lg"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-foreground dark:text-foreground-dark">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="inventory-button-secondary p-2 rounded-r-lg"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={() => {
                handleAddToCart({ ...selectedProduct, quantity });
                closeProductDetails();
              }}
              className="inventory-button-primary w-full flex items-center justify-center space-x-2 px-4 py-2"
            >
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Custom Button Styles
const inventoryButtonPrimary = "bg-primary-500 text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 transition-colors duration-200";
const inventoryButtonSecondary = "bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-2 focus:ring-secondary-500 transition-colors duration-200";

export default ProductsPage;