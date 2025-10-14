
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, AlertCircle, Tag, Plus, Edit, Trash2, X } from 'lucide-react';
import { useNotification } from '../../utils/NotificationSystem.jsx';
import Navbar from '../../components/Navbar.jsx';
import Loading from '../../utils/Loading.jsx';
import { toast } from 'sonner';

const TagsList = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [tags, setTags] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [editingTag, setEditingTag] = useState(null);

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchTags = async (page = 1, search = '') => {
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
      const response = await fetch(`${baseUrl}/api/tags?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch tags');
      const data = await response.json();
      setTags(data.data || []);
      setPagination(data.pagination || { current_page: 1, total_pages: 1, total: 0 });
    } catch (err) {
      setError(err.message);
      addNotification('Failed to load tags', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStoreTag = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      addNotification('No authentication token found. Please log in.', 'error');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to create tag');
      const data = await response.json();
      setTags([data, ...tags]);
      setShowForm(false);
      setFormData({ name: '' });
      addNotification('Tag created successfully!', 'success');
    } catch (err) {
      addNotification('Failed to create tag: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      addNotification('No authentication token found. Please log in.', 'error');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/tags/update/${editingTag.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update tag');
      const data = await response.json();
      setTags(tags.map(t => t.slug === editingTag.slug ? data : t));
      setEditMode(false);
      setEditingTag(null);
      addNotification('Tag updated successfully!', 'success');
    } catch (err) {
      addNotification('Failed to update tag: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (!window.confirm('Are you sure you want to delete this tag?')) return;
    const token = localStorage.getItem('token');
    if (!token) {
      addNotification('No authentication token found. Please log in.', 'error');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/tags/delete/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: formData.name }),
      });
      if (!response.ok) throw new Error('Failed to delete tag');
      setTags(tags.filter(t => t.slug !== slug));
      addNotification('Tag deleted successfully!', 'success');
    } catch (err) {
      addNotification('Failed to delete tag: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleShow = (tag) => {
    setSelectedTag(tag);
    setShowModal(true);
  };

  const handleEdit = (tag) => {
    setEditingTag(tag);
    setFormData({ name: tag.name });
    setEditMode(true);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchTags(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
            onClick={() => fetchTags(currentPage, searchTerm)}
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
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full mb-4 shadow-lg shadow-blue-500/40">
              <Tag className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Tags
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and explore tags
            </p>
          </div>

          {/* Add New Tag Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditMode(false);
                setEditingTag(null);
                setFormData({ name: '' });
              }}
              className="flex items-center justify-center px-6 py-2 bg-primary-500 text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary-400 transition-all duration-300 rounded-lg font-semibold shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              {showForm ? 'Cancel' : 'Add New Tag'}
            </button>
          </div>

          {/* Add/Edit Tag Form */}
          {(showForm || editMode) && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                {editMode ? 'Edit Tag' : 'Add New Tag'}
              </h3>
              <form onSubmit={editMode ? handleUpdate : handleStoreTag} className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tag name"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-400 bg-white dark:bg-gray-700"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditMode(false);
                      setEditingTag(null);
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : (editMode ? 'Update Tag' : 'Save Tag')}
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
                placeholder="Search tags by name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </form>

          {/* Tags Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {tags.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                        No tags found
                      </td>
                    </tr>
                  ) : (
                    tags.map((tag) => (
                      <tr key={tag.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{tag.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{tag.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleShow(tag)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3 transition-colors duration-200"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(tag)}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-3 transition-colors duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(tag.slug)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal for Tag Details */}
          {showModal && selectedTag && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Tag Details</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <p className="text-gray-900 dark:text-gray-100">{selectedTag.name}</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Pagination */}
          {pagination.total_pages > 1 && (
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
                        ? 'border-primary-500 bg-primary-50 text-primary-600 dark:border-primary-400 dark:bg-primary-900/50 dark:text-primary-300'
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

export default TagsList;
