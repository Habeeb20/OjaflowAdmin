import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Image, ChevronDown, AlertCircle, Loader2 } from 'lucide-react';
import { useNotification } from '../../utils/NotificationSystem';
import Navbar from '../../components/Navbar.jsx';
import Loading from '../../utils/Loading.jsx';

const AddProductCategory = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parent_id: '',
    icon_url: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      setErrors((prev) => ({ ...prev, icon_url: '' })); // Clear error immediately on select
    }
  };

  const uploadToCloudinary = async (file) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) throw new Error('Image upload failed');
      const data = await response.json();
      return data.secure_url;
    } catch (err) {
      addNotification('Image upload failed. Please try again.', 'error');
      throw err;
    } finally {
      setUploadingImage(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.icon_url && !imageFile) newErrors.icon_url = 'Please upload an icon image';
    if (!formData.parent_id) newErrors.parent_id = 'Please select a parent category';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
console.log(formData, "data going to the backend")
    setIsSubmitting(true);
    try {
      let iconUrl = formData.icon_url;
      if (imageFile) {
        iconUrl = await uploadToCloudinary(imageFile);
        setFormData((prev) => ({ ...prev, icon_url: iconUrl }));
      }

      const token = localStorage.getItem('token');
      if (!token) {
        addNotification('No authentication token found. Please log in.', 'error');
        navigate('/login');
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/product-category/store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          icon_url: iconUrl,
     
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create category');
      }

      addNotification('Product category created successfully!', 'success');
    //   setTimeout(() => navigate('/admin/product-categories'), 1500);
    } catch (error) {
      addNotification(error.message || 'Failed to create category. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) return <Loading />;

  return (
    <>
   
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full mb-4 shadow-lg shadow-blue-500/40 hover:scale-105 transition-transform duration-300">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
              Add Product Category
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create a new category for your products
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter category name (e.g., Laptops)"
                className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                  errors.name ? 'border-red-500 focus:ring-red-500 animate-pulse' : ''
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 dark:text-red-400 flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Enter category description"
                className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                  errors.description ? 'border-red-500 focus:ring-red-500 animate-pulse' : ''
                }`}
              />
              {errors.description && (
                <p className="text-xs text-red-500 dark:text-red-400 flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Parent Category */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Parent Category
              </label>
              <select
                name="parent_id"
                value={formData.parent_id}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                  errors.parent_id ? 'border-red-500 focus:ring-red-500 animate-pulse' : ''
                }`}
              >
                <option value="">Select parent category</option>
                {/* Assuming categories are fetched; replace with real data */}
                <option value="1">Electronics</option>
                <option value="2">Clothing</option>
                <option value="3">Books</option>
                {/* Add more options as needed */}
              </select>
              {errors.parent_id && (
                <p className="text-xs text-red-500 dark:text-red-400 flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.parent_id}
                </p>
              )}
            </div>

            {/* Icon Upload */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category Icon
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600" />
                </div>
              )}
              {uploadingImage && <p className="text-sm text-blue-600 flex items-center"><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Uploading...</p>}
              {errors.icon_url && (
                <p className="text-xs text-red-500 dark:text-red-400 flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.icon_url}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || uploadingImage}
              className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 py-3 text-base font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Category...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Create Category
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
           
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductCategory;