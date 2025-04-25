export const dynamic = 'force-dynamic';
import CustomerOrders from '@/components/modules/dashboard/provider/customer-order';
import { getCustomerOrders } from '@/services/OrderService';

async function CustomerOrdersPage() {
  const { data } = await getCustomerOrders();
  return <CustomerOrders orders={data} />;
}

export default CustomerOrdersPage;
