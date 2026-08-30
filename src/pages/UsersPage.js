import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Space
  // , Button 
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  setSearchTerm,
  setPagination,
} from '../redux/slices/usersSlice';
import DataTable from '../components/Common/DataTable';
import FormModal from '../components/Common/FormModal';
import './UsersPage.css';

const UsersPage = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const { users, loading: tableLoading, pagination, searchTerm } = useSelector(
    (state) => state.users
  );

  // Fetch users on component mount and when filters change
  useEffect(() => {
    dispatch(
      fetchUsers({
        current: pagination.current,
        pageSize: pagination.pageSize,
        search: searchTerm,
      })
    );
  }, [dispatch, pagination, searchTerm]);

  const handleSearch = (value) => {
    dispatch(setSearchTerm(value));
  };

  const handlePaginationChange = (page, pageSize) => {
    dispatch(
      setPagination({
        current: page,
        pageSize: pageSize,
      })
    );
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setModalVisible(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setModalVisible(true);
  };

  const handleDeleteUser = (id) => {
    return dispatch(deleteUser(id));
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (editingUser) {
        await dispatch(updateUser({ id: editingUser.id, data: values }));
      } else {
        await dispatch(createUser(values));
      }
      setModalVisible(false);
      setEditingUser(null);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span
          style={{
            color: status === 'active' ? '#52c41a' : '#ff4d4f',
            fontWeight: 600,
          }}
        >
          {status.toUpperCase()}
        </span>
      ),
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
    },
  ];

  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter full name',
      rules: [{ required: true, message: 'Name is required' }],
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email address',
      rules: [
        { required: true, message: 'Email is required' },
        { type: 'email', message: 'Invalid email' },
      ],
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      placeholder: 'Select role',
      options: [
        { label: 'Admin', value: 'Admin' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Editor', value: 'Editor' },
        { label: 'User', value: 'User' },
      ],
      rules: [{ required: true, message: 'Role is required' }],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      placeholder: 'Select status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      rules: [{ required: true, message: 'Status is required' }],
    },
  ];

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>Users Management</h1>
        <Space>
          <Input.Search
            placeholder="Search users..."
            prefix={<SearchOutlined />}
            onSearch={handleSearch}
            allowClear
            style={{ width: 250 }}
          />
        </Space>
      </div>

      <DataTable
        columns={columns}
        data={users}
        loading={tableLoading}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onAdd={handleAddUser}
        title="Users List"
      />

      <FormModal
        visible={modalVisible}
        title={editingUser ? 'Edit User' : 'Add New User'}
        onCancel={() => {
          setModalVisible(false);
          setEditingUser(null);
        }}
        onSubmit={handleSubmit}
        loading={loading}
        initialValues={editingUser}
        fields={formFields}
        isEdit={!!editingUser}
      />
    </div>
  );
};

export default UsersPage;
