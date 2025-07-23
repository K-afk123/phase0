import { Button, Card, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAppStore } from '../store/appStore';

const LoginPage = () => {
  // ZustandストアからloginアクションとisLoading状態を取得
  const { login, isLoading } = useAppStore();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      await login(values.username, values.password);
      message.success('ログインしました');
      // TODO: ログイン後のページにリダイレクト
    } catch (error) {
      // ストア側でエラーが設定されるので、ここでは何もしなくても良い
      // 必要であれば、固有のエラーハンドリングをここに追加
    }
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
