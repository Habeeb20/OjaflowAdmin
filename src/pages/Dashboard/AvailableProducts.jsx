// /* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search, ChevronLeft, ChevronRight, AlertCircle, ShoppingCart, Plus, Eye } from 'lucide-react';
import { useNotification } from '../../utils/NotificationSystem.jsx';
import Navbar from '../../components/Navbar.jsx';
import Loading from '../../utils/Loading.jsx';

const AvailableProducts = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'create', 'details'
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [showForm, setShowForm] = useState(false); // For create form
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

  const fetchProducts = async (page = 1, search = '') => {
    const token = localStorage.getItem('token');
    if (!token) {
      addNotification('No authentication token found. Please log in.', 'error');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: page.toString() });
      if (search) params.append('search', search);
      const response = await fetch(`${baseUrl}/api/salable/products?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data.data || []);
      setPagination(data.pagination || { current_page: 1, total_pages: 1, total: 0 });
    } catch (err) {
      setError(err.message);
      addNotification('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetails = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      addNotification('No authentication token found. Please log in.', 'error');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/api/product/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch product details');
      const data = await response.json();
      setProductDetails(data);
      addNotification('Product details loaded successfully', 'success');
    } catch (err) {
      setError(err.message);
      addNotification('Failed to load product details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStoreProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      addNotification('No authentication token found. Please log in.', 'error');
      navigate('/login');
      return;
    }

    if (!mainImageFile) {
      addNotification('Please select a main image.', 'error');
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'meta_keywords' || key === 'tags') {
          formData[key].forEach(item => formDataToSend.append(key + '[]', item));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      formDataToSend.append('product_main_image', mainImageFile);
      additionalImagesFiles.forEach(file => {
        formDataToSend.append('additional_product_images[]', file);
      });

      const response = await fetch(`${baseUrl}/api/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Failed to store product');
      const data = await response.json();
      addNotification('Product stored successfully!', 'success');
      setShowForm(false);
      setFormData({
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
      setMainImageFile(null);
      setAdditionalImagesFiles([]);
      fetchProducts(currentPage, searchTerm); // Refresh list
    } catch (err) {
      addNotification('Failed to store product: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'meta_keywords' || name === 'tags') {
      setFormData({ ...formData, [name]: [...formData[name], value] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e, type) => {
    if (type === 'main') {
      setMainImageFile(e.target.files[0]);
    } else {
      setAdditionalImagesFiles([...e.target.files]);
    }
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    setFormData({ ...formData, [field]: value.split(',').map(item => item.trim()) });
  };

  useEffect(() => {
    fetchProducts(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  useEffect(() => {
    if (viewMode === 'details' && selectedProductId) {
      fetchProductDetails(selectedProductId);
    }
  }, [viewMode, selectedProductId]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (id) => {
    setSelectedProductId(id);
    setViewMode('details');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setProductDetails(null);
    setSelectedProductId(null);
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Error</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => fetchProducts(currentPage, searchTerm)}
            className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 py-2 px-6 rounded-lg font-semibold"
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full mb-4 shadow-lg shadow-blue-500/40">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Products
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and explore products
            </p>
          </div>

          {/* Add New Product Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center justify-center px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 rounded-lg font-semibold shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              {showForm ? 'Cancel' : 'Add New Product'}
            </button>
          </div>

          {/* Add Product Form */}
          {showForm && (
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Add New Product</h2>
              <form onSubmit={handleStoreProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category Slug</label>
                  <input
                    type="text"
                    name="product_category_slug"
                    value={formData.product_category_slug}
                    onChange={handleInputChange}
                    placeholder="electronics-technology"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brand Slug</label>
                  <input
                    type="text"
                    name="brand_slug"
                    value={formData.brand_slug}
                    onChange={handleInputChange}
                    placeholder="another-test-brand-edited-version"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Warehouse Slug</label>
                  <input
                    type="text"
                    name="warehouse_slug"
                    value={formData.warehouse_slug}
                    onChange={handleInputChange}
                    placeholder="lagos-main-warehouse-edited-version"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
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
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Short Description</label>
                  <textarea
                    name="short_description"
                    value={formData.short_description}
                    onChange={handleInputChange}
                    placeholder="test short description"
                    rows={3}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Long Description</label>
                  <textarea
                    name="long_description"
                    value={formData.long_description}
                    onChange={handleInputChange}
                    placeholder="long description for testing purpose"
                    rows={4}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
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
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Main Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'main')}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {mainImageFile && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Selected: {mainImageFile.name}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Images</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, 'additional')}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {additionalImagesFiles.length > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{additionalImagesFiles.length} files selected</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Title</label>
                  <input
                    type="text"
                    name="meta_title"
                    value={formData.meta_title}
                    onChange={handleInputChange}
                    placeholder="shjfbewufje"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Description</label>
                  <input
                    type="text"
                    name="meta_description"
                    value={formData.meta_description}
                    onChange={handleInputChange}
                    placeholder="bfj"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Keywords (comma separated)</label>
                  <input
                    type="text"
                    value={formData.meta_keywords.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'meta_keywords')}
                    placeholder="testme"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
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

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products by name or description..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>
          </form>

          {/* Products Table */}
          {(viewMode === 'list' || viewMode === 'create') && (
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                          No products found
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{product.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{product.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{product.short_description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">${product.selling_price}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              product.stock > 10 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              product.stock > 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {product.stock} in stock
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleViewDetails(product.id)}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3 transition-colors duration-200"
                            >
                              <Eye className="w-4 h-4 inline" />
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

          {/* Product Details View */}
          {viewMode === 'details' && productDetails && (
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Product Details</h2>
                <button
                  onClick={handleBackToList}
                  className="flex items-center text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Back to List
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Name</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{productDetails.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Selling Price</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">${productDetails.selling_price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Stock</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{productDetails.stock}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Category</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{productDetails.product_category_slug}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Short Description</p>
                  <p className="text-gray-900 dark:text-gray-100">{productDetails.short_description}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Long Description</p>
                  <p className="text-gray-900 dark:text-gray-100">{productDetails.long_description}</p>
                </div>
                {/* Add more fields as needed */}
              </div>
            </div>
          )}

          {/* Pagination */}
          {(viewMode === 'list' || viewMode === 'create') && pagination.total_pages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
                <span className="font-medium">{Math.min(currentPage * 10, pagination.total)}</span> of{' '}
                <span className="font-medium">{pagination.total}</span> results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 border text-sm font-medium rounded-md transition-colors duration-200 ${
                      currentPage === page
                        ? 'border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-900/50 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.total_pages}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AvailableProducts;



// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Package, Search, ChevronLeft, ChevronRight, AlertCircle, ShoppingCart, Plus, Eye } from 'lucide-react';
// import { useNotification } from '../../utils/NotificationSystem.jsx';
// import Navbar from '../../components/Navbar.jsx';
// import Loading from '../../utils/Loading.jsx';

// const AvailableProducts = () => {
//   const navigate = useNavigate();
//   const { addNotification } = useNotification();
//   const [products, setProducts] = useState([]);
//   const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1, total: 0 });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewMode, setViewMode] = useState('list'); // 'list', 'create', 'details'
//   const [selectedProductId, setSelectedProductId] = useState(null);
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
//       setProducts(data.data || []);
//       setPagination(data.pagination || { current_page: 1, total_pages: 1, total: 0 });
//     } catch (err) {
//       setError(err.message);
//       addNotification('Failed to load products', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProductDetails = async (id) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       addNotification('No authentication token found. Please log in.', 'error');
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`${baseUrl}/api/product/${id}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) throw new Error('Failed to fetch product details');
//       const data = await response.json();
//       setProductDetails(data);
//       addNotification('Product details loaded successfully', 'success');
//     } catch (err) {
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
//     if (viewMode === 'details' && selectedProductId) {
//       fetchProductDetails(selectedProductId);
//     }
//   }, [viewMode, selectedProductId]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleViewDetails = (id) => {
//     setSelectedProductId(id);
//     setViewMode('details');
//   };

//   const handleBackToList = () => {
//     setViewMode('list');
//     setProductDetails(null);
//     setSelectedProductId(null);
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
//       <Navbar />
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
//                             <button
//                               onClick={() => handleViewDetails(product.id)}
//                               className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3 transition-colors duration-200"
//                             >
//                               <Eye className="w-4 h-4 inline" />
//                             </button>
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