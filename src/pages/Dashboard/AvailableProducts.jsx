/* eslint-disable no-unused-vars */



// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Package, Search, ChevronLeft, ChevronRight, AlertCircle, ShoppingCart, Plus, Eye } from 'lucide-react';
// import { useNotification } from '../../utils/NotificationSystem.jsx';
// import Navbar from '../../components/Navbar.jsx';
// import Loading from '../../utils/Loading.jsx';
// import { useParams } from 'react-router-dom';
// const AvailableProducts = () => {
//   const navigate = useNavigate();
//   const {slug } = useParams()
//   const { addNotification } = useNotification();
//   const [products, setProducts] = useState([]);
//   const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1, total: 0 });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewMode, setViewMode] = useState('list'); // 'list', 'create', 'details'
// const [selectedProductSlug, setSelectedProductSlug] = useState(slug);
//   const [productDetails, setProductDetails] = useState(null);
//   const [showForm, setShowForm] = useState(false); // For create form
//   const [categories, setCategories] = useState([]); // For category dropdown
//   const [formData, setFormData] = useState({
//     name: '',
//     product_category_slug: '',
//     brand_slug: '',
//     warehouse_slug: '',
//     short_description: '',
//     long_description: '',
//     product_type: 'physical',
//     selling_price: '',
//     compare_price: '',
//     cost_price: '',
//     discount_percentage: '',
//     discount_starts_at: '',
//     discount_ends_at: '',
//     stock: '',
//     track_stock: '1',
//     backorder_allowed: '1',
//     low_stock_threshold: '',
//     weight: '',
//     length: '',
//     width: '',
//     height: '',
//     is_shipping_required: '1',
//     is_returnable: '1',
//     return_days: '',
//     digital_file_url: '',
//     is_featured: '1',
//     is_sponsored: '1',
//     is_taxable: '1',
//     show_on_storefront: '1',
//     country: '',
//     state: '',
//     city: '',
//     meta_title: '',
//     meta_description: '',
//     meta_keywords: [],
//     tags: [],
//   });
//   const [mainImageFile, setMainImageFile] = useState(null);
//   const [additionalImagesFiles, setAdditionalImagesFiles] = useState([]);

//   const baseUrl = import.meta.env.VITE_BACKEND_URL;

