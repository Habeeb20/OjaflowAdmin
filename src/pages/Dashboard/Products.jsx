
/* eslint-disable no-unused-vars */

// import React, { useState, useEffect } from "react";
// import { Package, Search, Filter, ShoppingCart, Star, Plus, Minus, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useNotification } from "../../utils/NotificationSystem";
// import Loading from "../../utils/Loading";
// import Error from "../../utils/ErrorProps";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// const ProductsPage = () => {
//   const navigate = useNavigate();
//   const { addNotification } = useNotification();
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [popularCategories, setPopularCategories] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);
//   const [childrenCategories, setChildrenCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const productsPerPage = 12;

//   const baseUrl = import.meta.env.VITE_BACKEND_URL;

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const popularRes = await fetch(`${baseUrl}/api/product-categories/popular`);
//       if (popularRes.ok) {
//         const popularData = await popularRes.json();
//         setPopularCategories(popularData.data || []);
//       }

//       const electronicsRes = await fetch(`${baseUrl}/api/product-categories/details/electronics-technology`);
//       if (electronicsRes.ok) {
//         const electronicsData = await electronicsRes.json();
//         setCategories([electronicsData.data || {}]);
//       }

//       const searchRes = await fetch(`${baseUrl}/api/product-categories/search?term=laptop`);
//       if (searchRes.ok) {
//         const searchData = await searchRes.json();
//         setSearchResults(searchData.data || []);
//       }

//       const childrenRes = await fetch(`${baseUrl}/api/product-categories`);
//       if (childrenRes.ok) {
//         const childrenData = await childrenRes.json();
//         console.log(childrenData, "your children data is here!!!")
//         setChildrenCategories(childrenData.data || []);
//       }

//       const mockProducts = [
//         {
//           id: 1,
//           name: "Wireless Headphones",
//           price: 89.99,
//           image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
//           category: "Electronics",
//           rating: 4.5,
//           inStock: true,
//         },
//         {
//           id: 2,
//           name: "Smart Watch",
//           price: 199.99,
//           image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
//           category: "Wearables",
//           rating: 4.8,
//           inStock: true,
//         },
//         {
//           id: 3,
//           name: "Coffee Maker",
//           price: 49.99,
//           image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
//           category: "Kitchen",
//           rating: 4.2,
//           inStock: false,
//         },
//         {
//           id: 4,
//           name: "Laptop Stand",
//           price: 29.99,
//           image: "https://images.unsplash.com/photo-1587829741301-dc798b83defb?w=400&h=300&fit=crop",
//           category: "Accessories",
//           rating: 4.0,
//           inStock: true,
//         },
//         {
//           id: 5,
//           name: "Bluetooth Speaker",
//           price: 59.99,
//           image: "https://images.unsplash.com/photo-1593797350502-8e4e4eb1bf8c?w=400&h=300&fit=crop",
//           category: "Audio",
//           rating: 4.7,
//           inStock: true,
//         },
//         {
//           id: 6,
//           name: "Office Chair",
//           price: 299.99,
//           image: "https://images.unsplash.com/photo-1520975955270-7d7f4e5f8b91?w=400&h=300&fit=crop",
//           category: "Furniture",
//           rating: 4.3,
//           inStock: true,
//         },
//         {
//           id: 7,
//           name: "Gaming Mouse",
//           price: 39.99,
//           image: "https://images.unsplash.com/photo-1511707171634-e28efd0e6c9e?w=400&h=300&fit=crop",
//           category: "Gaming",
//           rating: 4.6,
//           inStock: true,
//         },
//         {
//           id: 8,
//           name: "USB-C Cable",
//           price: 9.99,
//           image: "https://images.unsplash.com/photo-1558618047-3c8c76a1e2e6?w=400&h=300&fit=crop",
//           category: "Accessories",
//           rating: 4.1,
//           inStock: true,
//         },
//         {
//           id: 9,
//           name: "Wireless Keyboard",
//           price: 79.99,
//           image: "https://images.unsplash.com/photo-1590816344408-5e8d0a87d0d9?w=400&h=300&fit=crop",
//           category: "Electronics",
//           rating: 4.4,
//           inStock: false,
//         },
//         {
//           id: 10,
//           name: "Desk Lamp",
//           price: 24.99,
//           image: "https://images.unsplash.com/photo-1558618047-3c8c76a1e2e6?w=400&h=300&fit=crop",
//           category: "Office",
//           rating: 4.2,
//           inStock: true,
//         },
//         {
//           id: 11,
//           name: "Power Bank",
//           price: 34.99,
//           image: "https://images.unsplash.com/photo-1608248523530-3e6d3a3e6e6a?w=400&h=300&fit=crop",
//           category: "Accessories",
//           rating: 4.5,
//           inStock: true,
//         },
//         {
//           id: 12,
//           name: "Notebook",
//           price: 14.99,
//           image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
//           category: "Stationery",
//           rating: 4.0,
//           inStock: true,
//         },
//       ];

