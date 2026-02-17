import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus, FiStar, FiX } from 'react-icons/fi';

function Admin() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingWork, setEditingWork] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Branding',
    description: '',
    link: '',
    featured: false,
    image: null
  });

  useEffect(() => {
    fetchWorks();
    gsap.fromTo('.admin-section',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }, []);

  const fetchWorks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/works');
      setWorks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching works:', error);
      toast.error('Failed to fetch works');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('link', formData.link);
    data.append('featured', formData.featured);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editingWork) {
        await axios.put(`http://localhost:5000/api/works/${editingWork._id}`, data);
        toast.success('Work updated successfully');
      } else {
        await axios.post(`http://localhost:5000/api/works`, data);
        toast.success('Work added successfully');
      }
      
      setShowForm(false);
      setEditingWork(null);
      setFormData({
        title: '',
        category: 'Branding',
        description: '',
        link: '',
        featured: false,
        image: null
      });
      fetchWorks();
    } catch (error) {
      console.error('Error saving work:', error);
      toast.error('Failed to save work');
    }
  };

  const handleEdit = (work) => {
    setEditingWork(work);
    setFormData({
      title: work.title,
      category: work.category,
      description: work.description,
      link: work.link,
      featured: work.featured,
      image: null
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this work?')) {
      try {
        await axios.delete(`http://localhost:5000/api/works/${id}`);
        toast.success('Work deleted successfully');
        fetchWorks();
      } catch (error) {
        console.error('Error deleting work:', error);
        toast.error('Failed to delete work');
      }
    }
  };

  const toggleFeatured = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/works/${id}/featured`);
      fetchWorks();
      toast.success('Featured status updated');
    } catch (error) {
      console.error('Error toggling featured:', error);
      toast.error('Failed to update featured status');
    }
  };

  const categories = [
    'Branding', 'SEO', 'Website Development', 'Performance Marketing', 
    'Social Media Marketing', 'Creative', 'Production', 'Digital PR'
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold">
            Admin <span className="gradient-text">Panel</span>
          </h1>
          
          <button
            onClick={() => {
              setEditingWork(null);
              setFormData({
                title: '',
                category: 'Branding',
                description: '',
                link: '',
                featured: false,
                image: null
              });
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-6 py-3 gradient-bg rounded-full font-semibold hover-glow"
          >
            <FiPlus /> Add New Work
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl glass-morphism rounded-2xl p-8">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-2xl text-white/50 hover:text-white"
              >
                <FiX />
              </button>

              <h2 className="text-2xl font-bold mb-6">
                {editingWork ? 'Edit Work' : 'Add New Work'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#9945FF]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#9945FF]"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-[#0A0A0A]">{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#9945FF]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Link (optional)</label>
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#9945FF]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-5 h-5"
                  />
                  <label className="text-sm font-medium">Feature this work</label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#9945FF]"
                    required={!editingWork}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 gradient-bg rounded-full font-semibold"
                  >
                    {editingWork ? 'Update Work' : 'Create Work'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 bg-white/10 rounded-full font-semibold hover:bg-white/20"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Works List */}
        <div className="admin-section">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-16 h-16 border-4 border-[#9945FF] border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {works.map((work) => (
                <div key={work._id} className="glass-morphism rounded-2xl overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 h-48 md:h-auto">
                      <img
                        src={work.imageUrl}
                        alt={work.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{work.title}</h3>
                          <p className="text-[#14F195] text-sm mb-2">{work.category}</p>
                          {work.featured && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                              <FiStar /> Featured
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleFeatured(work._id)}
                            className={`p-2 rounded-lg transition ${
                              work.featured 
                                ? 'bg-yellow-500/20 text-yellow-300' 
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                          >
                            <FiStar />
                          </button>
                          <button
                            onClick={() => handleEdit(work)}
                            className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(work._id)}
                            className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-4">{work.description}</p>
                      
                      {work.link && work.link !== '#' && (
                        <a
                          href={work.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#9945FF] text-sm hover:underline"
                        >
                          View Project →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;