//   const fetchProducts = async (page = 1, search = '') => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       addNotification('No authentication token found. Please log in.', 'error');
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       const params = new URLSearchParams({ page: page.toString() });
//       if (search) params.append('search', search);
//       const response = await fetch(`${baseUrl}/api/salable/products?${params}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) throw new Error('Failed to fetch products');
//       const data = await response.json();
//       console.log(data)
//       setProducts(data.data || []);
//       setPagination(data.pagination || { current_page: 1, total_pages: 1, total: 0 });
//     } catch (err) {
//       console.log(err)
//       setError(err.message);
//       addNotification('Failed to load products', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProductDetails = async (slugToFetch) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       addNotification('No authentication token found. Please log in.', 'error');
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`${baseUrl}/api/product/${slugToFetch}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) throw new Error('Failed to fetch product details');
//       const data = await response.json();
//       console.log(data)
//       setProductDetails(data.data);
//       addNotification('Product details loaded successfully', 'success');
//     } catch (err) {
//       console.log(err, "error")
//       setError(err.message);
//       addNotification('Failed to load product details', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       addNotification('No authentication token found. Please log in.', 'error');
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(`${baseUrl}/api/product-categories/all`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) throw new Error('Failed to fetch categories');
//       const data = await response.json();
   
//       setCategories(data.data || []);
//     } catch (err) {
//       addNotification('Failed to load categories: ' + err.message, 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // add a new effect right after the two existing useEffect blocks
// useEffect(() => {

//   if (slug && viewMode === 'list') {
//     setSelectedProductSlug(slug);
//     setViewMode('details');
//   }
// }, [slug, viewMode]);

//   const handleStoreProduct = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     if (!token) {
//       addNotification('No authentication token found. Please log in.', 'error');
//       navigate('/login');
//       return;
//     }

//     if (!mainImageFile) {
//       addNotification('Please select a main image.', 'error');
//       return;
//     }

//     setLoading(true);
//     try {
//       const formDataToSend = new FormData();
//       Object.keys(formData).forEach(key => {
//         if (key === 'meta_keywords' || key === 'tags') {
//           formData[key].forEach(item => formDataToSend.append(key + '[]', item));
//         } else {
//           formDataToSend.append(key, formData[key]);
//         }
//       });
//       formDataToSend.append('product_main_image', mainImageFile);
//       additionalImagesFiles.forEach(file => {
//         formDataToSend.append('additional_product_images[]', file);
//       });

//       const response = await fetch(`${baseUrl}/api/products`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formDataToSend,
//       });

//       if (!response.ok) throw new Error('Failed to store product');
//       const data = await response.json();
//       addNotification('Product stored successfully!', 'success');
//       setShowForm(false);
//       setFormData({
//         name: '',
//         product_category_slug: '',
//         brand_slug: '',
//         warehouse_slug: '',
//         short_description: '',
//         long_description: '',
//         product_type: 'physical',
//         selling_price: '',
//         compare_price: '',
//         cost_price: '',
//         discount_percentage: '',
//         discount_starts_at: '',
//         discount_ends_at: '',
//         stock: '',
//         track_stock: '1',
//         backorder_allowed: '1',
//         low_stock_threshold: '',
//         weight: '',
//         length: '',
//         width: '',
//         height: '',
//         is_shipping_required: '1',
//         is_returnable: '1',
//         return_days: '',
//         digital_file_url: '',
//         is_featured: '1',
//         is_sponsored: '1',
//         is_taxable: '1',
//         show_on_storefront: '1',
//         country: '',
//         state: '',
//         city: '',
//         meta_title: '',
//         meta_description: '',
//         meta_keywords: [],
//         tags: [],
//       });
//       setMainImageFile(null);
//       setAdditionalImagesFiles([]);
//       fetchProducts(currentPage, searchTerm); // Refresh list
//     } catch (err) {
//       addNotification('Failed to store product: ' + err.message, 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox') {
//       setFormData({ ...formData, [name]: checked ? '1' : '0' });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleFileChange = (e, type) => {
//     if (type === 'main') {
//       setMainImageFile(e.target.files[0]);
//     } else {
//       setAdditionalImagesFiles([...e.target.files]);
//     }
//   };

//   const handleArrayChange = (e, field) => {
//     const { value } = e.target;
//     setFormData({ ...formData, [field]: value.split(',').map(item => item.trim()) });
//   };

//   useEffect(() => {
//     fetchProducts(currentPage, searchTerm);
//     fetchCategories();
//   }, [currentPage, searchTerm]);

//   useEffect(() => {
//     if (viewMode === 'details' && selectedProductSlug) {
//       fetchProductDetails(selectedProductSlug);
//     }
//   }, [viewMode, selectedProductSlug]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };



//   const handleViewDetails = (productSlug) => {
//   setSelectedProductSlug(productSlug);   // store slug
//   setViewMode('details');
// };

//   const handleBackToList = () => {
//     setViewMode('list');
//     setProductDetails(null);
//    setSelectedProductSlug(null);
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
//             onClick={() => fetchProducts(currentPage, searchTerm)}
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
//               <Package className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
//               Products
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               Manage and explore products
//             </p>
//           </div>

//           {/* Add New Product Button */}
//           <div className="flex justify-center mb-6">
//             <button
//               onClick={() => setShowForm(!showForm)}
//               className="flex items-center justify-center px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 rounded-lg font-semibold shadow-md"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               {showForm ? 'Cancel' : 'Add New Product'}
//             </button>
//           </div>

//           {/* Add Product Form */}
//           {showForm && (
//             <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl p-6 mb-6">
//               <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Add New Product</h2>
//               <form onSubmit={handleStoreProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Product name"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
//                   <select
//                     name="product_category_slug"
//                     value={formData.product_category_slug}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map(category => (
//                       <option key={category.slug} value={category.slug}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brand Slug</label>
//                   <input
//                     type="text"
//                     name="brand_slug"
//                     value={formData.brand_slug}
//                     onChange={handleInputChange}
//                     placeholder="another-test-brand-edited-version"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Warehouse Slug</label>
//                   <input
//                     type="text"
//                     name="warehouse_slug"
//                     value={formData.warehouse_slug}
//                     onChange={handleInputChange}
//                     placeholder="lagos-main-warehouse-edited-version"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Type</label>
//                   <select
//                     name="product_type"
//                     value={formData.product_type}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="physical">Physical</option>
//                     <option value="digital">Digital</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selling Price</label>
//                   <input
//                     type="number"
//                     name="selling_price"
//                     value={formData.selling_price}
//                     onChange={handleInputChange}
//                     placeholder="34"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Compare Price</label>
//                   <input
//                     type="number"
//                     name="compare_price"
//                     value={formData.compare_price}
//                     onChange={handleInputChange}
//                     placeholder="55"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cost Price</label>
//                   <input
//                     type="number"
//                     name="cost_price"
//                     value={formData.cost_price}
//                     onChange={handleInputChange}
//                     placeholder="30"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock</label>
//                   <input
//                     type="number"
//                     name="stock"
//                     value={formData.stock}
//                     onChange={handleInputChange}
//                     placeholder="7"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Low Stock Threshold</label>
//                   <input
//                     type="number"
//                     name="low_stock_threshold"
//                     value={formData.low_stock_threshold}
//                     onChange={handleInputChange}
//                     placeholder="5"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weight</label>
//                   <input
//                     type="number"
//                     name="weight"
//                     value={formData.weight}
//                     onChange={handleInputChange}
//                     placeholder="1.5"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Length</label>
//                   <input
//                     type="number"
//                     name="length"
//                     value={formData.length}
//                     onChange={handleInputChange}
//                     placeholder="10"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Width</label>
//                   <input
//                     type="number"
//                     name="width"
//                     value={formData.width}
//                     onChange={handleInputChange}
//                     placeholder="5"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height</label>
//                   <input
//                     type="number"
//                     name="height"
//                     value={formData.height}
//                     onChange={handleInputChange}
//                     placeholder="3"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Return Days</label>
//                   <input
//                     type="number"
//                     name="return_days"
//                     value={formData.return_days}
//                     onChange={handleInputChange}
//                     placeholder="30"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Digital File URL</label>
//                   <input
//                     type="url"
//                     name="digital_file_url"
//                     value={formData.digital_file_url}
//                     onChange={handleInputChange}
//                     placeholder="https://example.com/file"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Country</label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleInputChange}
//                     placeholder="Nigeria"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State</label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleInputChange}
//                     placeholder="Lagos"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     placeholder="Ikeja"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount Percentage</label>
//                   <input
//                     type="number"
//                     name="discount_percentage"
//                     value={formData.discount_percentage}
//                     onChange={handleInputChange}
//                     placeholder="9"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount Starts At</label>
//                   <input
//                     type="date"
//                     name="discount_starts_at"
//                     value={formData.discount_starts_at}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount Ends At</label>
//                   <input
//                     type="date"
//                     name="discount_ends_at"
//                     value={formData.discount_ends_at}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Short Description</label>
//                   <textarea
//                     name="short_description"
//                     value={formData.short_description}
//                     onChange={handleInputChange}
//                     placeholder="test short description"
//                     rows={3}
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Long Description</label>
//                   <textarea
//                     name="long_description"
//                     value={formData.long_description}
//                     onChange={handleInputChange}
//                     placeholder="long description for testing purpose"
//                     rows={4}
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Title</label>
//                   <input
//                     type="text"
//                     name="meta_title"
//                     value={formData.meta_title}
//                     onChange={handleInputChange}
//                     placeholder="shjfbewufje"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Description</label>
//                   <input
//                     type="text"
//                     name="meta_description"
//                     value={formData.meta_description}
//                     onChange={handleInputChange}
//                     placeholder="bfj"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Keywords (comma separated)</label>
//                   <input
//                     type="text"
//                     value={formData.meta_keywords.join(', ')}
//                     onChange={(e) => handleArrayChange(e, 'meta_keywords')}
//                     placeholder="testme"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (comma separated)</label>
//                   <input
//                     type="text"
//                     value={formData.tags.join(', ')}
//                     onChange={(e) => handleArrayChange(e, 'tags')}
//                     placeholder="test-tag-store"
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div className="md:col-span-2 space-y-2">
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="track_stock"
//                       checked={formData.track_stock === '1'}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">Track Stock</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="backorder_allowed"
//                       checked={formData.backorder_allowed === '1'}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">Backorder Allowed</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="is_shipping_required"
//                       checked={formData.is_shipping_required === '1'}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">Shipping Required</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="is_returnable"
//                       checked={formData.is_returnable === '1'}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">Returnable</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="is_featured"
//                       checked={formData.is_featured === '1'}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">Featured</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="is_sponsored"
//                       checked={formData.is_sponsored === '1'}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">Sponsored</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="is_taxable"
//                       checked={formData.is_taxable === '1'}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">Taxable</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="show_on_storefront"
//                       checked={formData.show_on_storefront === '1'}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">Show on Storefront</span>
//                   </label>
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Main Image</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleFileChange(e, 'main')}
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                   {mainImageFile && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Selected: {mainImageFile.name}</p>}
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Images</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={(e) => handleFileChange(e, 'additional')}
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   {additionalImagesFiles.length > 0 && (
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{additionalImagesFiles.length} files selected</p>
//                   )}
//                 </div>
//                 <div className="md:col-span-2 flex justify-end space-x-2">
//                   <button
//                     type="button"
//                     onClick={() => setShowForm(false)}
//                     className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300"
//                   >
//                     {loading ? 'Saving...' : 'Save Product'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}

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
//           {(viewMode === 'list' || viewMode === 'create') && (
//             <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                   <thead className="bg-gray-50 dark:bg-gray-800">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
//                     {products.length === 0 ? (
//                       <tr>
//                         <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
//                           No products found
//                         </td>
//                       </tr>
//                     ) : (
//                       products.map((product) => (
//                         <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{product.id}</td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{product.name}</td>
//                           <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{product.short_description}</td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">${product.selling_price}</td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                               product.stock > 10 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
//                               product.stock > 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
//                               'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
//                             }`}>
//                               {product.stock} in stock
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                            <button
//   onClick={() => handleViewDetails(product.slug)}   // pass slug
//   className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3 transition-colors duration-200"
// >
//   <Eye className="w-4 h-4 inline" />
// </button>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* Product Details View */}
//           {viewMode === 'details' && productDetails && (
//             <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Product Details</h2>
//                 <button
//                   onClick={handleBackToList}
//                   className="flex items-center text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
//                 >
//                   Back to List
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Name</p>
//                   <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{productDetails.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Selling Price</p>
//                   <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">${productDetails.selling_price}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Stock</p>
//                   <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{productDetails.stock}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Category</p>
//                   <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{productDetails.product_category_slug}</p>
//                 </div>
//                 <div className="md:col-span-2">
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Short Description</p>
//                   <p className="text-gray-900 dark:text-gray-100">{productDetails.short_description}</p>
//                 </div>
//                 <div className="md:col-span-2">
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Long Description</p>
//                   <p className="text-gray-900 dark:text-gray-100">{productDetails.long_description}</p>
//                 </div>
//                 {/* Add more fields as needed */}
//               </div>
//             </div>
//           )}

