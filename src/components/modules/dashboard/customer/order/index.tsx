'use client';

import {
  grandTotalSelector,
  orderSelector,
  selectCartMeals,
  userNameAndEmailSelector,
} from '@/redux/features/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import { createOrder, createPaymentIntent } from '@/services/Payment';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

const OrderForm = () => {
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

  console.log(order);

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
    const card = elements.getElement(CardElement);

    if (card === null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
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
    console.log(paymentIntent);

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
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
      }
    }
  };

  return (
    <div className="px-3 py-8 bg-white rounded">
      <form>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#42770',
                '::placeholder': { color: '#aab7c4' },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        ></CardElement>
        <div className="flex items-center gap-4 mt-8">
          <h3 className="text-base font-semibold sm:text-lg">
            Your service charge will be ${grandTotal}
          </h3>
          <button
            onClick={handleSubmit}
            type="submit"
            className="py-2.5 px-5 mr-2 mb-2 text-md font-medium text-primary focus:outline-none bg-primary/5
          rounded-md transition duration-300 hover:bg-primary/10 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
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
