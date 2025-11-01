// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Search, ChevronLeft, ChevronRight, AlertCircle, Tag, Star, Folder } from 'lucide-react';
// import { useNotification } from '../../utils/NotificationSystem';
// import Navbar from '../../components/Navbar.jsx';
// import Loading from '../../utils/Loading.jsx';

// const ProductCategories = () => {
//   const navigate = useNavigate();
//   const { addNotification } = useNotification();
//   const [categories, setCategories] = useState([]);
//   const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1, total: 0 });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewMode, setViewMode] = useState('list'); // 'list', 'popular', 'search', 'details', 'sub'
//   const [selectedSlug, setSelectedSlug] = useState('');
//   const [selectedId, setSelectedId] = useState('');
//   const [details, setDetails] = useState(null);
//   const [subCategories, setSubCategories] = useState([]);

//   const baseUrl = import.meta.env.VITE_BACKEND_URL;

//   const fetchCategories = async (page = 1, search = '', mode = 'list') => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       addNotification('No authentication token found. Please log in.', 'error');
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       let url = `${baseUrl}/api/product-categories`;
//       const params = new URLSearchParams({ page: page.toString() });

//       if (mode === 'search' && search) {
//         url = `${baseUrl}/api/product-categories/search?${params.toString()}&term=${search}`;
//       } else if (mode === 'popular') {
//         url = `${baseUrl}/api/product-categories/popular?${params.toString()}`;
//       }

//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error('Failed to fetch categories');
//       const data = await response.json();
//       console.log(data)
//       setCategories(data.data?.data || []);
//       setPagination(data.pagination || { current_page: 1, total_pages: 1, total: 0 });
//     } catch (err) {
//       setError(err.message);
//       addNotification('Failed to load categories', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategoryDetails = async (slug) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       addNotification('No authentication token found. Please log in.', 'error');
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`${baseUrl}/api/product-categories/details/${slug}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error('Failed to fetch category details');
//       const data = await response.json();
//       setDetails(data);
//       addNotification('Category details loaded successfully', 'success');
//     } catch (err) {
//       setError(err.message);
//       addNotification('Failed to load category details', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSubCategories = async (id) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       addNotification('No authentication token found. Please log in.', 'error');
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`${baseUrl}/api/product-categories/children/${id}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error('Failed to fetch sub-categories');
//       const data = await response.json();
//       setSubCategories(data.data || []);
//       addNotification('Sub-categories loaded successfully', 'success');
//     } catch (err) {
//       setError(err.message);
//       addNotification('Failed to load sub-categories', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (viewMode === 'list' || viewMode === 'popular' || (viewMode === 'search' && searchTerm)) {
//       fetchCategories(currentPage, searchTerm, viewMode);
//     }
//   }, [currentPage, searchTerm, viewMode]);

//   useEffect(() => {
//     if (viewMode === 'details' && selectedSlug) {
//       fetchCategoryDetails(selectedSlug);
//     }
//   }, [viewMode, selectedSlug]);

