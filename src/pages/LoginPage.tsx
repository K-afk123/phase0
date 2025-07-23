import { Button, Card, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAppStore } from '../store/appStore';
import { useEffect } from 'react';

const LoginPage = () => {
  const { login, isLoading, error, currentUser } = useAppStore();

  const onFinish = async (values: { username: string; password: string }) => {
    await login(values.username, values.password);
  };

  // ストアのエラー状態を監視し、エラーメッセージを表示
  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  // ログイン成功を監視し、成功メッセージを表示
  useEffect(() => {
    // currentUserがnullでなくなり、ローディングが終わったら成功とみなす
    if (currentUser && !isLoading) {
      message.success('ログインしました');
    }
  }, [currentUser, isLoading]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card title="ログイン" style={{ width: 350 }}>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'ユーザー名を入力してください' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="ユーザー名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'パスワードを入力してください' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="パスワード"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={isLoading}>
              ログイン
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
