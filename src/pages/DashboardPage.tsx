import { Card, Descriptions, Typography } from 'antd';
import { useAppStore } from '../store/appStore';
import MainLayout from '../components/MainLayout';

const DashboardPage = () => {
  const { currentUser } = useAppStore();

  return (
    <MainLayout>
      <Card title="ダッシュボード">
        <Typography.Title level={4}>ようこそ、{currentUser?.username}さん</Typography.Title>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ユーザーID">{currentUser?.id}</Descriptions.Item>
          <Descriptions.Item label="役割ID">{currentUser?.roleId}</Descriptions.Item>
        </Descriptions>
      </Card>
    </MainLayout>
  );
};

export default DashboardPage;