//       const allProducts = [...searchResults, ...childrenCategories, ...mockProducts];
//       setProducts(allProducts);
//     } catch (err) {
//       setError("Failed to fetch products. Please try again.");
//       addNotification("Error loading products", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAddToCart = (product) => {
//     addNotification(`${product.name} added to cart!`, "success");
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     const filtered = category === "all" ? products : products.filter(p => p.category === category);
//     setProducts(filtered);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
//       setProducts(filtered.length > 0 ? filtered : products);
//       addNotification(`Searching for "${searchTerm}"`, "info");
//     }
//   };

//   const handleRetry = () => {
//     setError(null);
//     fetchData();
//   };

//   const openProductDetails = (product) => {
//     setSelectedProduct(product);
//     setQuantity(1);
//   };

//   const closeProductDetails = () => {
//     setSelectedProduct(null);
//   };

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

//   if (isLoading) return <Loading />;
//   if (error) return <Error message={error} onRetry={handleRetry} />;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-info-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-background-dark text-foreground dark:text-foreground-dark">
//       {/* Sticky Header with Search */}
//       <header className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-lg sticky top-0 z-50 p-4">
//         <div className="container mx-auto flex items-center justify-between">
//           <h1 className="text-2xl font-display font-bold text-primary-500 drop-shadow-md">
//             Ojaflow Products
//           </h1>
//           <form onSubmit={handleSearch} className="relative w-full max-w-md">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-neutral-400" />
//             </div>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search for products..."
//               className="inventory-input pl-10 pr-4 py-2 w-full rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-300"
//             />
//           </form>
//           <button
//             onClick={() => navigate("/admin/inventory/add")}
//             className="inventory-button-primary flex items-center space-x-2 px-4 py-2"
//           >
//             <Plus size={20} />
//             <span>Add Product</span>
//           </button>
//         </div>
//       </header>

//       {/* Featured Video Slides */}
//       <div className="container mx-auto py-8">
//         <div className="inventory-card p-6 rounded-xl shadow-2xl">
//           <h2 className="text-2xl font-display font-bold text-foreground dark:text-foreground-dark mb-4">
//             Featured Products
//           </h2>
//           <Carousel
//             showThumbs={false}
//             showStatus={false}
//             infiniteLoop
//             autoPlay
//             interval={5000}
//             className="rounded-xl overflow-hidden"
//           >
//             <div>
//               <iframe
//                 width="100%"
//                 height="315"
//                 src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
//                 title="Featured Product 1"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="rounded-xl"
//               />
//             </div>
//             <div>
//               <iframe
//                 width="100%"
//                 height="315"
//                 src="https://www.youtube.com/embed/zpOULjyy-n8?autoplay=0"
//                 title="Featured Product 2"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="rounded-xl"
//               />
//             </div>
//             <div>
//               <iframe
//                 width="100%"
//                 height="315"
//                 src="https://www.youtube.com/embed/9bZkp7q19f0?autoplay=0"
//                 title="Featured Product 3"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="rounded-xl"
//               />
//             </div>
//           </Carousel>
//         </div>
//       </div>