//   useEffect(() => {
//     if (viewMode === 'sub' && selectedId) {
//       fetchSubCategories(selectedId);
//     }
//   }, [viewMode, selectedId]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setViewMode('search');
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleViewDetails = (slug) => {
//     setSelectedSlug(slug);
//     setViewMode('details');
//   };

//   const handleViewSubCategories = (id) => {
//     setSelectedId(id);
//     setViewMode('sub');
//   };

//   const handleBackToList = () => {
//     setViewMode('list');
//     setDetails(null);
//     setSubCategories([]);
//     setSelectedSlug('');
//     setSelectedId('');
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
//             onClick={() => window.location.reload()}
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
//               <Tag className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
//               Product Categories
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               Manage and explore product categories
//             </p>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-wrap justify-center gap-4 mb-6">
//             <button
//               onClick={() => { setViewMode('list'); setDetails(null); setSubCategories([]); }}
//               className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
//                 viewMode === 'list' 
//                   ? 'bg-blue-500 text-white shadow-lg' 
//                   : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
//               }`}
//             >
//               <Folder className="w-4 h-4 inline mr-2" />
//               All Categories
//             </button>
//             <button
//               onClick={() => { setViewMode('popular'); setDetails(null); setSubCategories([]); }}
//               className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
//                 viewMode === 'popular' 
//                   ? 'bg-yellow-500 text-white shadow-lg' 
//                   : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
//               }`}
//             >
//               <Star className="w-4 h-4 inline mr-2" />
//               Popular Categories
//             </button>
//           </div>

//           {/* Search Bar */}
//           {(viewMode === 'list' || viewMode === 'search') && (
//             <form onSubmit={handleSearch} className="mb-6 max-w-md mx-auto">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search categories by name..."
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                 />
//               </div>
//             </form>
//           )}

//           {/* Categories Table */}
//           {(viewMode === 'list' || viewMode === 'popular' || viewMode === 'search') && (
//             <>
//               <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl overflow-hidden mb-6">
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                     <thead className="bg-gray-50 dark:bg-gray-800">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
//                       {categories.length === 0 ? (
//                         <tr>
//                           <td colSpan={4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
//                             No categories found
//                           </td>
//                         </tr>
//                       ) : (
//                         categories?.map((category) => (
//                           <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{category.id}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{category.name}</td>
//                             <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{category.description}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                               <button
//                                 onClick={() => handleViewDetails(category.slug)}
//                                 className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3 transition-colors duration-200"
//                               >
//                                 Details
//                               </button>
//                               <button
//                                 onClick={() => handleViewSubCategories(category.id)}
//                                 className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200"
//                               >
//                                 Sub-Categories
//                               </button>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Pagination */}
//               {pagination.total_pages > 1 && (
//                 <div className="flex items-center justify-between">
//                   <div className="text-sm text-gray-700 dark:text-gray-300">
//                     Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
//                     <span className="font-medium">{Math.min(currentPage * 10, pagination.total)}</span> of{' '}
//                     <span className="font-medium">{pagination.total}</span> results
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
//                     >
//                       <ChevronLeft className="w-4 h-4 mr-1" />
//                       Previous
//                     </button>
//                     {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((page) => (
//                       <button
//                         key={page}
//                         onClick={() => handlePageChange(page)}
//                         className={`px-3 py-2 border text-sm font-medium rounded-md transition-colors duration-200 ${
//                           currentPage === page
//                             ? 'border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-900/50 dark:text-blue-300'
//                             : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === pagination.total_pages}
//                       className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
//                     >
//                       Next
//                       <ChevronRight className="w-4 h-4 ml-1" />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}

//           {/* Details View */}
//           {viewMode === 'details' && details && (
//             <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Category Details</h2>
//                 <button
//                   onClick={handleBackToList}
//                   className="flex items-center text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
//                 >
//                   <ChevronLeft className="w-4 h-4 mr-1" />
//                   Back to List
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Name</p>
//                   <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{details.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Slug</p>
//                   <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{details.slug}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Description</p>
//                   <p className="text-gray-900 dark:text-gray-100">{details.description}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Product image</p>
//                   <img 
//                   src={details.icon_url }
//                   className="text-lg font-semibold rounded-lg h-40 text-gray-900 dark:text-gray-100" />
//                 </div>
//                 {/* Add more fields based on API response */}
//               </div>
//             </div>
//           )}

//           {/* Sub-Categories View */}
//           {viewMode === 'sub' && subCategories.length > 0 && (
//             <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl overflow-hidden">
//               <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800">
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Sub-Categories</h2>
//                 <button
//                   onClick={handleBackToList}
//                   className="flex items-center text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
//                 >
//                   <ChevronLeft className="w-4 h-4 mr-1" />
//                   Back to List
//                 </button>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                   <thead className="bg-gray-50 dark:bg-gray-800">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
//                     {subCategories.map((sub) => (
//                       <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{sub.id}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{sub.name}</td>
//                         <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{sub.description}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductCategories;




/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, AlertCircle, Tag, Star, Folder, ArrowLeft } from 'lucide-react';
import { useNotification } from '../../utils/NotificationSystem';
import Loading from '../../utils/Loading.jsx';