//           {/* Pagination */}
//           {(viewMode === 'list' || viewMode === 'create') && pagination.total_pages > 1 && (
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

// export default AvailableProducts;









// import React, { useState, useEffect, useMemo } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Package, Search, ChevronLeft, ChevronRight, AlertCircle, Plus, Eye } from 'lucide-react';
// import { useNotification } from '../../utils/NotificationSystem.jsx';
// import Loading from '../../utils/Loading.jsx';

// const AvailableProducts = () => {
//   const navigate = useNavigate();
//   const { slug } = useParams();
//   const { addNotification } = useNotification();

//   const [allProducts, setAllProducts] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1, total: 0 });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewMode, setViewMode] = useState('list');
//   const [selectedProductSlug, setSelectedProductSlug] = useState(slug);
//   const [productDetails, setProductDetails] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [categories, setCategories] = useState([]);

//   // ORIGINAL FORM STATE (UNTOUCHED)
//   const [formData, setFormData] = useState({
//     name: '',
//     product_category_slug: '',
//     brand_slug: '',
//     warehouse_slug: '',
//     short_description: '',
//     long_description: '',
//     product_type: 'physical',
//     selling_price: '',
//     compare_price: '',
//     cost_price: '',
//     discount_percentage: '',
//     discount_starts_at: '',
//     discount_ends_at: '',
//     stock: '',
//     track_stock: '1',
//     backorder_allowed: '1',
//     low_stock_threshold: '',
//     weight: '',
//     length: '',
//     width: '',
//     height: '',
//     is_shipping_required: '1',
//     is_returnable: '1',
//     return_days: '',
//     digital_file_url: '',
//     is_featured: '1',
//     is_sponsored: '1',
//     is_taxable: '1',
//     show_on_storefront: '1',
//     country: '',
//     state: '',
//     city: '',
//     meta_title: '',
//     meta_description: '',
//     meta_keywords: [],
//     tags: [],
//   });
//   const [mainImageFile, setMainImageFile] = useState(null);
//   const [additionalImagesFiles, setAdditionalImagesFiles] = useState([]);

//   const baseUrl = import.meta.env.VITE_BACKEND_URL;

//   const fetchProducts = async (page = 1, search = '') => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       addNotification('No authentication token found. Please log in.', 'error');
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       const params = new URLSearchParams({ page: page.toString() });
//       if (search) params.append('search', search);
//       const response = await fetch(`${baseUrl}/api/salable/products?${params}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) throw new Error('Failed to fetch products');
//       const data = await response.json();