//       {/* Categories and Products */}
//       <div className="container mx-auto px-4 py-8">
//           <div className="lg:w-1/4 space-y-6">
//             <div className="inventory-card p-6 rounded-xl shadow-2xl">
//               <h3 className="text-xl font-semibold text-foreground dark:text-foreground-dark mb-4 flex items-center">
//                 <Filter className="mr-2 text-primary-500" />
//                 Categories
//               </h3>
//               <div className="space-y-2">
//                 <button
//                   onClick={() => handleCategoryChange("all")}
//                   className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
//                     selectedCategory === "all" ? "bg-primary-500 text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
//                   }`}
//                 >
//                   All Products
//                 </button>
//                 {popularCategories.map((cat) => (
//                   <button
//                     key={cat.id}
//                     onClick={() => handleCategoryChange(cat.name)}
//                     className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
//                       selectedCategory === cat.name ? "bg-secondary-500 text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
//                     }`}
//                   >
//                     {cat.name}
//                   </button>
//                 ))}
//                 {categories.map((cat) => (
//                   <button
//                     key={cat.id}
//                     onClick={() => handleCategoryChange(cat.name)}
//                     className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
//                       selectedCategory === cat.name ? "bg-success-500 text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
//                     }`}
//                   >
//                     {cat.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Left Sidebar - Categories */}
//           {/* <div className="lg:w-1/4 space-y-6">
//             <div className="inventory-card p-6 rounded-xl shadow-2xl">
//               <h3 className="text-xl font-semibold text-foreground dark:text-foreground-dark mb-4 flex items-center">
//                 <Filter className="mr-2 text-primary-500" />
//                 Categories
//               </h3>
//               <div className="space-y-2">
//                 <button
//                   onClick={() => handleCategoryChange("all")}
//                   className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
//                     selectedCategory === "all" ? "bg-primary-500 text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
//                   }`}
//                 >
//                   All Products
//                 </button>
//                 {popularCategories.map((cat) => (
//                   <button
//                     key={cat.id}
//                     onClick={() => handleCategoryChange(cat.name)}
//                     className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
//                       selectedCategory === cat.name ? "bg-secondary-500 text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
//                     }`}
//                   >
//                     {cat.name}
//                   </button>
//                 ))}
//                 {categories.map((cat) => (
//                   <button
//                     key={cat.id}
//                     onClick={() => handleCategoryChange(cat.name)}
//                     className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
//                       selectedCategory === cat.name ? "bg-success-500 text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
//                     }`}
//                   >
//                     {cat.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div> */}

