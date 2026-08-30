import React from 'react';
import { Layout, Avatar, Dropdown, Space,
  //  Button 
  } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import './Header.css';

const { Header: AntHeader } = Layout;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login', { replace: true });
  };

  const menuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      disabled: true,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <AntHeader className="app-header">
      <div className="header-content">
        <div className="header-title">
          <h1>Welcome Back!</h1>
        </div>
        <div className="header-user">
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <div style={{ cursor: 'pointer' }}>
              <Space>
                <div className="user-info">
                  <p className="user-name">{user?.name || 'User'}</p>
                  <p className="user-role">{user?.role || 'Admin'}</p>
                </div>
                <Avatar
                  size={40}
                  icon={<UserOutlined />}
                  src={user?.avatar}
                />
              </Space>
            </div>
          </Dropdown>
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;
