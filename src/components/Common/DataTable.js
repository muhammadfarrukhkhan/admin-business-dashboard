import React from 'react';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './DataTable.css';

const DataTable = ({
  columns,
  data,
  loading,
  pagination,
  onPaginationChange,
  onEdit,
  onDelete,
  onAdd,
  title,
}) => {
  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      message.success('Item deleted successfully');
    } catch (error) {
      message.error('Failed to delete item');
    }
  };

  const actionColumn = {
    title: 'Actions',
    key: 'actions',
    width: 150,
    fixed: 'right',
    render: (_, record) => (
      <Space>
        <Button
          type="primary"
          size="small"
          icon={<EditOutlined />}
          onClick={() => onEdit(record)}
        >
          Edit
        </Button>
        <Popconfirm
          title="Delete"
          description="Are you sure to delete this item?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger size="small" icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    ),
  };

  const tableColumns = [...columns, actionColumn];

  return (
    <div className="data-table">
      <div className="table-header">
        <h2>{title}</h2>
        {onAdd && (
          <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
            Add New
          </Button>
        )}
      </div>
      <Table
        columns={tableColumns}
        dataSource={data}
        loading={loading}
        pagination={{
          ...pagination,
          onChange: onPaginationChange,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50'],
        }}
        scroll={{ x: 1200 }}
        rowKey="id"
      />
    </div>
  );
};

export default DataTable;
