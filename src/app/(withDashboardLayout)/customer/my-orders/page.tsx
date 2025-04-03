import MyOrders from '@/components/modules/dashboard/customer/order/myOrder';
import { getMyOrders } from '@/services/OrderService';

async function MyOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const {
    data: { result, meta },
  } = await getMyOrders(page, '2');

  return (
    <div>
      <MyOrders orders={result} meta={meta} />
    </div>
  );
}

export default MyOrderPage;
