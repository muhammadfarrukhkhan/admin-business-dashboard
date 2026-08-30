import React from 'react';
import { Form, Input, Button, Card, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';
import './LoginPage.css';

const LoginPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (values) => {
    try {
      const result = await dispatch(login(values));
      if (result.meta.requestStatus === 'fulfilled' && result.payload?.token) {
        navigate('/', { replace: true });
      }
    } catch (err) {
      message.error('Login failed');
    }
  };

  return (
    <div className="login-page">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={22} sm={20} md={12} lg={8} xl={6}>
          <Card className="login-card">
            <div className="login-header">
              <h1>Admin Dashboard</h1>
              <p>Sign in to your account</p>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Email is required' },
                  { type: 'email', message: 'Invalid email' },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  // placeholder="Enter your email"
                  placeholder="admin@example.com"
                  size="large"
                  disabled={loading}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Password is required' },
                  { min: 6, message: 'Password must be at least 6 characters' },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  // placeholder="Enter your password"
                  placeholder="password123"
                  size="large"
                  disabled={loading}
                />
              </Form.Item>

              {error && <div className="error-message">{error}</div>}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  size="large"
                >
                  Sign In
                </Button>
              </Form.Item>

              {/* <div className="login-footer">
                <p>Demo credentials:</p>
                <p>Email: <strong>admin@example.com</strong></p>
                <p>Password: <strong>password123</strong></p>
              </div> */}
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