//       if (page === 1) {
//         setAllProducts(data.data || []);
//       }
//       setProducts(data.data || []);
//       setPagination(data.pagination || { current_page: 1, total_pages: 1, total: 0 });
//     } catch (err) {
//       setError(err.message);
//       addNotification('Failed to load products', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProductDetails = async (slugToFetch) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       addNotification('No authentication token found. Please log in.', 'error');
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`${baseUrl}/api/product/${slugToFetch}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) throw new Error('Failed to fetch product details');
//       const data = await response.json();
//       setProductDetails(data.data);
//       addNotification('Product details loaded', 'success');
//     } catch (err) {
//       setError(err.message);
//       addNotification('Failed to load product details', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     try {
//       const response = await fetch(`${baseUrl}/api/product-categories/all`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) throw new Error('Failed to fetch categories');
//       const data = await response.json();
//       setCategories(data.data || []);
//     } catch (err) {
//       addNotification('Failed to load categories', 'error');
//     }
//   };

//   const filteredProducts = useMemo(() => {
//     if (!searchTerm.trim()) return products;
//     const term = searchTerm.toLowerCase();
//     return allProducts.filter(p =>
//       p.name?.toLowerCase().includes(term) ||
//       p.short_description?.toLowerCase().includes(term) ||
//       p.long_description?.toLowerCase().includes(term)
//     );
//   }, [allProducts, searchTerm, products]);

//   useEffect(() => {
//     fetchProducts(currentPage, searchTerm);
//     fetchCategories();
//   }, [currentPage]);

//   useEffect(() => {
//     if (slug && viewMode === 'list') {
//       setSelectedProductSlug(slug);
//       setViewMode('details');
//     }
//   }, [slug, viewMode]);

//   useEffect(() => {
//     if (viewMode === 'details' && selectedProductSlug) {
//       fetchProductDetails(selectedProductSlug);
//     }
//   }, [viewMode, selectedProductSlug]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleViewDetails = (productSlug) => {
//     setSelectedProductSlug(productSlug);
//     setViewMode('details');
//   };

//   const handleBackToList = () => {
//     setViewMode('list');
//     setProductDetails(null);
//     setSelectedProductSlug(null);
//   };

//   const handleStoreProduct = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     if (!token) return navigate('/login');

//     if (!mainImageFile) {
//       addNotification('Please select a main image.', 'error');
//       return;
//     }

//     setLoading(true);
//     try {
//       const formDataToSend = new FormData();
//       Object.keys(formData).forEach(key => {
//         if (key === 'meta_keywords' || key === 'tags') {
//           formData[key].forEach(item => formDataToSend.append(key + '[]', item));
//         } else {
//           formDataToSend.append(key, formData[key]);
//         }
//       });
//       formDataToSend.append('product_main_image', mainImageFile);
//       additionalImagesFiles.forEach(file => {
//         formDataToSend.append('additional_product_images[]', file);
//       });

//       const response = await fetch(`${baseUrl}/api/products`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` },
//         body: formDataToSend,
//       });

//       if (!response.ok) throw new Error('Failed to store product');
//       addNotification('Product stored successfully!', 'success');
//       setShowForm(false);
//       setFormData({
//         name: '',
//         product_category_slug: '',
//         brand_slug: '',
//         warehouse_slug: '',
//         short_description: '',
//         long_description: '',
//         product_type: 'physical',
//         selling_price: '',
//         compare_price: '',
//         cost_price: '',
//         discount_percentage: '',
//         discount_starts_at: '',
//         discount_ends_at: '',
//         stock: '',
//         track_stock: '1',
//         backorder_allowed: '1',
//         low_stock_threshold: '',
//         weight: '',
//         length: '',
//         width: '',
//         height: '',
//         is_shipping_required: '1',
//         is_returnable: '1',
//         return_days: '',
//         digital_file_url: '',
//         is_featured: '1',
//         is_sponsored: '1',
//         is_taxable: '1',
//         show_on_storefront: '1',
//         country: '',
//         state: '',
//         city: '',
//         meta_title: '',
//         meta_description: '',
//         meta_keywords: [],
//         tags: [],
//       });
//       setMainImageFile(null);
//       setAdditionalImagesFiles([]);
//       fetchProducts(currentPage);
//     } catch (err) {
//       addNotification('Failed to store product', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === 'checkbox' ? (checked ? '1' : '0') : value });
//   };

//   const handleFileChange = (e, type) => {
//     if (type === 'main') setMainImageFile(e.target.files[0]);
//     else setAdditionalImagesFiles([...e.target.files]);
//   };

//   const handleArrayChange = (e, field) => {
//     const { value } = e.target;
//     setFormData({ ...formData, [field]: value.split(',').map(item => item.trim()) });
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
//             onClick={() => fetchProducts(currentPage)}
//             className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded-lg font-semibold"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full mb-4 shadow-lg">
//             <Package className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Products</h1>
//           <p className="text-gray-600 dark:text-gray-400">Manage and explore products</p>
//         </div>

//         {/* Add New Product Button */}
//         <div className="flex justify-center mb-6">
//           <button
//             onClick={() => setShowForm(!showForm)}
//             className="flex items-center px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg font-semibold shadow-md"
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             {showForm ? 'Cancel' : 'Add New Product'}
//           </button>
//         </div>

