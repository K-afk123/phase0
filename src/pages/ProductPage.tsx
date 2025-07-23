import { Button, Card, Space, Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MainLayout from '../components/MainLayout';
import { useAppStore } from '../store/appStore';
import type { Product } from '../types';

const ProductPage = () => {
  const products = useAppStore((state) => state.products);

  const columns = [
    {
      title: '品番',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '品名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '単価',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (price: number) => `¥${price.toLocaleString()}`,
    },
    {
        title: '単位',
        dataIndex: 'unit',
        key: 'unit',
    },
    {
      title: 'ステータス',
      key: 'status',
      render: (_: unknown, record: Product) => (
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
        title="商品管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            新規商品を追加
          </Button>
        }
      >
        <Table columns={columns} dataSource={products} rowKey="id" />
      </Card>
    </MainLayout>
  );
};

export default ProductPage;
