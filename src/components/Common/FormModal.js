import React from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import './FormModal.css';

const FormModal = ({
  visible,
  title,
  onCancel,
  onSubmit,
  loading,
  initialValues,
  fields,
  isEdit,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async (values) => {
    try {
      await onSubmit(values);
      form.resetFields();
      message.success(isEdit ? 'Updated successfully' : 'Created successfully');
    } catch (error) {
      message.error('Operation failed');
    }
  };

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      footer={null}
      className="form-modal"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={field.rules || []}
          >
            {field.type === 'select' ? (
              <Select
                placeholder={field.placeholder}
                options={field.options}
                disabled={loading}
              />
            ) : field.type === 'textarea' ? (
              <Input.TextArea
                placeholder={field.placeholder}
                rows={4}
                disabled={loading}
              />
            ) : (
              <Input
                type={field.type}
                placeholder={field.placeholder}
                disabled={loading}
              />
            )}
          </Form.Item>
        ))}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormModal;
