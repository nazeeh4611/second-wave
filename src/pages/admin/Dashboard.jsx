// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiEye, 
  FiEyeOff,
  FiGrid,
  FiList,
  FiSearch,
  FiLogOut,
  FiImage
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import baseurl from '../../services/base';

const API_URL = baseurl;

function Dashboard() {
  const navigate = useNavigate();
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/works/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (typeof response.data === 'string' && response.data.includes('<!doctype html>')) {
        console.error('Received HTML instead of JSON');
        toast.error('Server error. Please check backend configuration.');
        setWorks([]);
      } else {
        setWorks(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error('Error fetching works:', error);
      if (error.response?.status === 401) {
        handleLogout();
      } else {
        toast.error('Failed to fetch works');
      }
      setWorks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this work?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/works/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWorks(works.filter(w => w._id !== id));
      toast.success('Work deleted successfully');
    } catch (error) {
      toast.error('Failed to delete work');
    }
  };

  const handleTogglePublish = async (work) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/works/${work._id}`, 
        { isPublished: !work.isPublished },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWorks(works.map(w => 
        w._id === work._id ? { ...w, isPublished: !w.isPublished } : w
      ));
      toast.success(`Work ${work.isPublished ? 'unpublished' : 'published'}`);
    } catch (error) {
      toast.error('Failed to update work');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  const filteredWorks = works.filter(work => {
    const matchesSearch = work.title?.toLowerCase().includes(search.toLowerCase()) ||
                         work.client?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || work.category === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = ['all', ...new Set(works.map(w => w.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading works...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Works Dashboard</h1>
              <p className="text-gray-600">Manage your portfolio works</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
              
              <Link
                to="/admin/works/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <FiPlus />
                <span>New Work</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search works..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900"
            />
          </div>

          <div className="flex items-center gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded ${view === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-600'}`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded ${view === 'list' ? 'bg-gray-900 text-white' : 'text-gray-600'}`}
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredWorks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No works found</p>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorks.map((work) => (
              <motion.div
                key={work._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  {work.featuredImage?.url ? (
                    <img
                      src={work.featuredImage.url}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiImage className="text-4xl text-gray-300" />
                    </div>
                  )}
                  
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleTogglePublish(work)}
                      className={`p-2 rounded-full ${
                        work.isPublished 
                          ? 'bg-green-500 text-white hover:bg-green-600' 
                          : 'bg-gray-500 text-white hover:bg-gray-600'
                      } transition-colors`}
                      title={work.isPublished ? 'Unpublish' : 'Publish'}
                    >
                      {work.isPublished ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{work.title || 'Untitled'}</h3>
                      <p className="text-sm text-gray-600">{work.client || 'No client'}</p>
                    </div>
                    {work.year && (
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                        {work.year}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {work.category ? (
                      <span className="text-xs px-2 py-1 bg-gray-900 text-white rounded-full">
                        {work.category}
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full">
                        No category
                      </span>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/works/${work._id}`}
                        className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(work._id)}
                        className="p-2 text-red-500 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                      {work.slug && (
                        <a
                          href={`/works/${work.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                          title="View"
                        >
                          <FiEye size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Work
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredWorks.map((work) => (
                  <tr key={work._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                          {work.featuredImage?.url ? (
                            <img
                              src={work.featuredImage.url}
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/40x40?text=Error';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FiImage className="text-gray-300" />
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-gray-900">{work.title || 'Untitled'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{work.category || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{work.client || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{work.year || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        work.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {work.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleTogglePublish(work)}
                          className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                          title={work.isPublished ? 'Unpublish' : 'Publish'}
                        >
                          {work.isPublished ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                        </button>
                        <Link
                          to={`/admin/works/${work._id}`}
                          className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(work._id)}
                          className="p-1 text-red-500 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;