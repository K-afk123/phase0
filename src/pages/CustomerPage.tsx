import { Button, Card, Space, Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MainLayout from '../components/MainLayout';
import { useAppStore } from '../store/appStore';
import type { Customer } from '../types';

const CustomerPage = () => {
  const customers = useAppStore((state) => state.customers);

  const columns = [
    {
      title: '顧客名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '敬称',
      dataIndex: 'honorific',
      key: 'honorific',
    },
    {
      title: '住所',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'ステータス',
      key: 'status',
      render: (_: unknown, record: Customer) => (
        <Tag color={record.isArchived ? 'volcano' : 'green'}>
          {record.isArchived ? 'アーカイブ済' : '有効'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>編集</a>
          <a>アーカイブ</a>
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <Card
        title="顧客管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            新規顧客を追加
          </Button>
        }
      >
        <Table columns={columns} dataSource={customers} rowKey="id" />
      </Card>
    </MainLayout>
  );
};

export default CustomerPage;
