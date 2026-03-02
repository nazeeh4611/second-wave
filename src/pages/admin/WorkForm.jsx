import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiSave, FiArrowLeft, FiUpload, FiLink, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import baseurl from '../../services/base';

const API_URL = baseurl;

const categories = [
  { value: 'branding', label: 'Branding' },
  { value: 'seo', label: 'SEO' },
  { value: 'web', label: 'Web Development' },
  { value: 'performance', label: 'Performance Marketing' },
  { value: 'social', label: 'Social Media' },
  { value: 'creative', label: 'Creative' },
  { value: 'production', label: 'Production' },
  { value: 'pr', label: 'Digital PR' }
];

function WorkForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(id && id !== 'new');
  
  // Image states with previews
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
  const [reelThumbnail, setReelThumbnail] = useState(null);
  const [reelThumbnailPreview, setReelThumbnailPreview] = useState(null);
  const [hasReel, setHasReel] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    client: '',
    year: new Date().getFullYear().toString(),
    description: '',
    results: '',
    tags: '',
    reelType: 'reel',
    reelUrl: '',
    isPublished: true
  });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchWork();
    } else {
      setFetchLoading(false);
    }
  }, [id]);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      if (featuredImagePreview && !featuredImagePreview.startsWith('http')) {
        URL.revokeObjectURL(featuredImagePreview);
      }
      if (reelThumbnailPreview && !reelThumbnailPreview.startsWith('http')) {
        URL.revokeObjectURL(reelThumbnailPreview);
      }
    };
  }, [featuredImagePreview, reelThumbnailPreview]);

  const fetchWork = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching work with ID:', id);
      
      const response = await axios.get(`${API_URL}/works/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Fetched work data:', response.data);
      const work = response.data;
      
      setFormData({
        title: work.title || '',
        category: work.category || '',
        client: work.client || '',
        year: work.year || new Date().getFullYear().toString(),
        description: work.description || '',
        results: work.results ? work.results.join(', ') : '',
        tags: work.tags ? work.tags.join(', ') : '',
        reelType: work.instagramReel?.type || 'reel',
        reelUrl: work.instagramReel?.url || '',
        isPublished: work.isPublished !== false
      });
      
      setHasReel(!!work.instagramReel);
      
      // Set featured image preview if exists
      if (work.featuredImage?.url) {
        setFeaturedImagePreview(work.featuredImage.url);
      }
      
      // Set reel thumbnail preview if exists
      if (work.instagramReel?.thumbnail?.url) {
        setReelThumbnailPreview(work.instagramReel.thumbnail.url);
      }
    } catch (error) {
      console.error('Error fetching work:', error);
      toast.error('Failed to fetch work');
      navigate('/admin/dashboard');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Featured image selected:', file);
      setFeaturedImage(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setFeaturedImagePreview(previewUrl);
    }
  };

  const handleReelThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Reel thumbnail selected:', file);
      setReelThumbnail(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setReelThumbnailPreview(previewUrl);
    }
  };

  const removeFeaturedImage = () => {
    setFeaturedImage(null);
    if (featuredImagePreview && !featuredImagePreview.startsWith('http')) {
      URL.revokeObjectURL(featuredImagePreview);
    }
    setFeaturedImagePreview(null);
  };

  const removeReelThumbnail = () => {
    setReelThumbnail(null);
    if (reelThumbnailPreview && !reelThumbnailPreview.startsWith('http')) {
      URL.revokeObjectURL(reelThumbnailPreview);
    }
    setReelThumbnailPreview(null);
  };

  const validateToken = async (token) => {
    try {
      await axios.get(`${API_URL}/auth/me`, {  // ✅ CORRECT endpoint
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login again');
        navigate('/admin/login');
        return;
      }
  
      const isValid = await validateToken(token);
      if (!isValid) {
        toast.error('Session expired. Please login again');
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        navigate('/admin/login');
        return;
      }
  
      const formDataToSend = new FormData();
  
      Object.keys(formData).forEach(key => {
        if (key === 'results' || key === 'tags') {
          const value = formData[key].split(',').map(item => item.trim()).filter(item => item);
          formDataToSend.append(key, JSON.stringify(value));
        } else if (key === 'isPublished') {
          formDataToSend.append(key, formData[key] ? 'true' : 'false');
        } else if (formData[key] !== undefined && formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });
  
      if (featuredImage) {
        formDataToSend.append('featuredImage', featuredImage);
      }
      
      formDataToSend.append('hasReel', hasReel ? 'true' : 'false');
      
      if (hasReel && reelThumbnail) {
        formDataToSend.append('thumbnail', reelThumbnail);
      }
  
      if (id && id !== 'new') {
        await axios.put(`${API_URL}/works/${id}`, formDataToSend, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Work updated successfully');
      } else {
        await axios.post(`${API_URL}/works`, formDataToSend, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Work created successfully');
      }
      
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
      
    } catch (error) {
      console.error('Error saving work:', error);
      
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again');
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        navigate('/admin/login');
      } else if (error.response?.status === 413) {
        toast.error('File too large. Maximum size is 5MB');
      } else {
        toast.error(error.response?.data?.message || 'Failed to save work');
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading work...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                type="button"
              >
                <FiArrowLeft className="text-gray-900" size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {id && id !== 'new' ? 'Edit Work' : 'Create New Work'}
                </h1>
                <p className="text-gray-600">
                  {id && id !== 'new' ? 'Update your work details' : 'Add a new project to your portfolio'}
                </p>
              </div>
            </div>
            
            <button
              type="submit"
              form="work-form"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSave size={18} />
              <span>{loading ? 'Saving...' : 'Save Work'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <form id="work-form" onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 text-gray-900 bg-white"
                  placeholder="Enter work title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 text-gray-900 bg-white"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 text-gray-900 bg-white"
                  placeholder="Enter client name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 text-gray-900 bg-white"
                  placeholder="e.g., 2024"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 text-gray-900 bg-white"
                placeholder="Describe the work and its objectives..."
              />
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Featured Image</h2>
            
            <div className="space-y-4">
              {featuredImagePreview ? (
                <div className="relative">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={featuredImagePreview}
                      alt="Featured preview"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        console.error('Image failed to load:', featuredImagePreview);
                        e.target.src = 'https://via.placeholder.com/800x600?text=Image+Error';
                      }}
                    />
                    <button
                      type="button"
                      onClick={removeFeaturedImage}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {featuredImage?.name || 'Existing image'}
                  </p>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    id="featuredImage"
                    accept="image/*"
                    onChange={handleFeaturedImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="featuredImage"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <FiUpload className="text-4xl text-gray-400 mb-3" />
                    <span className="text-sm font-medium text-gray-700 mb-1">
                      Click to upload featured image
                    </span>
                    <span className="text-xs text-gray-400">
                      Recommended size: 1200x1200px (Max 5MB)
                    </span>
                  </label>
                </div>
              )}
            </div>
          </motion.div>

          {/* Instagram Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Instagram Reel/Post</h2>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasReel}
                  onChange={(e) => setHasReel(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <span className="text-sm text-gray-700">Add Instagram content</span>
              </label>
            </div>

            {hasReel && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content Type
                    </label>
                    <select
                      name="reelType"
                      value={formData.reelType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 text-gray-900 bg-white"
                    >
                      <option value="reel">Reel</option>
                      <option value="post">Post</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram URL
                    </label>
                    <div className="relative">
                      <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="url"
                        name="reelUrl"
                        value={formData.reelUrl}
                        onChange={handleChange}
                        placeholder="https://www.instagram.com/p/..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 text-gray-900 bg-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thumbnail Image
                  </label>
                  
                  {reelThumbnailPreview ? (
                    <div className="relative inline-block">
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <img
                          src={reelThumbnailPreview}
                          alt="Thumbnail preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error('Thumbnail failed to load:', reelThumbnailPreview);
                            e.target.src = 'https://via.placeholder.com/200x200?text=Error';
                          }}
                        />
                        <button
                          type="button"
                          onClick={removeReelThumbnail}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <FiX size={12} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        id="reelThumbnail"
                        accept="image/*"
                        onChange={handleReelThumbnailChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="reelThumbnail"
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <FiUpload size={16} />
                        <span>Choose thumbnail</span>
                      </label>
                      <span className="text-sm text-gray-400">
                        Recommended: 1080x1920px for Reels
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Results & Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Results & Tags</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Results
                </label>
                <input
                  type="text"
                  name="results"
                  value={formData.results}
                  onChange={handleChange}
                  placeholder="e.g., 300% increase in sales, 50k new followers, #1 ranking"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 text-gray-900 bg-white placeholder-gray-400"
                />
                <p className="text-xs text-gray-400 mt-1">Separate multiple results with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g., Branding, SEO, Web Design"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 text-gray-900 bg-white placeholder-gray-400"
                />
                <p className="text-xs text-gray-400 mt-1">Separate tags with commas</p>
              </div>
            </div>
          </motion.div>

          {/* Publish Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <div>
                <span className="font-medium text-gray-900">Publish immediately</span>
                <p className="text-sm text-gray-600">
                  Uncheck to save as draft. Published works will be visible on the public portfolio.
                </p>
              </div>
            </label>
          </motion.div>
        </div>
      </form>
    </div>
  );
}

export default WorkForm;