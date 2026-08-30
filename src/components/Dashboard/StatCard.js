import React from 'react';
import { Card,
  //  Row, Col,
    Statistic } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  PercentageOutlined,
} from '@ant-design/icons';
import './StatCard.css';

const iconMap = {
  revenue: <DollarOutlined />,
  users: <UserOutlined />,
  orders: <ShoppingCartOutlined />,
  conversion: <PercentageOutlined />,
};

const StatCard = ({ title, value, trend, icon, suffix = '' }) => {
  const isPositive = trend >= 0;

  return (
    <Card className="stat-card" hoverable>
      <div className="stat-card-inner">
        <div className="stat-card-main">
          <div className="stat-card-icon">{iconMap[icon]}</div>
          <Statistic
            title={title}
            value={value}
            suffix={suffix}
          />
        </div>
        <div className={`trend-badge ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