//           {/* Main Products Grid */}
//           <div className="lg:w-4/4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((product) => (
//                 <div
//                   key={product.id}
//                   className="inventory-card bg-white/90 dark:bg-neutral-900/80 backdrop-blur-md rounded-xl shadow-2xl hover:shadow-glow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer"
//                   onClick={() => openProductDetails(product)}
//                 >
//                   <img
//                     src={product.image || "https://via.placeholder.com/400x300?text=No+Image"}
//                     alt={product.name}
//                     className="w-full h-48 object-cover rounded-t-xl"
//                     onError={(e) => {
//                       e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
//                     }}
//                   />
//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold text-foreground dark:text-foreground-dark mb-2 line-clamp-1">
//                       {product.name}
//                     </h3>
//                     <p className="text-sm text-foreground-secondary dark:text-foreground-secondary-dark mb-2 line-clamp-1">
//                       {product.category}
//                     </p>
//                     <div className="flex items-center mb-2">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           size={16}
//                           className={`${
//                             i < Math.floor(product.rating) ? "text-warning-500 fill-current" : "text-warning-200"
//                           }`}
//                         />
//                       ))}
//                       <span className="text-sm text-warning-500 ml-2">{product.rating}</span>
//                     </div>
//                     <p className="text-2xl font-bold text-primary-500 mb-4">${product.price.toFixed(2)}</p>
//                     <span className={`text-sm font-medium ${
//                       product.inStock ? "text-success-500" : "text-error-500"
//                     }`}>
//                       {product.inStock ? "In Stock" : "Out of Stock"}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             <div className="flex items-center justify-center mt-8 space-x-2">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-2 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-primary-900"
//               >
//                 Previous
//               </button>
//               {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
//                     currentPage === i + 1
//                       ? "bg-primary-500 text-white"
//                       : "hover:bg-primary-100 dark:hover:bg-primary-900 text-foreground"
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(products.length / productsPerPage)))}
//                 disabled={currentPage === Math.ceil(products.length / productsPerPage)}
//                 className="px-3 py-2 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-primary-900"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Product Details Modal */}
//       {selectedProduct && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="inventory-card bg-white/90 dark:bg-neutral-900/80 backdrop-blur-md rounded-xl shadow-2xl p-6 w-full max-w-md">
//             <button
//               onClick={closeProductDetails}
//               className="absolute top-4 right-4 text-foreground dark:text-foreground-dark hover:text-primary-500 transition-colors duration-200"
//             >
//               <X size={24} />
//             </button>
//             <img
//               src={selectedProduct.image || "https://via.placeholder.com/400x300?text=No+Image"}
//               alt={selectedProduct.name}
//               className="w-full h-48 object-cover rounded-xl mb-4"
//               onError={(e) => {
//                 e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
//               }}
//             />
//             <h3 className="text-xl font-semibold text-foreground dark:text-foreground-dark mb-2">
//               {selectedProduct.name}
//             </h3>
//             <p className="text-sm text-foreground-secondary dark:text-foreground-secondary-dark mb-2">
//               {selectedProduct.category}
//             </p>
//             <div className="flex items-center mb-2">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   size={16}
//                   className={`${
//                     i < Math.floor(selectedProduct.rating) ? "text-warning-500 fill-current" : "text-warning-200"
//                   }`}
//                 />
//               ))}
//               <span className="text-sm text-warning-500 ml-2">{selectedProduct.rating}</span>
//             </div>
//             <p className="text-2xl font-bold text-primary-500 mb-4">${selectedProduct.price.toFixed(2)}</p>
//             <p className={`text-sm font-medium ${
//               selectedProduct.inStock ? "text-success-500" : "text-error-500"
//             } mb-4`}>
//               {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
//             </p>
//             <div className="flex items-center mb-4">
//               <button
//                 onClick={decreaseQuantity}
//                 className="inventory-button-secondary p-2 rounded-l-lg"
//               >
//                 <Minus size={16} />
//               </button>
//               <span className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-foreground dark:text-foreground-dark">
//                 {quantity}
//               </span>
//               <button
//                 onClick={increaseQuantity}
//                 className="inventory-button-secondary p-2 rounded-r-lg"
//               >
//                 <Plus size={16} />
//               </button>
//             </div>
//             <button
//               onClick={() => {
//                 handleAddToCart({ ...selectedProduct, quantity });
//                 closeProductDetails();
//               }}
//               className="inventory-button-primary w-full flex items-center justify-center space-x-2 px-4 py-2"
//             >
//               <ShoppingCart size={16} />
//               <span>Add to Cart</span>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Custom Button Styles
// const inventoryButtonPrimary = "bg-primary-500 text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 transition-colors duration-200";
// const inventoryButtonSecondary = "bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-2 focus:ring-secondary-500 transition-colors duration-200";

// export default ProductsPage;






