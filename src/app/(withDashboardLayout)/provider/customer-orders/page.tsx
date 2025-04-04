import CustomerOrders from '@/components/modules/dashboard/provider/customer-order';
import { getCustomerOrders } from '@/services/OrderService';

async function CustomerOrdersPage() {
  const { data } = await getCustomerOrders();
  return (
    <div>
      <CustomerOrders orders={data} />
    </div>
  );
}

export default CustomerOrdersPage;
