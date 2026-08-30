import React, { useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats, fetchChartData } from '../redux/slices/dashboardSlice';
import StatCard from '../components/Dashboard/StatCard';
import RevenueChart from '../components/Dashboard/RevenueChart';
import './DashboardPage.css';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { stats, chartData, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchChartData());
  }, [dispatch]);

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Revenue"
            value={stats?.totalRevenue}
            trend={stats?.totalRevenueTrend}
            icon="revenue"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Users"
            value={stats?.totalUsers}
            trend={stats?.totalUsersTrend}
            icon="users"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Orders"
            value={stats?.totalOrders}
            trend={stats?.totalOrdersTrend}
            icon="orders"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Conversion Rate"
            value={stats?.conversionRate}
            trend={stats?.conversionRateTrend}
            icon="conversion"
            suffix="%"
          />
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <RevenueChart data={chartData} loading={loading} />
        </Col>
      </Row>

      {/* Additional Charts could go here */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <div className="chart-placeholder">
            {loading ? (
              <Spin />
            ) : (
              <h3>Top Products</h3>
            )}
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="chart-placeholder">
            {loading ? (
              <Spin />
            ) : (
              <h3>Recent Activities</h3>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