import React, { useState, useEffect } from "react";
import { Package, Search, Filter, ShoppingCart, Star, Plus, Minus, X, MapPin, Tag, Building, Box, Info, ChevronLeft, ChevronRight } from "lucide-react";
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

  // New states for additional data
  const [brands, setBrands] = useState([]);
  const [tags, setTags] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [transfers, setTransfers] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const baseUrl = "https://api-ojaflow.taskflow.com.ng/api";

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Fetch all initial data from real endpoints
  const fetchInitialData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch salable products (main list)
      const productsRes = await fetch(`${baseUrl}/salable/products`);
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData.data || []); // Assume {data: [...]}
      }

      // Brands
      const brandsRes = await fetch(`${baseUrl}/brands`);
      if (brandsRes.ok) {
        const brandsData = await brandsRes.json();
        setBrands(brandsData.data || []);
      }

      // Tags
      const tagsRes = await fetch(`${baseUrl}/tags`);
      if (tagsRes.ok) {
        const tagsData = await tagsRes.json();
        setTags(tagsData.data || []);
      }

      // Warehouses
      const warehousesRes = await fetch(`${baseUrl}/warehouses/list`);
      if (warehousesRes.ok) {
        const warehousesData = await warehousesRes.json();
        setWarehouses(warehousesData.data || []);
      }

      // Warehouse transfers
      const transfersRes = await fetch(`${baseUrl}/warehouse-transfers`);
      if (transfersRes.ok) {
        const transfersData = await transfersRes.json();
        setTransfers(transfersData.data || []);
      }

      // For categories: assuming /product-categories/all or similar; adjust if needed. Using children as all categories
      const childrenRes = await fetch(`${baseUrl}/product-categories`); // Assuming this exists or map to /salable/products categories
      if (childrenRes.ok) {
        const childrenData = await childrenRes.json();
        console.log(childrenData)
        setChildrenCategories(childrenData.data.data || []);
        setCategories(childrenData.data.data || []); // Merge or use as categories
        setPopularCategories(childrenData.data.data?.slice(0, 5) || []); // Mock popular as first 5
      }

      addNotification("Data loaded successfully", "success");
    } catch (err) {
      console.log(err)
      setError("Failed to fetch data. Please try again.");
      addNotification("Error loading data", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch product details by slug
  const fetchProductDetails = async (slug) => {
    try {
      const res = await fetch(`${baseUrl}/product/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedProduct(data); // Assume direct product object or data.product
      }
    } catch (err) {
      addNotification("Failed to load product details", "error");
    }
  };

  // Fetch variants for a product
  const fetchVariants = async (productSlug) => {
    try {
      const res = await fetch(`${baseUrl}/product/${productSlug}/variants`);
      if (res.ok) {
        const data = await res.json();
        setVariants(data.data || []);
      }
    } catch (err) {
      addNotification("Failed to load variants", "error");
    }
  };

  // Fetch brand details and products
  const fetchBrandDetails = async (slug) => {
    try {
      const res = await fetch(`${baseUrl}/brand/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedBrand(data);
      }
      const productsRes = await fetch(`${baseUrl}/brands/${slug}/products`);
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData.data || []);
      }
    } catch (err) {
      addNotification("Failed to load brand", "error");
    }
  };

  // Fetch warehouse details and products
  const fetchWarehouseDetails = async (slug) => {
    try {
      const res = await fetch(`${baseUrl}/warehouse/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedWarehouse(data);
      }
      const productsRes = await fetch(`${baseUrl}/warehouse/${slug}/products`);
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData.data || []);
      }
      const reportRes = await fetch(`${baseUrl}/warehouses/inventory-report/${slug}`);
      if (reportRes.ok) {
        const reportData = await reportRes.json();
        addNotification(`Inventory report: ${JSON.stringify(reportData)}`, "info");
      }
    } catch (err) {
      addNotification("Failed to load warehouse", "error");
    }
  };

  // Filter by tag (assume filter products client-side or add search)
  const handleTagFilter = (tag) => {
    setSelectedTag(tag);
    const filtered = products.filter(p => p.tags.some(t => t.name === tag.name));
    setProducts(filtered);
  };

  const handleAddToCart = (product) => {
    addNotification(`${product.name} added to cart!`, "success");
  };

  const handleCategoryChange = (categorySlug) => {
    setSelectedCategory(categorySlug);
    // Filter products by category slug
    const filtered = categorySlug === "all" ? products : products.filter(p => p.category.slug === categorySlug);
    setProducts(filtered);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Use backend search if available, else client-side
      try {
        const res = await fetch(`${baseUrl}/salable/products?search=${searchTerm}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.data || []);
        }
      } catch (err) {
        const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setProducts(filtered);
      }
      addNotification(`Searching for "${searchTerm}"`, "info");
    }
  };

  const handleRetry = () => {
    setError(null);
    fetchInitialData();
  };

  const openProductDetails = (product) => {
    fetchProductDetails(product.slug);
    fetchVariants(product.slug);
    setQuantity(1);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
    setVariants([]);
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const paginatedProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

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

      {/* Additional Sections: Brands, Warehouses, Tags */}
      <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Brands List */}
        <div className="inventory-card p-6 rounded-xl shadow-2xl">
          <h2 className="text-xl font-bold mb-4 flex items-center"><Building className="mr-2" /> Brands</h2>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {brands.map((brand) => (
              <button
                key={brand.slug}
                onClick={() => fetchBrandDetails(brand.slug)}
                className="w-full text-left p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>

        {/* Warehouses List */}
        <div className="inventory-card p-6 rounded-xl shadow-2xl">
          <h2 className="text-xl font-bold mb-4 flex items-center"><Box className="mr-2" /> Warehouses</h2>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {warehouses.map((wh) => (
              <button
                key={wh.slug}
                onClick={() => fetchWarehouseDetails(wh.slug)}
                className="w-full text-left p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                {wh.name} ({wh.city})
              </button>
            ))}
          </div>
        </div>

        {/* Tags List */}
        <div className="inventory-card p-6 rounded-xl shadow-2xl">
          <h2 className="text-xl font-bold mb-4 flex items-center"><Tag className="mr-2" /> Tags</h2>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagFilter(tag)}
                className="w-full text-left p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Warehouse Transfers Summary */}
      {transfers.length > 0 && (
        <div className="container mx-auto py-8">
          <div className="inventory-card p-6 rounded-xl shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Recent Warehouse Transfers</h2>
            <ul className="space-y-2">
              {transfers.slice(0, 5).map((transfer) => (
                <li key={transfer.id} className="flex justify-between p-2 border-b">
                  <span>From {transfer.from_warehouse?.name} to {transfer.to_warehouse?.name}</span>
                  <span>{transfer.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

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
            {products.slice(0, 3).map((prod) => (
              <div key={prod.slug}>
                <img src={prod.product_main_image || "https://via.placeholder.com/800x400"} alt={prod.name} className="w-full h-80 object-cover" />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Categories and Products */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Categories */}
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
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      selectedCategory === cat.slug ? "bg-secondary-500 text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Products Grid */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <div
                  key={product.slug}
                  className="inventory-card bg-white/90 dark:bg-neutral-900/80 backdrop-blur-md rounded-xl shadow-2xl hover:shadow-glow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => openProductDetails(product)}
                >
                  <img
                    src={product.product_main_image || "https://via.placeholder.com/400x300?text=No+Image"}
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
                      {product.category.name}
                    </p>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(product.rating || 0) ? "text-warning-500 fill-current" : "text-warning-200"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-warning-500 ml-2">{product.rating || 0}</span>
                    </div>
                    <p className="text-2xl font-bold text-primary-500 mb-4">${product.selling_price}</p>
                    <span className={`text-sm font-medium ${
                      product.stock > 0 ? "text-success-500" : "text-error-500"
                    }`}>
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                    </span>
                    {product.has_active_discount && <span className="text-sm text-error-500 ml-2">-{product.discount_percentage}%</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-8 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-primary-900 flex items-center"
              >
                <ChevronLeft size={16} /> Previous
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
                className="px-3 py-2 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-primary-900 flex items-center"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Modal - Enhanced with all fields */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="inventory-card bg-white/90 dark:bg-neutral-900/80 backdrop-blur-md rounded-xl shadow-2xl p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
            <button
              onClick={closeProductDetails}
              className="absolute top-4 right-4 text-foreground dark:text-foreground-dark hover:text-primary-500 transition-colors duration-200"
            >
              <X size={24} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedProduct.product_main_image || "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-xl mb-4"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                  }}
                />
                {selectedProduct.additional_product_images && (
                  <div className="text-sm text-gray-600">Additional images available</div>
                )}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">{selectedProduct.name}</h3>
                <p className="text-sm flex items-center"><MapPin size={16} className="mr-1" /> {selectedProduct.city}, {selectedProduct.state}, {selectedProduct.country}</p>
                <p className="text-lg font-bold text-primary-500">${selectedProduct.selling_price} {selectedProduct.compare_price && <span className="text-sm line-through text-gray-500">${selectedProduct.compare_price}</span>}</p>
                {selectedProduct.has_active_discount && <p className="text-error-500">Discount: {selectedProduct.discount_percentage}% (until {selectedProduct.discount_ends_at})</p>}
                <p className="text-sm"><Info size={16} className="inline mr-1" /> {selectedProduct.short_description}</p>
                <p>{selectedProduct.long_description}</p>
                <div className="flex items-center">
                  <Star size={16} className="text-warning-500 fill-current" /> <span className="ml-1">{selectedProduct.rating} ({selectedProduct.reviews_count} reviews)</span>
                </div>
                <p className={`${selectedProduct.stock > 0 ? "text-success-500" : "text-error-500"}`}>Stock: {selectedProduct.stock} {selectedProduct.is_low_stock && "(Low Stock)"}</p>
                <p>Brand: {selectedProduct.brand.name}</p>
                <p>Warehouse: {selectedProduct.warehouse.name}</p>
                <p>Type: {selectedProduct.product_type} {selectedProduct.is_shipping_required && "| Shipping Required"} {selectedProduct.is_returnable && `| Returnable in ${selectedProduct.return_days} days`}</p>
                <div className="flex space-x-2">
                  {selectedProduct.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-neutral-200 dark:bg-neutral-700 rounded text-sm">{tag}</span>
                  ))}
                </div>
                {selectedProduct.is_featured && <span className="px-2 py-1 bg-blue-500 text-white rounded text-sm">Featured</span>}
                {selectedProduct.is_sponsored && <span className="px-2 py-1 bg-purple-500 text-white rounded text-sm ml-2">Sponsored</span>}
              </div>
            </div>

            {/* Variants Section */}
            {variants.length > 0 && (
              <div className="mt-6 border-t pt-4">
                <h4 className="text-xl font-bold mb-2">Variants</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {variants.map((variant) => (
                    <div key={variant.slug} className="border p-4 rounded-lg cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800" onClick={() => fetch(`${baseUrl}/product/${selectedProduct.slug}/variant/${variant.slug}`).then(res => res.json()).then(data => setSelectedVariant(data))}>
                      <p>{variant.name || variant.slug}</p>
                      <p>${variant.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Variant Details */}
            {selectedVariant && (
              <div className="mt-4 border-t pt-4">
                <h4 className="font-bold">Selected Variant: {selectedVariant.name}</h4>
                <p>{JSON.stringify(selectedVariant)}</p> {/* Display full variant data */}
              </div>
            )}

            <div className="flex items-center mb-4 mt-6">
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

export default ProductsPage;