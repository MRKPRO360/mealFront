'use client';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  revalidateOrders,
  updateCustomerOrdersStatus,
} from '@/services/OrderService';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function UpdateOrder({ orderId }: { orderId: string }) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleChangeStatus = async (value: 'Completed' | 'Cancelled') => {
    try {
      // Update order status
      const res = await updateCustomerOrdersStatus(orderId, value);

      if (res.success) {
        toast.success('Order status updated successfully!');
        await revalidateOrders();
      } else {
        toast.error(res.message || 'Something went very wrong!');
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to update order status!');
    }
  };
  return (
    <div
      style={{
        width: 'calc(100% - 20px)',
      }}
      className="sm:max-w-[480px] lg:max-w-[800px] mx-auto bg-white/80 py-8 px-2 border mt-14 mb-4"
    >
      <h1 className="text-center text-xl md:text-2xl text-thin mb-8">
        Update Order
      </h1>
      <strong>Status:</strong>{' '}
      <Select
        onValueChange={(value) =>
          handleChangeStatus(value as 'Completed' | 'Cancelled')
        }
      >
        <SelectTrigger className=" bg-white  border-gray-300 rounded-xs">
          <SelectValue placeholder="Pending" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Completed">Completed</SelectItem>
          <SelectItem value="Cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleBack} className="mt-3" size="sm">
        Go Back
      </Button>
    </div>
  );
}

export default UpdateOrder;
