import { Button, Card, Descriptions, List } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import MainLayout from '../components/MainLayout';
import { useAppStore } from '../store/appStore';
import type { BankAccount } from '../types';

const CompanyPage = () => {
  // 現状は単一の発行元を想定し、ストアの最初の要素を取得します
  const companyProfile = useAppStore((state) => state.companyProfiles[0]);

  if (!companyProfile) {
    return (
      <MainLayout>
        <Card title="発行元管理">
          <p>発行元情報が登録されていません。</p>
          <Button type="primary">新規登録</Button>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Card
        title="発行元管理"
        extra={
          <Button type="primary" icon={<EditOutlined />}>
            編集
          </Button>
        }
      >
        <Descriptions bordered column={1} title="会社情報">
          <Descriptions.Item label="会社名">{companyProfile.name}</Descriptions.Item>
          <Descriptions.Item label="郵便番号">{companyProfile.zipCode}</Descriptions.Item>
          <Descriptions.Item label="住所">{companyProfile.address}</Descriptions.Item>
          <Descriptions.Item label="電話番号">{companyProfile.phone || '未登録'}</Descriptions.Item>
        </Descriptions>
        
        <List
          header={<div style={{fontWeight: 'bold', marginTop: '20px'}}>銀行口座</div>}
          bordered
          dataSource={companyProfile.bankAccounts}
          renderItem={(item: BankAccount) => (
            <List.Item>
              {item.bankName} {item.branchName} ({item.accountType}) {item.accountNumber}
            </List.Item>
          )}
          style={{ marginTop: '20px' }}
        />
      </Card>
    </MainLayout>
  );
};

export default CompanyPage;
