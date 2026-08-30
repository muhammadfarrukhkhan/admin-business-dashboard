import React from 'react';
import { Card, Spin } from 'antd';
import {
  LineChart,
  Line,
  // BarChart,
  // Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './Chart.css';

const RevenueChart = ({ data, loading }) => {
  if (loading) {
    return (
      <Card>
        <Spin />
      </Card>
    );
  }

  return (
    <Card className="chart-card" title="Revenue Overview">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
          <XAxis dataKey="month" stroke="#8c8c8c" />
          <YAxis stroke="#8c8c8c" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e8e8e8',
              borderRadius: '6px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#0d6efd"
            strokeWidth={2}
            dot={{ fill: '#0d6efd', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#52c41a"
            strokeWidth={2}
            dot={{ fill: '#52c41a', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#faad14"
            strokeWidth={2}
            dot={{ fill: '#faad14', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RevenueChart;
