import { Button, Card, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const LoginPage = () => {
  const onFinish = (values: unknown) => {
    console.log('Received values of form: ', values);
    // ここに実際のログイン処理を後で追加します
  };

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
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              ログイン
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
