import Address from '@/components/modules/cart/Address';
import CartMeals from '@/components/modules/cart/CartMeals';
import PaymentDetails from '@/components/modules/cart/PaymentDetails';

function CartPage() {
  return (
    <div className="bg-gray-100/80">
      <div className="container mx-auto px-3 min-h-screen py-14 grid grid-cols-12 gap-8 ">
        <CartMeals />
        <Address />
        <PaymentDetails />
      </div>
    </div>
  );
}

export default CartPage;
