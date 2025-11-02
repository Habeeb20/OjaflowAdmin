
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Package, Search, ChevronLeft, ChevronRight, AlertCircle, ShoppingCart } from 'lucide-react';
// import { useNotification } from '../../utils/NotificationSystem.jsx';
// import Navbar from '../../components/Navbar.jsx';
// import Loading from '../../utils/Loading.jsx';

// const ProductsList = () => {
//   const navigate = useNavigate();
//   const { addNotification } = useNotification();
//   const [products, setProducts] = useState([]);
//   const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1, total: 0 });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showBrandProducts, setShowBrandProducts] = useState(false); // New state for brand products toggle

//   const baseUrl = import.meta.env.VITE_BACKEND_URL;
//   const BRAND_SLUG = 'another-test-brand-edited-version'; // Hardcoded brand slug from the endpoint

//   const fetchProducts = async (page = 1, search = '', isBrand = false) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       addNotification('No authentication token found. Please log in.', 'error');
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       let url;
//       const params = new URLSearchParams({ page: page.toString() });
//       if (search) params.append('search', search);

//       if (isBrand) {
//         // Use brand-specific endpoint
//         url = `${baseUrl}/api/brands/${BRAND_SLUG}/products?${params}`;
//       } else {
//         // Use main salable products endpoint
//         url = `${baseUrl}/api/salable/products?${params}`;
//       }

//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) throw new Error('Failed to fetch products');
//       const data = await response.json();
//       setProducts(data.data || []);
//       setPagination(data.pagination || { current_page: 1, total_pages: 1, total: 0 });
//     } catch (err) {
//       setError(err.message);
//       addNotification('Failed to load products', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts(currentPage, searchTerm, showBrandProducts);
//   }, [currentPage, searchTerm, showBrandProducts]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const toggleBrandProducts = () => {
//     setShowBrandProducts(!showBrandProducts);
//     setCurrentPage(1);
//     setSearchTerm(''); // Reset search when toggling
//   };

//   if (loading) return <Loading />;

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
//         <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full text-center">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Error</h2>
//           <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
//           <button
//             onClick={() => fetchProducts(currentPage, searchTerm, showBrandProducts)}
//             className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 py-2 px-6 rounded-lg font-semibold"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
     
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full mb-4 shadow-lg shadow-blue-500/40">
//               <ShoppingCart className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
//               Salable Products {showBrandProducts && '(Brand View)'}
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               Browse available products for sale
//             </p>
//           </div>

//           {/* Brand Toggle Button */}
//           <div className="flex justify-center mb-4">
//             <button
//               onClick={toggleBrandProducts}
//               className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
//                 showBrandProducts
//                   ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40'
//                   : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
//               }`}
//             >
//               {showBrandProducts ? 'Switch to All Products' : 'Load Brand Products'}
//             </button>
//           </div>

//           {/* Search Bar */}
//           <form onSubmit={handleSearch} className="mb-6 max-w-md mx-auto">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search products by name or description..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//               />
//             </div>
//           </form>

//           {/* Products Table */}
//           <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                 <thead className="bg-gray-50 dark:bg-gray-800">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
//                   {products.length === 0 ? (
//                     <tr>
//                       <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
//                         No products found
//                       </td>
//                     </tr>
//                   ) : (
//                     products.map((product) => (
//                       <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{product.id}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{product.name}</td>
//                         <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{product.description}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">${product.price}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                             product.stock > 10 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
//                             product.stock > 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
//                             'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
//                           }`}>
//                             {product.stock} in stock
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Pagination */}
//           {pagination.total_pages > 1 && (
//             <div className="flex items-center justify-between mt-6">
//               <div className="text-sm text-gray-700 dark:text-gray-300">
//                 Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
//                 <span className="font-medium">{Math.min(currentPage * 10, pagination.total)}</span> of{' '}
//                 <span className="font-medium">{pagination.total}</span> results
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
//                 >
//                   <ChevronLeft className="w-4 h-4 mr-1" />
//                   Previous
//                 </button>
//                 {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((page) => (
//                   <button
//                     key={page}
//                     onClick={() => handlePageChange(page)}
//                     className={`px-3 py-2 border text-sm font-medium rounded-md transition-colors duration-200 ${
//                       currentPage === page
//                         ? 'border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-900/50 dark:text-blue-300'
//                         : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === pagination.total_pages}
//                   className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
//                 >
//                   Next
//                   <ChevronRight className="w-4 h-4 ml-1" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductsList;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search, ChevronLeft, ChevronRight, AlertCircle, ShoppingCart, Eye, ArrowLeft } from 'lucide-react';
import { useNotification } from '../../utils/NotificationSystem.jsx';
import Loading from '../../utils/Loading.jsx';

