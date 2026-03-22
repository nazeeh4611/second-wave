import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff,
  FiX, FiSave, FiArrowLeft, FiSearch, FiLogOut,
  FiBriefcase, FiMapPin, FiClock
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import baseurl from '../../services/base';

const API_URL = baseurl;
const ACCENT = '#4F8EF7';

const DEPARTMENTS = ['Design', 'Marketing', 'Development', 'Strategy', 'Sales', 'Operations', 'Content', 'Video Production'];
const JOB_TYPES = ['Full-time', 'Part-time', 'Internship', 'Freelance', 'Contract'];
const LOCATIONS = ['Kochi, Kerala', 'Remote', 'Hybrid - Kochi', 'Thrissur', 'Bangalore'];

const EMPTY_FORM = {
  title: '', department: '', location: '', type: '', experience: '',
  salary: '', overview: '', responsibilities: '', requirements: '',
  niceToHave: '', perks: '', isPublished: true, isNew: true,
};

function parseLines(str) {
  if (!str) return [];
  return str.split('\n').map(s => s.trim()).filter(Boolean);
}

function linesToStr(arr) {
  if (!arr || !arr.length) return '';
  return arr.join('\n');
}

function JobModal({ job, onClose, onSaved }) {
  const [formData, setFormData] = useState(job ? {
    title: job.title || '',
    department: job.department || '',
    location: job.location || '',
    type: job.type || '',
    experience: job.experience || '',
    salary: job.salary || '',
    overview: job.overview || '',
    responsibilities: linesToStr(job.responsibilities),
    requirements: linesToStr(job.requirements),
    niceToHave: linesToStr(job.niceToHave),
    perks: linesToStr(job.perks),
    isPublished: job.isPublished !== false,
    isNew: job.isNew !== false,
  } : { ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (window.lenis) {
      lenisRef.current = window.lenis;
      window.lenis.destroy();
      window.lenis = null;
    }
    document.body.style.overflow = 'hidden';

    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);

      if (lenisRef.current) {
        const Lenis = lenisRef.current.constructor;
        const newLenis = new Lenis({
          duration: 1.6,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        });
        window.lenis = newLenis;
        function raf(time) {
          newLenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    };
  }, []);

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...formData,
        responsibilities: parseLines(formData.responsibilities),
        requirements: parseLines(formData.requirements),
        niceToHave: parseLines(formData.niceToHave),
        perks: parseLines(formData.perks),
      };
      if (job?._id) {
        await axios.put(`${API_URL}/careers/${job._id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
        toast.success('Role updated');
      } else {
        await axios.post(`${API_URL}/careers`, payload, { headers: { Authorization: `Bearer ${token}` } });
        toast.success('Role created');
      }
      onSaved();
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error('Session expired');
        localStorage.removeItem('token');
      } else {
        toast.error(err.response?.data?.message || 'Failed to save');
      }
    } finally {
      setSaving(false);
    }
  };

  const inp = 'w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 text-gray-900 bg-white text-sm';
  const lbl = 'block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide';

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        onMouseDown={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          width: '100%',
          maxWidth: 720,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '1px solid #f0f0f0',
          background: '#fff',
        }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#111' }}>{job ? 'Edit Role' : 'New Opening'}</div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{job ? 'Update this job listing' : 'Add a new career opportunity'}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 18px', borderRadius: 8, border: 'none',
                background: saving ? '#93c5fd' : ACCENT,
                color: '#fff', fontSize: 14, fontWeight: 600,
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              <FiSave size={15} /> {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: 8, borderRadius: 8, border: 'none',
                background: 'transparent', cursor: 'pointer', color: '#9ca3af',
              }}
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <form onSubmit={handleSubmit} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 40 }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className={lbl}>Job Title <span style={{ color: '#f87171' }}>*</span></label>
                <input name="title" value={formData.title} onChange={handle} required className={inp} placeholder="e.g. Senior Brand Designer" />
              </div>
              <div>
                <label className={lbl}>Department</label>
                <select name="department" value={formData.department} onChange={handle} className={inp}>
                  <option value="">Select department</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Location</label>
                <select name="location" value={formData.location} onChange={handle} className={inp}>
                  <option value="">Select location</option>
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Job Type</label>
                <select name="type" value={formData.type} onChange={handle} className={inp}>
                  <option value="">Select type</option>
                  {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Experience</label>
                <input name="experience" value={formData.experience} onChange={handle} className={inp} placeholder="e.g. 2–4 years" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className={lbl}>Salary / Range</label>
                <input name="salary" value={formData.salary} onChange={handle} className={inp} placeholder="e.g. ₹4–6 LPA" />
              </div>
            </div>

            <div>
              <label className={lbl}>Role Overview <span style={{ color: '#f87171' }}>*</span></label>
              <textarea name="overview" value={formData.overview} onChange={handle} required rows={3}
                className={inp} style={{ resize: 'none' }}
                placeholder="Brief summary of the role and what the person will do..." />
            </div>

            {[
              { name: 'responsibilities', label: "What You'll Do — Responsibilities", rows: 5, ph: 'Manage social media accounts\nCreate monthly content calendars\nAnalyze campaign performance' },
              { name: 'requirements', label: 'Requirements', rows: 5, ph: '2+ years of relevant experience\nStrong portfolio\nExcellent communication skills' },
              { name: 'niceToHave', label: 'Nice to Have (optional)', rows: 3, ph: 'Experience with Figma\nKnowledge of Arabic markets' },
              { name: 'perks', label: 'Perks & Benefits (optional)', rows: 3, ph: 'Flexible working hours\nMacBook provided\nMonthly team outings' },
            ].map(f => (
              <div key={f.name}>
                <label className={lbl}>{f.label}</label>
                <textarea
                  name={f.name}
                  value={formData[f.name]}
                  onChange={handle}
                  rows={f.rows}
                  placeholder={f.ph}
                  className={inp}
                  style={{ resize: 'vertical', fontFamily: 'ui-monospace, monospace', fontSize: 12, lineHeight: 1.65 }}
                />
                <p style={{ fontSize: 10, color: '#9ca3af', marginTop: 4 }}>One item per line</p>
              </div>
            ))}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 4 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handle}
                  style={{ marginTop: 2, width: 16, height: 16, accentColor: ACCENT }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1f2937' }}>Publish listing</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>Visible on the public Careers page</div>
                </div>
              </label>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                <input type="checkbox" name="isNew" checked={formData.isNew} onChange={handle}
                  style={{ marginTop: 2, width: 16, height: 16, accentColor: ACCENT }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1f2937' }}>Mark as New</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>Shows "New" badge on the listing</div>
                </div>
              </label>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
}

function CareersAdmin() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editJob, setEditJob] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchJobs = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const r = await axios.get(`${API_URL}/careers/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(Array.isArray(r.data) ? r.data : []);
    } catch (err) {
      if (err.response?.status === 401) handleLogout();
      else toast.error('Failed to load jobs');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/admin/login');
    toast.success('Logged out');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job listing?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/careers/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setJobs(j => j.filter(x => x._id !== id));
      toast.success('Deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const handleToggle = async (job) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/careers/${job._id}`, { isPublished: !job.isPublished }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(j => j.map(x => x._id === job._id ? { ...x, isPublished: !x.isPublished } : x));
      toast.success(job.isPublished ? 'Unpublished' : 'Published');
    } catch { toast.error('Failed to update'); }
  };

  const openNew = () => { setEditJob(null); setShowForm(true); };
  const openEdit = (job) => { setEditJob(job); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditJob(null); };
  const onSaved = () => { closeForm(); fetchJobs(); };

  const filtered = jobs.filter(j =>
    j.title?.toLowerCase().includes(search.toLowerCase()) ||
    j.department?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence>
        {showForm && <JobModal job={editJob} onClose={closeForm} onSaved={onSaved} />}
      </AnimatePresence>

      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FiArrowLeft size={18} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Careers Admin</h1>
                <p className="text-xs text-gray-400">Manage job openings · {jobs.length} total</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-2 text-gray-500 hover:text-gray-900 text-sm transition-colors">
                <FiLogOut size={15} /> Logout
              </button>
              <button onClick={openNew}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: ACCENT }}>
                <FiPlus size={16} /> New Opening
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input type="text" placeholder="Search roles…" value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-gray-900" />
          </div>
          <span className="text-sm text-gray-400 flex-shrink-0">
            {filtered.length} listing{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <FiBriefcase size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 text-sm mb-4">No job listings yet</p>
            <button onClick={openNew}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-all"
              style={{ background: ACCENT }}>
              <FiPlus size={15} /> Add First Opening
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(job => (
              <motion.div key={job._id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 px-5 py-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${job.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {job.isPublished ? 'Published' : 'Draft'}
                      </span>
                      {job.isNew && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                          style={{ background: `${ACCENT}15`, color: ACCENT }}>New</span>
                      )}
                      {job.department && (
                        <span className="text-[10px] text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full">{job.department}</span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 text-base leading-tight">{job.title || 'Untitled'}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                      {job.location && <span className="flex items-center gap-1 text-gray-400 text-xs"><FiMapPin size={11} /> {job.location}</span>}
                      {job.type && <span className="flex items-center gap-1 text-gray-400 text-xs"><FiClock size={11} /> {job.type}</span>}
                      {job.experience && <span className="flex items-center gap-1 text-gray-400 text-xs"><FiBriefcase size={11} /> {job.experience}</span>}
                      {job.salary && <span className="text-gray-500 text-xs font-semibold">{job.salary}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => handleToggle(job)}
                      className={`p-2 rounded-lg transition-colors ${job.isPublished ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                      title={job.isPublished ? 'Unpublish' : 'Publish'}>
                      {job.isPublished ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                    </button>
                    <button onClick={() => openEdit(job)} className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors" title="Edit">
                      <FiEdit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(job._id)} className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors" title="Delete">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CareersAdmin;