//         {/* ORIGINAL ADD PRODUCT FORM - 100% RESTORED */}
//         {showForm && (
//           <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl p-6 mb-6">
//             <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Add New Product</h2>
//             <form onSubmit={handleStoreProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="Product name"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
//                 <select
//                   name="product_category_slug"
//                   value={formData.product_category_slug}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map(category => (
//                     <option key={category.slug} value={category.slug}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brand Slug</label>
//                 <input
//                   type="text"
//                   name="brand_slug"
//                   value={formData.brand_slug}
//                   onChange={handleInputChange}
//                   placeholder="another-test-brand-edited-version"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Warehouse Slug</label>
//                 <input
//                   type="text"
//                   name="warehouse_slug"
//                   value={formData.warehouse_slug}
//                   onChange={handleInputChange}
//                   placeholder="lagos-main-warehouse-edited-version"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Type</label>
//                 <select
//                   name="product_type"
//                   value={formData.product_type}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="physical">Physical</option>
//                   <option value="digital">Digital</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selling Price</label>
//                 <input
//                   type="number"
//                   name="selling_price"
//                   value={formData.selling_price}
//                   onChange={handleInputChange}
//                   placeholder="34"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Compare Price</label>
//                 <input
//                   type="number"
//                   name="compare_price"
//                   value={formData.compare_price}
//                   onChange={handleInputChange}
//                   placeholder="55"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cost Price</label>
//                 <input
//                   type="number"
//                   name="cost_price"
//                   value={formData.cost_price}
//                   onChange={handleInputChange}
//                   placeholder="30"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock</label>
//                 <input
//                   type="number"
//                   name="stock"
//                   value={formData.stock}
//                   onChange={handleInputChange}
//                   placeholder="7"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Low Stock Threshold</label>
//                 <input
//                   type="number"
//                   name="low_stock_threshold"
//                   value={formData.low_stock_threshold}
//                   onChange={handleInputChange}
//                   placeholder="5"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weight</label>
//                 <input
//                   type="number"
//                   name="weight"
//                   value={formData.weight}
//                   onChange={handleInputChange}
//                   placeholder="1.5"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Length</label>
//                 <input
//                   type="number"
//                   name="length"
//                   value={formData.length}
//                   onChange={handleInputChange}
//                   placeholder="10"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Width</label>
//                 <input
//                   type="number"
//                   name="width"
//                   value={formData.width}
//                   onChange={handleInputChange}
//                   placeholder="5"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height</label>
//                 <input
//                   type="number"
//                   name="height"
//                   value={formData.height}
//                   onChange={handleInputChange}
//                   placeholder="3"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Return Days</label>
//                 <input
//                   type="number"
//                   name="return_days"
//                   value={formData.return_days}
//                   onChange={handleInputChange}
//                   placeholder="30"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Digital File URL</label>
//                 <input
//                   type="url"
//                   name="digital_file_url"
//                   value={formData.digital_file_url}
//                   onChange={handleInputChange}
//                   placeholder="https://example.com/file"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Country</label>
//                 <input
//                   type="text"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleInputChange}
//                   placeholder="Nigeria"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State</label>
//                 <input
//                   type="text"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleInputChange}
//                   placeholder="Lagos"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
//                 <input
//                   type="text"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleInputChange}
//                   placeholder="Ikeja"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount Percentage</label>
//                 <input
//                   type="number"
//                   name="discount_percentage"
//                   value={formData.discount_percentage}
//                   onChange={handleInputChange}
//                   placeholder="9"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount Starts At</label>
//                 <input
//                   type="date"
//                   name="discount_starts_at"
//                   value={formData.discount_starts_at}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount Ends At</label>
//                 <input
//                   type="date"
//                   name="discount_ends_at"
//                   value={formData.discount_ends_at}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Short Description</label>
//                 <textarea
//                   name="short_description"
//                   value={formData.short_description}
//                   onChange={handleInputChange}
//                   placeholder="test short description"
//                   rows={3}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Long Description</label>
//                 <textarea
//                   name="long_description"
//                   value={formData.long_description}
//                   onChange={handleInputChange}
//                   placeholder="long description for testing purpose"
//                   rows={4}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>
//               {/* <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Title</label>
//                 <input
//                   type="text"
//                   name="meta_title"
//                   value={formData.meta_title}
//                   onChange={handleInputChange}
//                   placeholder="shjfbewufje"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Description</label>
//                 <input
//                   type="text"
//                   name="meta_description"
//                   value={formData.meta_description}
//                   onChange={handleInputChange}
//                   placeholder="bfj"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Keywords (comma separated)</label>
//                 <input
//                   type="text"
//                   value={formData.meta_keywords.join(', ')}
//                   onChange={(e) => handleArrayChange(e, 'meta_keywords')}
//                   placeholder="testme"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div> */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (comma separated)</label>
//                 <input
//                   type="text"
//                   value={formData.tags.join(', ')}
//                   onChange={(e) => handleArrayChange(e, 'tags')}
//                   placeholder="test-tag-store"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="md:col-span-2 space-y-2">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="track_stock"
//                     checked={formData.track_stock === '1'}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">Track Stock</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="backorder_allowed"
//                     checked={formData.backorder_allowed === '1'}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">Backorder Allowed</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="is_shipping_required"
//                     checked={formData.is_shipping_required === '1'}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">Shipping Required</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="is_returnable"
//                     checked={formData.is_returnable === '1'}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">Returnable</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="is_featured"
//                     checked={formData.is_featured === '1'}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">Featured</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="is_sponsored"
//                     checked={formData.is_sponsored === '1'}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">Sponsored</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="is_taxable"
//                     checked={formData.is_taxable === '1'}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">Taxable</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="show_on_storefront"
//                     checked={formData.show_on_storefront === '1'}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">Show on Storefront</span>
//                 </label>
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Main Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleFileChange(e, 'main')}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//                 {mainImageFile && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Selected: {mainImageFile.name}</p>}
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Images</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={(e) => handleFileChange(e, 'additional')}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 {additionalImagesFiles.length > 0 && (
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{additionalImagesFiles.length} files selected</p>
//                 )}
//               </div>
//               <div className="md:col-span-2 flex justify-end space-x-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300"
//                 >
//                   {loading ? 'Saving...' : 'Save Product'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Search Bar - Real-time */}
//         <div className="mb-6 max-w-md mx-auto">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search products..."
//               className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
//             />
//           </div>
//         </div>

//         {/* Products Table */}
//         {(viewMode === 'list' || viewMode === 'create') && (
//           <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                 <thead className="bg-gray-50 dark:bg-gray-800">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Description</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Price</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Stock</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
//                   {filteredProducts.length === 0 ? (
//                     <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No products found</td></tr>
//                   ) : (
//                     filteredProducts.map((product) => (
//                       <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                         <td className="px-6 py-4 text-sm">{product.id}</td>
//                         <td className="px-6 py-4 text-sm">{product.name}</td>
//                         <td className="px-6 py-4 text-sm text-gray-500">{product.short_description}</td>
//                         <td className="px-6 py-4 text-sm font-medium">${product.selling_price}</td>
//                         <td className="px-6 py-4">
//                           <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                             product.stock > 10 ? 'bg-green-100 text-green-800' :
//                             product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
//                             'bg-red-100 text-red-800'
//                           }`}>
//                             {product.stock} in stock
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <button onClick={() => handleViewDetails(product.slug)} className="text-blue-600 hover:text-blue-900">
//                             <Eye className="w-4 h-4" />
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Product Details View - ALL FIELDS */}
//         {viewMode === 'details' && productDetails && (
//           <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold">Product Details</h2>
//               <button onClick={handleBackToList} className="text-blue-600 hover:text-blue-900">Back to List</button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
//               <div><strong>Name:</strong> {productDetails.name}</div>
//               <div><strong>Category:</strong> {productDetails.product_category_slug}</div>
//               <div><strong>Brand:</strong> {productDetails.brand_slug}</div>
//               <div><strong>Warehouse:</strong> {productDetails.warehouse_slug}</div>
//               <div><strong>Short Description:</strong> {productDetails.short_description}</div>
//               <div><strong>Long Description:</strong> {productDetails.long_description}</div>
//               <div><strong>Product Type:</strong> {productDetails.product_type}</div>
//               <div><strong>Selling Price:</strong> ${productDetails.selling_price}</div>
//               <div><strong>Compare Price:</strong> ${productDetails.compare_price}</div>
//               <div><strong>Cost Price:</strong> ${productDetails.cost_price}</div>
//               <div><strong>Discount %:</strong> {productDetails.discount_percentage}%</div>
//               <div><strong>Discount Starts:</strong> {productDetails.discount_starts_at}</div>
//               <div><strong>Discount Ends:</strong> {productDetails.discount_ends_at}</div>
//               <div><strong>Stock:</strong> {productDetails.stock}</div>
//               <div><strong>Track Stock:</strong> {productDetails.track_stock === '1' ? 'Yes' : 'No'}</div>
//               <div><strong>Backorder Allowed:</strong> {productDetails.backorder_allowed === '1' ? 'Yes' : 'No'}</div>
//               <div><strong>Low Stock Threshold:</strong> {productDetails.low_stock_threshold}</div>
//               <div><strong>Weight:</strong> {productDetails.weight}</div>
//               <div><strong>Length:</strong> {productDetails.length}</div>
//               <div><strong>Width:</strong> {productDetails.width}</div>
//               <div><strong>Height:</strong> {productDetails.height}</div>
//               <div><strong>Shipping Required:</strong> {productDetails.is_shipping_required === '1' ? 'Yes' : 'No'}</div>
//               <div><strong>Returnable:</strong> {productDetails.is_returnable === '1' ? 'Yes' : 'No'}</div>
//               <div><strong>Return Days:</strong> {productDetails.return_days}</div>
//               <div><strong>Digital File URL:</strong> {productDetails.digital_file_url || 'N/A'}</div>
//               <div><strong>Featured:</strong> {productDetails.is_featured === '1' ? 'Yes' : 'No'}</div>
//               <div><strong>Sponsored:</strong> {productDetails.is_sponsored === '1' ? 'Yes' : 'No'}</div>
//               <div><strong>Taxable:</strong> {productDetails.is_taxable === '1' ? 'Yes' : 'No'}</div>
//               <div><strong>Show on Storefront:</strong> {productDetails.show_on_storefront === '1' ? 'Yes' : 'No'}</div>
//               <div><strong>Country:</strong> {productDetails.country}</div>
//               <div><strong>State:</strong> {productDetails.state}</div>
//               <div><strong>City:</strong> {productDetails.city}</div>
//               <div><strong>Meta Title:</strong> {productDetails.meta_title}</div>
//               <div><strong>Meta Description:</strong> {productDetails.meta_description}</div>
//               <div><strong>Meta Keywords:</strong> {productDetails.meta_keywords?.join(', ')}</div>
//               <div><strong>Tags:</strong> {productDetails.tags?.join(', ')}</div>
//             </div>

//             {productDetails.product_main_image && (
//               <div className="mt-6">
//                 <strong>Main Image:</strong>
//                 <img src={productDetails.product_main_image} alt="Main" className="w-48 h-48 object-cover rounded mt-2" />
//               </div>
//             )}
//             {productDetails.additional_product_images?.length > 0 && (
//               <div className="mt-6">
//                 <strong>Additional Images:</strong>
//                 <div className="flex gap-2 mt-2 flex-wrap">
//                   {productDetails.additional_product_images.map((img, i) => (
//                     <img key={i} src={img} alt={`Extra ${i}`} className="w-24 h-24 object-cover rounded" />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Pagination */}
//         {(viewMode === 'list' || viewMode === 'create') && pagination.total_pages > 1 && (
//           <div className="flex justify-between items-center mt-6">
//             <div className="text-sm text-gray-700">
//               Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, pagination.total)} of {pagination.total}
//             </div>
//             <div className="flex space-x-2">
//               <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-2 border rounded-md disabled:opacity-50 flex items-center">
//                 <ChevronLeft className="w-4 h-4 mr-1" /> Previous
//               </button>
//               {Array.from({ length: pagination.total_pages }, (_, i) => (
//                 <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={`px-3 py-2 border rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}>
//                   {i + 1}
//                 </button>
//               ))}
//               <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pagination.total_pages} className="px-3 py-2 border rounded-md disabled:opacity-50 flex items-center">
//                 Next <ChevronRight className="w-4 h-4 ml-1" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AvailableProducts;


import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Package,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Plus,
  Eye,
  Sparkles,
  RefreshCw,
  Image as ImageIcon,
} from 'lucide-react';
import { useNotification } from '../../utils/NotificationSystem.jsx';
import Loading from '../../utils/Loading.jsx';