const ProductsList = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showBrandProducts, setShowBrandProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'details'

  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const BRAND_SLUG = 'another-test-brand-edited-version';

  // DEBOUNCE FUNCTION (Real-time search without reload)
  const debounce = useCallback((func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }, []);

  // FETCH PRODUCTS
  const fetchProducts = async (page = 1, search = '', isBrand = false) => {
    const token = localStorage.getItem('token');
    if (!token) {
      addNotification('Please log in.', 'error');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: page.toString() });
      if (search) params.append('search', search);

      const url = isBrand
        ? `${baseUrl}/api/brands/${BRAND_SLUG}/products?${params}`
        : `${baseUrl}/api/salable/products?${params}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to load');
      const data = await response.json();

      setProducts(data.data || []);
      setPagination(data.pagination || { current_page: 1, total_pages: 1, total: 0 });
    } catch (err) {
      setError(err.message);
      addNotification('Network error', 'error');
    } finally {
      setLoading(false);
    }
  };

  // FETCH SINGLE PRODUCT
  const fetchProductDetails = async (slug) => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/products/${slug}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      setSelectedProduct(data.data);
      setViewMode('details');
    } catch {
      addNotification('Product not found', 'error');
    } finally {
      setLoading(false);
    }
  };

  // REAL-TIME SEARCH (Triggers on typing)
  useEffect(() => {
    const delayedSearch = debounce(() => {
      setCurrentPage(1);
      fetchProducts(1, searchTerm, showBrandProducts);
    }, 300);

    delayedSearch();
  }, [searchTerm, showBrandProducts]);

  // PAGINATION CHANGE
  useEffect(() => {
    if (viewMode === 'list') {
      fetchProducts(currentPage, searchTerm, showBrandProducts);
    }
  }, [currentPage, viewMode]);

  // HANDLERS
  const handleViewDetails = (slug) => fetchProductDetails(slug);
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedProduct(null);
  };
  const toggleBrandProducts = () => {
    setShowBrandProducts(!showBrandProducts);
    setSearchTerm('');
    setCurrentPage(1);
  };

  // FORMAT PRICE
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  if (loading && viewMode === 'list') return <Loading />;

  if (error && viewMode === 'list') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-xl shadow-2xl p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => fetchProducts(currentPage, searchTerm, showBrandProducts)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">

          {/* LIST VIEW */}
          {viewMode === 'list' && (
            <>
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full mb-4 shadow-xl">
                  <ShoppingCart className="w-9 h-9 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Products {showBrandProducts && <span className="text-indigo-600">— Brand</span>}
                </h1>
              </div>

              {/* TOGGLE + REAL-TIME SEARCH */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <button
                  onClick={toggleBrandProducts}
                  className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all ${
                    showBrandProducts
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white dark:bg-gray-800 border-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50'
                  }`}
                >
                  {showBrandProducts ? '← All Products' : 'Brand Products →'}
                </button>

                <div className="relative max-w-md w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Type to search instantly..."
                    className="w-full pl-12 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all placeholder-gray-400 text-gray-900 dark:text-white"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 text-2xl font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* GRID */}
              {products.length === 0 ? (
                <div className="text-center py-20">
                  <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <p className="text-xl text-gray-500">No products found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((p) => (
                    <div key={p.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all group overflow-hidden">
                      <div className="h-56 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                        <img
                          src={p.main_image || '/placeholder.jpg'}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg line-clamp-2">{p.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{p.brand?.name || 'Unknown'}</p>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-2xl font-bold text-indigo-600">
                            {formatPrice(p.selling_price)}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            p.stock > 10 ? 'bg-green-100 text-green-700' :
                            p.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {p.stock} left
                          </span>
                        </div>
                        <button
                          onClick={() => handleViewDetails(p.slug)}
                          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
                        >
                          <Eye className="w-5 h-5" />
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* PAGINATION */}
              {pagination.total_pages > 1 && (
                <div className="flex justify-center gap-3 mt-10">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg disabled:opacity-50 flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <span className="px-4 py-2 text-sm">
                    Page <strong>{currentPage}</strong> / {pagination.total_pages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(pagination.total_pages, p + 1))}
                    disabled={currentPage === pagination.total_pages}
                    className="px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg disabled:opacity-50 flex items-center gap-2"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}

          {/* DETAILS VIEW */}
          {viewMode === 'details' && selectedProduct && (
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto">
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6 font-semibold"
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <img
                    src={selectedProduct.main_image}
                    alt={selectedProduct.name}
                    className="w-full h-96 object-cover rounded-2xl shadow-xl"
                  />
                  {selectedProduct.additional_images?.length > 0 && (
                    <div className="grid grid-cols-4 gap-3 mt-4">
                      {selectedProduct.additional_images.slice(0, 4).map((img, i) => (
                        <img key={i} src={img} className="h-20 object-cover rounded-lg shadow" />
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h1 className="text-4xl font-bold mb-3">{selectedProduct.name}</h1>
                  <p className="text-3xl font-bold text-indigo-600 mb-6">
                    {formatPrice(selectedProduct.selling_price)}
                  </p>

                  <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p><strong>Brand:</strong> {selectedProduct.brand?.name || 'N/A'}</p>
                    <p><strong>Category:</strong> {selectedProduct.category?.name || 'N/A'}</p>
                    <p><strong>Stock:</strong>
                      <span className={`ml-2 px-3 py-1 rounded-full text-sm font-bold ${
                        selectedProduct.stock > 10 ? 'bg-green-100 text-green-700' :
                        selectedProduct.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {selectedProduct.stock} left
                      </span>
                    </p>
                    <p className="leading-relaxed">
                      {selectedProduct.short_description || 'No description.'}
                    </p>
                  </div>

                  <button className="mt-8 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl py-5 rounded-2xl shadow-lg">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsList;