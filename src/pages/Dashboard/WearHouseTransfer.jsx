/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNotification } from '../../utils/NotificationSystem.jsx';
import Navbar from '../../components/Navbar.jsx';
import Loading from '../../utils/Loading.jsx';
import { toast } from 'sonner';
import {ShoppingBag, Plus} from "lucide-react"

const WarehouseTransfers = () => {
  const { addNotification } = useNotification();
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    from_warehouse_id: '',
    to_warehouse_id: '',
    notes: '',
    items: [
      { product_id: '', quantity_requested: '', notes: '' }
    ],
  });

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch transfers list
  const fetchTransfers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      addNotification('No authentication token found. Please log in.', 'error');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/api/warehouse-transfers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch transfers');
      const data = await response.json();
      setTransfers(data.data || []);
    } catch (err) {
      setError(err.message);
      addNotification('Failed to load transfers', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Store new transfer
  const handleStoreTransfer = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      addNotification('No authentication token found. Please log in.', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/warehouse-transfers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to create transfer');
      const data = await response.json();
      addNotification('Transfer created successfully!', 'success');
      setShowForm(false);
      setFormData({
        from_warehouse_id: '',
        to_warehouse_id: '',
        notes: '',
        items: [{ product_id: '', quantity_requested: '', notes: '' }],
      });
      fetchTransfers(); // Refresh list
    } catch (err) {
      addNotification('Failed to create transfer: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Add item to transfer
  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product_id: '', quantity_requested: '', notes: '' }],
    });
  };

  // Remove item
  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  // Update item
  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Error</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchTransfers}
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full mb-4 shadow-lg shadow-blue-500/40">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Warehouse Transfers
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage stock transfers between warehouses
            </p>
          </div>

          {/* Create Transfer Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center justify-center px-6 py-2 bg-primary-500 text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary-400 transition-all duration-300 rounded-lg font-semibold shadow-md"
            >
              {showForm ? 'Cancel' : 'Create New Transfer'}
            </button>
          </div>

          {/* Create Transfer Form */}
          {showForm && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">New Warehouse Transfer</h3>
              <form onSubmit={handleStoreTransfer} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From Warehouse</label>
                    <select
                      value={formData.from_warehouse_id}
                      onChange={(e) => setFormData({ ...formData, from_warehouse_id: e.target.value })}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-400 bg-white dark:bg-gray-700"
                      required
                    >
                      <option value="">Select From Warehouse</option>
                      <option value="1">Lagos Main Warehouse</option>
                      <option value="2">Abuja Branch</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To Warehouse</label>
                    <select
                      value={formData.to_warehouse_id}
                      onChange={(e) => setFormData({ ...formData, to_warehouse_id: e.target.value })}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-400 bg-white dark:bg-gray-700"
                      required
                    >
                      <option value="">Select To Warehouse</option>
                      <option value="2">Abuja Branch</option>
                      <option value="1">Lagos Main Warehouse</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Transfer notes..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-400 bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Items to Transfer</h4>
                  {formData.items.map((item, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          type="number"
                          placeholder="Product ID"
                          value={item.product_id}
                          onChange={(e) => updateItem(index, 'product_id', e.target.value)}
                          className="p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-400 bg-white dark:bg-gray-600"
                          required
                        />
                        <input
                          type="number"
                          placeholder="Quantity"
                          value={item.quantity_requested}
                          onChange={(e) => updateItem(index, 'quantity_requested', e.target.value)}
                          className="p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-400 bg-white dark:bg-gray-600"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Item Notes"
                          value={item.notes}
                          onChange={(e) => updateItem(index, 'notes', e.target.value)}
                          className="p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-400 bg-white dark:bg-gray-600"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="mt-2 text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove Item
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm mt-2"
                  >
                    <Plus size={16} /> Add Item
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 text-white p-3 rounded-lg font-bold hover:bg-primary-700 disabled:opacity-50"
                >
                  {loading ? 'Creating Transfer...' : 'Create Transfer'}
                </button>
              </form>
            </div>
          )}

          {/* Transfers List Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Recent Transfers</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">From</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">To</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {transfers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                        No transfers found
                      </td>
                    </tr>
                  ) : (
                    transfers.map((transfer) => (
                      <tr key={transfer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{transfer.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{transfer.from_warehouse}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{transfer.to_warehouse}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{transfer.items.length}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            transfer.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            transfer.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {transfer.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{transfer.created_at}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WarehouseTransfers;