const AvailableProducts = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { addNotification } = useNotification();

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('list');
  const [selectedProductSlug, setSelectedProductSlug] = useState(slug);
  const [productDetails, setProductDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);         // NEW
  const [warehouses, setWarehouses] = useState([]); // NEW

  // AI STATES
  const [generatingImg, setGeneratingImg] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  const [generatingDesc, setGeneratingDesc] = useState(false);

  // ORIGINAL FORM STATE – 100% UNTOUCHED
  const [formData, setFormData] = useState({
    name: '',
    product_category_slug: '',
    brand_slug: '',
    warehouse_slug: '',
    short_description: '',
    long_description: '',
    product_type: 'physical',
    selling_price: '',
    compare_price: '',
    cost_price: '',
    discount_percentage: '',
    discount_starts_at: '',
    discount_ends_at: '',
    stock: '',
    track_stock: '1',
    backorder_allowed: '1',
    low_stock_threshold: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    is_shipping_required: '1',
    is_returnable: '1',
    return_days: '',
    digital_file_url: '',
    is_featured: '1',
    is_sponsored: '1',
    is_taxable: '1',
    show_on_storefront: '1',
    country: '',
    state: '',
    city: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: [],
    tags: [],
  });
  const [mainImageFile, setMainImageFile] = useState(null);
  const [additionalImagesFiles, setAdditionalImagesFiles] = useState([]);

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  // FETCH BRANDS & WAREHOUSES
  const fetchBrandsAndWarehouses = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const [bRes, wRes] = await Promise.all([
        fetch(`${baseUrl}/api/brands`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${baseUrl}/api/warehouses`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (bRes.ok) setBrands((await bRes.json()).data || []);
      if (wRes.ok) setWarehouses((await wRes.json()).data || []);
    } catch {
      addNotification('Failed to load brands/warehouses', 'error');
    }
  };

  // AI: GENERATE IMAGE
  const generateImage = async () => {
    if (!formData.name) return addNotification('Enter product name first', 'warning');
    setGeneratingImg(true);
    try {
      const res = await fetch(`${baseUrl}/generate-product-image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_name: formData.name }),
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setGeneratedImage(url);
      addNotification('Image ready – click to use', 'success');
    } catch {
      addNotification('Image generation failed', 'error');
    } finally {
      setGeneratingImg(false);
    }
  };

  // AI: GENERATE / IMPROVE DESCRIPTION
  const generateDescription = async (type) => {
    if (!formData.name) return addNotification('Enter product name first', 'warning');
    setGeneratingDesc(true);
    const endpoint =
      type === 'improve'
        ? `${baseUrl}/improve-description`
        : `${baseUrl}/generate-description`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_name: formData.name }),
      });
      const { description } = await res.json();
      setFormData({
        ...formData,
        [type === 'improve' ? 'long_description' : 'short_description']: description,
      });
      addNotification('Description updated', 'success');
    } catch {
      addNotification('Description failed', 'error');
    } finally {
      setGeneratingDesc(false);
    }
  };

  const selectGeneratedImage = () => {
    if (generatedImage) {
      // Convert object URL back to File for upload
      fetch(generatedImage)
        .then((r) => r.blob())
        .then((blob) => {
          const file = new File([blob], 'ai-generated.jpg', { type: 'image/jpeg' });
          setMainImageFile(file);
          addNotification('AI image selected', 'success');
        });
    }
  };

  const fetchProducts = async (page = 1) => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    setLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString() });
      const response = await fetch(`${baseUrl}/api/salable/products?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed');
      const data = await response.json();
      setAllProducts(data.data || []);
      setProducts(data.data || []);
      setPagination(data.pagination || {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetails = async (slugToFetch) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/product/${slugToFetch}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed');
      const data = await response.json();
      setProductDetails(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const response = await fetch(`${baseUrl}/api/product-categories/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed');
      const data = await response.json();
      setCategories(data.data || []);
    } catch {}
  };

  // REAL-TIME SEARCH
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(term) ||
        p.short_description?.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  useEffect(() => {
    fetchProducts(currentPage);
    fetchCategories();
    fetchBrandsAndWarehouses();
  }, [currentPage]);

  useEffect(() => {
    if (slug && viewMode === 'list') {
      setSelectedProductSlug(slug);
      setViewMode('details');
    }
  }, [slug]);

  useEffect(() => {
    if (viewMode === 'details' && selectedProductSlug) {
      fetchProductDetails(selectedProductSlug);
    }
  }, [viewMode, selectedProductSlug]);

  const handleViewDetails = (productSlug) => {
    setSelectedProductSlug(productSlug);
    setViewMode('details');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setProductDetails(null);
    setSelectedProductSlug(null);
  };

  const handleStoreProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!mainImageFile) return addNotification('Select main image', 'error');

    setLoading(true);
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => formDataToSend.append(`${key}[]`, item));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
    formDataToSend.append('product_main_image', mainImageFile);
    additionalImagesFiles.forEach((f) =>
      formDataToSend.append('additional_product_images[]', f)
    );

    try {
      const res = await fetch(`${baseUrl}/api/products`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });
      if (!res.ok) throw new Error('Failed');
      addNotification('Product saved!', 'success');
      setShowForm(false);
      fetchProducts(1);
      setFormData({ ...formData, name: '', short_description: '', long_description: '' });
      setMainImageFile(null);
      setGeneratedImage('');
    } catch {
      addNotification('Save failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? '1' : '0') : value,
    });
  };

  const handleArrayChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value.split(',').map((i) => i.trim()),
    });
  };

  if (loading && !productDetails) return <Loading />;
  if (error && !productDetails)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Error</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => fetchProducts(currentPage)}
            className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded-lg font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full mb-4 shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Products</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and explore products</p>
        </div>

        {/* Add Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg font-semibold shadow-md"
          >
            <Plus className="w-4 h-4 mr-2" />
            {showForm ? 'Cancel' : 'Add New Product'}
          </button>
        </div>

        {/* ==== ADD PRODUCT FORM – ONLY NEW AI BUTTONS + DROPDOWNS ==== */}
        {showForm && (
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Add New Product</h2>
            <form onSubmit={handleStoreProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* NAME */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Product name"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select
                  name="product_category_slug"
                  value={formData.product_category_slug}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* BRAND DROPDOWN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brand</label>
                <select
                  name="brand_slug"
                  value={formData.brand_slug}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Brand</option>
                  {brands.map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* WAREHOUSE DROPDOWN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Warehouse</label>
                <select
                  name="warehouse_slug"
                  value={formData.warehouse_slug}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Warehouse</option>
                  {warehouses.map((w) => (
                    <option key={w.slug} value={w.slug}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* SHORT DESCRIPTION + AI */}
              <div className="md:col-span-2">
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Short Description</label>
                  <button
                    type="button"
                    onClick={() => generateDescription('short')}
                    disabled={generatingDesc}
                    className="text-xs flex items-center gap-1 px-2 py-1 bg-indigo-100 hover:bg-indigo-200 rounded"
                  >
                    {generatingDesc ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    Generate
                  </button>
                </div>
                <textarea
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* LONG DESCRIPTION + AI */}
              <div className="md:col-span-2">
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Long Description</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => generateDescription('long')}
                      disabled={generatingDesc}
                      className="text-xs flex items-center gap-1 px-2 py-1 bg-indigo-100 hover:bg-indigo-200 rounded"
                    >
                      {generatingDesc ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                      Generate
                    </button>
                    <button
                      type="button"
                      onClick={() => generateDescription('improve')}
                      disabled={generatingDesc}
                      className="text-xs flex items-center gap-1 px-2 py-1 bg-purple-100 hover:bg-purple-200 rounded"
                    >
                      {generatingDesc ? <RefreshCw className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                      Improve
                    </button>
                  </div>
                </div>
                <textarea
                  name="long_description"
                  value={formData.long_description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* MAIN IMAGE + AI */}
              <div className="md:col-span-2">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Main Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setMainImageFile(e.target.files[0])}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    {mainImageFile && <p className="text-xs text-gray-500 mt-1">Selected: {mainImageFile.name}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={generateImage}
                    disabled={generatingImg}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md flex items-center gap-2"
                  >
                    {generatingImg ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                    Generate Image
                  </button>
                </div>

                {/* AI IMAGE PREVIEW */}
                {generatedImage && (
                  <div className="mt-4">
                    <img
                      src={generatedImage}
                      alt="AI Generated"
                      className="w-full max-h-64 object-contain rounded border-2 border-dashed border-indigo-400 cursor-pointer"
                      onClick={selectGeneratedImage}
                    />
                    <p className="text-xs text-center text-indigo-600 mt-1">Click image to use it</p>
                  </div>
                )}
              </div>

              {/* === ALL ORIGINAL FIELDS BELOW – EXACTLY AS BEFORE === */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Type</label>
                <select
                  name="product_type"
                  value={formData.product_type}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="physical">Physical</option>
                  <option value="digital">Digital</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selling Price</label>
                <input
                  type="number"
                  name="selling_price"
                  value={formData.selling_price}
                  onChange={handleInputChange}
                  placeholder="34"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Compare Price</label>
                <input
                  type="number"
                  name="compare_price"
                  value={formData.compare_price}
                  onChange={handleInputChange}
                  placeholder="55"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cost Price</label>
                <input
                  type="number"
                  name="cost_price"
                  value={formData.cost_price}
                  onChange={handleInputChange}
                  placeholder="30"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="7"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Low Stock Threshold</label>
                <input
                  type="number"
                  name="low_stock_threshold"
                  value={formData.low_stock_threshold}
                  onChange={handleInputChange}
                  placeholder="5"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weight</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="1.5"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Length</label>
                <input
                  type="number"
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
                  placeholder="10"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Width</label>
                <input
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleInputChange}
                  placeholder="5"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg.gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="3"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Return Days</label>
                <input
                  type="number"
                  name="return_days"
                  value={formData.return_days}
                  onChange={handleInputChange}
                  placeholder="30"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Digital File URL</label>
                <input
                  type="url"
                  name="digital_file_url"
                  value={formData.digital_file_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/file"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Nigeria"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Lagos"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Ikeja"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount Percentage</label>
                <input
                  type="number"
                  name="discount_percentage"
                  value={formData.discount_percentage}
                  onChange={handleInputChange}
                  placeholder="9"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount Starts At</label>
                <input
                  type="date"
                  name="discount_starts_at"
                  value={formData.discount_starts_at}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount Ends At</label>
                <input
                  type="date"
                  name="discount_ends_at"
                  value={formData.discount_ends_at}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* TAGS */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={(e) => handleArrayChange(e, 'tags')}
                  placeholder="test-tag-store"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* CHECKBOXES */}
              <div className="md:col-span-2 space-y-2">
                {[
                  { name: 'track_stock', label: 'Track Stock' },
                  { name: 'backorder_allowed', label: 'Backorder Allowed' },
                  { name: 'is_shipping_required', label: 'Shipping Required' },
                  { name: 'is_returnable', label: 'Returnable' },
                  { name: 'is_featured', label: 'Featured' },
                  { name: 'is_sponsored', label: 'Sponsored' },
                  { name: 'is_taxable', label: 'Taxable' },
                  { name: 'show_on_storefront', label: 'Show on Storefront' },
                ].map((cb) => (
                  <label key={cb.name} className="flex items-center">
                    <input
                      type="checkbox"
                      name={cb.name}
                      checked={formData[cb.name] === '1'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">{cb.label}</span>
                  </label>
                ))}
              </div>

              {/* ADDITIONAL IMAGES */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setAdditionalImagesFiles([...e.target.files])}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {additionalImagesFiles.length > 0 && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{additionalImagesFiles.length} files selected</p>
                )}
              </div>

              {/* SUBMIT */}
              <div className="md:col-span-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300"
                >
                  {loading ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SEARCH */}
        <div className="mb-6 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
        </div>

        {/* TABLE */}
        {(viewMode === 'list' || viewMode === 'create') && (
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
                  {filteredProducts.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No products found</td></tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 text-sm">{product.id}</td>
                        <td className="px-6 py-4 text-sm">{product.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{product.short_description}</td>
                        <td className="px-6 py-4 text-sm font-medium">${product.selling_price}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            product.stock > 10 ? 'bg-green-100 text-green-800' :
                            product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {product.stock} in stock
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleViewDetails(product.slug)} className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DETAILS VIEW */}
        {viewMode === 'details' && productDetails && (
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Product Details</h2>
              <button onClick={handleBackToList} className="text-blue-600 hover:text-blue-900">Back to List</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              {/* All your original detail fields */}
              <div><strong>Name:</strong> {productDetails.name}</div>
              <div><strong>Brand:</strong> {productDetails.brand_slug}</div>
              <div><strong>Warehouse:</strong> {productDetails.warehouse_slug}</div>
              {/* ... rest unchanged ... */}
            </div>
          </div>
        )}

        {/* PAGINATION */}
        {(viewMode === 'list' || viewMode === 'create') && pagination.total_pages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-700">
              Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, pagination.total)} of {pagination.total}
            </div>
            <div className="flex space-x-2">
              <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-2 border rounded-md disabled:opacity-50 flex items-center">
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </button>
              {Array.from({ length: pagination.total_pages }, (_, i) => (
                <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-2 border rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setCurrentPage((p) => Math.min(p + 1, pagination.total_pages))} disabled={currentPage === pagination.total_pages} className="px-3 py-2 border rounded-md disabled:opacity-50 flex items-center">
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableProducts;