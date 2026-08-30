import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Space, Select
  //, Button
 } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  setSearchTerm,
  setCategory,
  setPagination,
} from '../redux/slices/productsSlice';
import DataTable from '../components/Common/DataTable';
import FormModal from '../components/Common/FormModal';
import './ProductsPage.css';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const { products, loading: tableLoading, pagination, searchTerm, category } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(
      fetchProducts({
        current: pagination.current,
        pageSize: pagination.pageSize,
        search: searchTerm,
        category,
      })
    );
  }, [dispatch, pagination, searchTerm, category]);

  const handleSearch = (value) => {
    dispatch(setSearchTerm(value));
  };

  const handleCategoryChange = (value) => {
    dispatch(setCategory(value));
  };

  const handlePaginationChange = (page, pageSize) => {
    dispatch(
      setPagination({
        current: page,
        pageSize: pageSize,
      })
    );
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setModalVisible(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setModalVisible(true);
  };

  const handleDeleteProduct = (id) => {
    return dispatch(deleteProduct(id));
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (editingProduct) {
        await dispatch(updateProduct({ id: editingProduct.id, data: values }));
      } else {
        await dispatch(createProduct(values));
      }
      setModalVisible(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock) => (
        <span style={{ color: stock > 0 ? '#52c41a' : '#ff4d4f', fontWeight: 600 }}>
          {stock} units
        </span>
      ),
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
          {status.toUpperCase().replace('_', ' ')}
        </span>
      ),
    },
  ];

  const formFields = [
    {
      name: 'name',
      label: 'Product Name',
      type: 'text',
      placeholder: 'Enter product name',
      rules: [{ required: true, message: 'Product name is required' }],
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      placeholder: 'Select category',
      options: [
        { label: 'Electronics', value: 'Electronics' },
        { label: 'Accessories', value: 'Accessories' },
        { label: 'Software', value: 'Software' },
        { label: 'Services', value: 'Services' },
      ],
      rules: [{ required: true, message: 'Category is required' }],
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      placeholder: 'Enter price',
      rules: [
        { required: true, message: 'Price is required' },
        { type: 'number', min: 0, message: 'Price must be positive' },
      ],
    },
    {
      name: 'stock',
      label: 'Stock Quantity',
      type: 'number',
      placeholder: 'Enter stock quantity',
      rules: [
        { required: true, message: 'Stock quantity is required' },
        { type: 'number', min: 0, message: 'Stock must be positive' },
      ],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      placeholder: 'Select status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Out of Stock', value: 'out_of_stock' },
        { label: 'Discontinued', value: 'discontinued' },
      ],
      rules: [{ required: true, message: 'Status is required' }],
    },
  ];

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Products Management</h1>
        <Space>
          <Input.Search
            placeholder="Search products..."
            prefix={<SearchOutlined />}
            onSearch={handleSearch}
            allowClear
            style={{ width: 250 }}
          />
          <Select
            placeholder="Filter by category"
            allowClear
            onChange={handleCategoryChange}
            style={{ width: 200 }}
            options={[
              { label: 'Electronics', value: 'Electronics' },
              { label: 'Accessories', value: 'Accessories' },
              { label: 'Software', value: 'Software' },
            ]}
          />
        </Space>
      </div>

      <DataTable
        columns={columns}
        data={products}
        loading={tableLoading}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onAdd={handleAddProduct}
        title="Products List"
      />

      <FormModal
        visible={modalVisible}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        onCancel={() => {
          setModalVisible(false);
          setEditingProduct(null);
        }}
        onSubmit={handleSubmit}
        loading={loading}
        initialValues={editingProduct}
        fields={formFields}
        isEdit={!!editingProduct}
      />
    </div>
  );
};

export default ProductsPage;