const ProductCategories = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'popular', 'search', 'details', 'sub'
  const [selectedSlug, setSelectedSlug] = useState('');
  const [details, setDetails] = useState(null);

  // Breadcrumb & Hierarchy
  const [breadcrumb, setBreadcrumb] = useState([]); // [{ id, name, slug }]
  const [currentSubCategories, setCurrentSubCategories] = useState([]);
  const [currentParentId, setCurrentParentId] = useState(null);

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchCategories = async (page = 1, search = '', mode = 'list') => {
    const token = localStorage.getItem('token');
    if (!token) {
      addNotification('No authentication token found. Please log in.', 'error');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      let url = `${baseUrl}/api/product-categories`;
      const params = new URLSearchParams({ page: page.toString() });

      if (mode === 'search' && search) {
        url = `${baseUrl}/api/product-categories/search?${params.toString()}&term=${search}`;
      } else if (mode === 'popular') {
        url = `${baseUrl}/api/product-categories/popular?${params.toString()}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data.data?.data || []);
      setPagination(data.pagination || { current_page: 1, total_pages: 1, total: 0 });
    } catch (err) {
      setError(err.message);
      addNotification('Failed to load categories', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryDetails = async (slug) => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/api/product-categories/details/${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch category details');
      const data = await response.json();
      setDetails(data);
      addNotification('Category details loaded', 'success');
    } catch (err) {
      setError(err.message);
      addNotification('Failed to load category details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubCategories = async (id, name, slug) => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/api/product-categories/children/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch sub-categories');
      const data = await response.json();
      setCurrentSubCategories(data.data || []);
      setCurrentParentId(id);

      // Update breadcrumb
      setBreadcrumb(prev => [...prev, { id, name, slug }]);
      setViewMode('sub');
      addNotification(`Sub-categories of "${name}" loaded`, 'success');
    } catch (err) {
      setError(err.message);
      addNotification('Failed to load sub-categories', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Go back in hierarchy
  const goBack = () => {
    const newBreadcrumb = [...breadcrumb];
    newBreadcrumb.pop();
    setBreadcrumb(newBreadcrumb);

    if (newBreadcrumb.length === 0) {
      setViewMode('list');
      setCurrentSubCategories([]);
      setCurrentParentId(null);
    } else {
      const parent = newBreadcrumb[newBreadcrumb.length - 1];
      fetchSubCategories(parent.id, parent.name, parent.slug);
    }
  };

  useEffect(() => {
    if (viewMode === 'list' || viewMode === 'popular' || (viewMode === 'search' && searchTerm)) {
      fetchCategories(currentPage, searchTerm, viewMode);
    }
  }, [currentPage, searchTerm, viewMode]);

  useEffect(() => {
    if (viewMode === 'details' && selectedSlug) {
      fetchCategoryDetails(selectedSlug);
    }
  }, [viewMode, selectedSlug]);

  const handleSearch = (e) => {
    e.preventDefault();
    setViewMode('search');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (slug) => {
    setSelectedSlug(slug);
    setViewMode('details');
  };

  const handleViewSubCategories = (id, name, slug) => {
    fetchSubCategories(id, name, slug);
  };

  const handleBackToList = () => {
    setViewMode('list');
    setDetails(null);
    setCurrentSubCategories([]);
    setCurrentParentId(null);
    setBreadcrumb([]);
    setSelectedSlug('');
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
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded-lg font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full mb-4 shadow-lg">
            <Tag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Product Categories</h1>
          <p className="text-gray-600 dark:text-gray-400">Explore categories and sub-categories</p>
        </div>

        {/* Action Buttons */}
        {(viewMode === 'list' || viewMode === 'popular' || viewMode === 'search') && (
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={handleBackToList}
              className={`px-4 py-2 rounded-md font-semibold transition-all ${
                viewMode === 'list' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Folder className="w-4 h-4 inline mr-2" />
              All Categories
            </button>
            <button
              onClick={() => { setViewMode('popular'); setBreadcrumb([]); }}
              className={`px-4 py-2 rounded-md font-semibold transition-all ${
                viewMode === 'popular' 
                  ? 'bg-yellow-500 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Star className="w-4 h-4 inline mr-2" />
              Popular
            </button>
          </div>
        )}

        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <div className="mb-4 flex items-center text-sm">
            <button
              onClick={handleBackToList}
              className="text-blue-600 hover:underline flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Home
            </button>
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.id} className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
                <button
                  onClick={() => {
                    setBreadcrumb(breadcrumb.slice(0, i + 1));
                    fetchSubCategories(crumb.id, crumb.name, crumb.slug);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  {crumb.name}
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Search Bar */}
        {(viewMode === 'list' || viewMode === 'search') && (
          <form onSubmit={handleSearch} className="mb-6 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search categories..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </form>
        )}

        {/* Main List View */}
        {(viewMode === 'list' || viewMode === 'popular' || viewMode === 'search') && (
          <>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-bl  rounded-lg shadow-xl overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
                    {categories.length === 0 ? (
                      <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-500">No categories found</td></tr>
                    ) : (
                      categories.map((category) => (
                        <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 text-sm">{category.id}</td>
                          <td className="px-6 py-4 text-sm font-medium">{category.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{category.description}</td>
                          <td className="px-6 py-4 text-sm">
                            <button
                              onClick={() => handleViewDetails(category.slug)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => handleViewSubCategories(category.id, category.name, category.slug)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Sub-Categories →
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {pagination.total_pages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-700">
                  Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, pagination.total)} of {pagination.total}
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-2 border rounded-md disabled:opacity-50 flex items-center">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                  </button>
                  {Array.from({ length: pagination.total_pages }, (_, i) => (
                    <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={`px-3 py-2 border rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}>
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pagination.total_pages} className="px-3 py-2 border rounded-md disabled:opacity-50 flex items-center">
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Sub-Categories View (Recursive) */}
        {viewMode === 'sub' && (
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl overflow-hidden">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                Sub-Categories
                {breadcrumb.length > 0 && (
                  <span className="text-lg font-normal text-gray-600 dark:text-gray-400 ml-2">
                    → {breadcrumb[breadcrumb.length - 1].name}
                  </span>
                )}
              </h2>
              <button
                onClick={goBack}
                className="flex items-center text-blue-600 hover:text-blue-900"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </button>
            </div>

            {currentSubCategories.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                No sub-categories found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
                    {currentSubCategories.map((sub) => (
                      <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 text-sm">{sub.id}</td>
                        <td className="px-6 py-4 text-sm font-medium">{sub.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{sub.description || '—'}</td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => handleViewDetails(sub.slug)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Details
                          </button>
                          {sub.has_children && (
                            <button
                              onClick={() => handleViewSubCategories(sub.id, sub.name, sub.slug)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Sub-Categories →
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Category Details */}
        {viewMode === 'details' && details && (
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Category Details</h2>
              <button onClick={handleBackToList} className="text-blue-600 hover:text-blue-900 flex items-center">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div><strong>Name:</strong> {details.name}</div>
              <div><strong>Slug:</strong> {details.slug}</div>
              <div className="md:col-span-2"><strong>Description:</strong> {details.description || '—'}</div>
              {details.icon_url && (
                <div className="md:col-span-2">
                  <strong>Image:</strong>
                  <img src={details.icon_url} alt={details.name} className="mt-2 w-48 h-48 object-cover rounded-lg shadow" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategories;