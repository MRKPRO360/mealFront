import UpdateOrder from '@/components/modules/dashboard/provider/customer-order/update-order';

async function SingleOrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  return (
    <div>
      <UpdateOrder orderId={orderId} />
    </div>
  );
}

export default SingleOrderPage;
