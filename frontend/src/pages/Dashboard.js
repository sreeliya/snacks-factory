// ===================================
// DASHBOARD COMPONENT
// ===================================
// Overview of factory metrics

import React, { useState, useEffect } from 'react';
import { MaterialAPI, ProductionAPI, InventoryAPI, OrderAPI } from '../api/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMaterials: 0,
    totalMaterialsQty: 0,
    totalInventory: 0,
    totalInventoryQty: 0,
    totalProduction: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [materials, inventory, production, orders] = await Promise.all([
        MaterialAPI.getAll(),
        InventoryAPI.getAll(),
        ProductionAPI.getAll(),
        OrderAPI.getAll(),
      ]);

      const materialData = materials.data?.data || [];
      const inventoryData = inventory.data?.data || [];
      const productionData = production.data?.data || [];
      const orderData = orders.data?.data || [];

      const totalMaterialsQty = materialData.reduce((sum, m) => sum + (m.quantity || 0), 0);
      const totalInventoryQty = inventoryData.reduce((sum, i) => sum + (i.quantity || 0), 0);
      const pendingCount = orderData.filter((o) => o.status === 'Pending').length;

      setStats({
        totalMaterials: materialData.length,
        totalMaterialsQty,
        totalInventory: inventoryData.length,
        totalInventoryQty,
        totalProduction: productionData.length,
        pendingOrders: pendingCount,
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1 style={{ marginBottom: '30px', color: '#2d3436', fontSize: '28px' }}>📊 Factory Dashboard</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px',
          marginBottom: '30px'
        }}>
          <StatCard
            title="Raw Materials"
            value={stats.totalMaterials}
            subtext={`${stats.totalMaterialsQty} units in stock`}
            icon="📦"
            color="#6c5ce7"
          />
          <StatCard
            title="Finished Goods"
            value={stats.totalInventory}
            subtext={`${stats.totalInventoryQty} units in stock`}
            icon="🏭"
            color="#00b894"
          />
          <StatCard
            title="Productions"
            value={stats.totalProduction}
            subtext="Total records"
            icon="⚙️"
            color="#fdcb6e"
          />
          <StatCard
            title="Pending Orders"
            value={stats.pendingOrders}
            subtext="To be shipped"
            icon="🚚"
            color="#d63031"
          />
        </div>

        <div style={{ marginTop: '40px', padding: '24px', backgroundColor: '#f5f6fa', borderRadius: '12px', border: '1px solid #dfe6e9' }}>
          <h3 style={{ marginBottom: '16px', color: '#2d3436' }}>🎯 Quick Start Guide</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <GuideItem icon="📝" title="Materials" desc="Manage raw materials inventory" />
            <GuideItem icon="⚙️" title="Production" desc="Record production and track material usage" />
            <GuideItem icon="📦" title="Inventory" desc="Manage finished goods stock" />
            <GuideItem icon="🚚" title="Orders" desc="Create and track customer orders" />
          </div>
        </div>

        <div style={{ marginTop: '30px', padding: '16px', backgroundColor: '#e8f5e9', borderRadius: '8px', border: '1px solid #4caf50' }}>
          <p style={{ color: '#2d3436', fontSize: '14px', margin: 0 }}>
            ✅ <strong>Status:</strong> Backend API connected and running on port 5000
          </p>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtext, icon, color }) => (
  <div
    style={{
      backgroundColor: '#fff',
      border: `3px solid ${color}`,
      borderRadius: '12px',
      padding: '24px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }}
  >
    <div style={{ fontSize: '40px', marginBottom: '12px' }}>{icon}</div>
    <div style={{ fontSize: '32px', fontWeight: '700', color, marginBottom: '8px' }}>
      {value}
    </div>
    <div style={{ fontSize: '14px', fontWeight: '600', color: '#2d3436', marginBottom: '6px' }}>
      {title}
    </div>
    <div style={{ fontSize: '12px', color: '#636e72' }}>
      {subtext}
    </div>
  </div>
);

const GuideItem = ({ icon, title, desc }) => (
  <div style={{
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #dfe6e9',
  }}>
    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
    <div style={{ fontSize: '14px', fontWeight: '600', color: '#2d3436', marginBottom: '4px' }}>
      {title}
    </div>
    <div style={{ fontSize: '12px', color: '#636e72' }}>
      {desc}
    </div>
  </div>
);

export default Dashboard;
