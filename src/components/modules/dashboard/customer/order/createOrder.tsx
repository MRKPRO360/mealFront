'use client';

import { Button } from '@/components/ui/button';
import {
  clearCart,
  grandTotalSelector,
  orderSelector,
  selectCartMeals,
  userNameAndEmailSelector,
} from '@/redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createOrder, createPaymentIntent } from '@/services/Payment';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const OrderForm = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [success, setSuceess] = useState('');
  const [cardError, setCardError] = useState<string | undefined>('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const userNameAndEmail = useAppSelector(userNameAndEmailSelector);
  const order = useAppSelector(orderSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const cartMeals = useAppSelector(selectCartMeals);

  useEffect(() => {
    const paymentIntent = async () => {
      const { data } = await createPaymentIntent(grandTotal);
      setClientSecret(data);
    };

    paymentIntent();
  }, [grandTotal]);

  const handleSubmit = async function (e: any) {
    e.preventDefault();
    setSuceess('');
    if (!stripe || !elements) return;
    setLoading(true);
    const card = elements.getElement(CardElement);

    if (card === null) return;

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError('');
    }
    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userNameAndEmail.name,
            email: userNameAndEmail.email,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      setLoading(false);
      const payment = {
        grandTotal,
        paymentIntentId: paymentIntent.id,
        email: userNameAndEmail.email,
        mealsId: cartMeals.map((meal) => meal._id).join(', '),
        paymentMethod: 'Card',
        ...order,
      };

      const data = await createOrder(payment);
      if (data?.success) {
        setSuceess('Congrats! Your payment is completed');
        setTransactionId(paymentIntent.id);
        dispatch(clearCart());
      }
    }
  };

  return (
    <div className="px-3 py-8 bg-white rounded-xs">
      <form>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#333',
                '::placeholder': { color: '#888' },
              },
              invalid: { color: '#ff6b6b' },
            },
          }}
        />
        <div className="flex items-center gap-4 mt-8">
          <h3 className="text-base font-semibold sm:text-lg">
            Your service charge will be ${grandTotal}
          </h3>
          <Button
            onClick={handleSubmit}
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            {loading ? (
              <>
                <span>Processing</span>
                <Loader2 className="animate-spin" />
              </>
            ) : (
              'Pay Now'
            )}
          </Button>
        </div>
      </form>
      {cardError && <p className="text-base text-red-500">{cardError}</p>}

      {success && (
        <div>
          <p className="text-green-500">{success}</p>
          <p>
            Your transactionId:{' '}
            <span className="font-bold">{transactionId}</span>{' '}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
