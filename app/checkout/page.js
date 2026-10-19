'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../lib/store';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  async function handlePlaceOrder() {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Something went wrong.');
      }

      dispatch(clearCart());
      setOrderPlaced(true);
    } catch (error) {
      setError(error.message || 'Unable to place your order.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (orderPlaced) {
    return (
      <main className="shop">
        <h1>Thank you for your order! 🌿</h1>

        <p>Your plants will be ready to brighten your home.</p>

        <Link
          href="/shop"
          className="inline-block mt-6 px-4 py-2 rounded-lg bg-green-800 text-white hover:bg-green-700 transition"
        >
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="shop">
      <h1>Checkout 🌱</h1>
      <p className="intro">Review your order before placing it.</p>

      {items.length === 0 ? (
        <div className="mt-6">
          <p>Your cart is empty 🥺</p>

          <Link
            href="/shop"
            className="inline-block mt-4 text-green-800 underline"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 mt-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="plant-card flex flex-col sm:flex-row gap-4 p-4"
              >
                {item.image && (
                  <Link
                    href={`/shop/${item.id}`}
                    className="shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full sm:w-32 h-32 object-cover rounded-lg hover:opacity-80 transition"
                    />
                  </Link>
                )}

                <div className="plant-info flex-1">
                  <h2>{item.name}</h2>
                  <p>Price: {item.price} DKK</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>
                    Subtotal: {item.price * item.quantity} DKK
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold">
              Total: {totalPrice} DKK
            </h2>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <Link
                href="/cart"
                className="px-4 py-2 rounded-lg bg-green-100 text-green-900 border border-green-800"
              >
                Back to cart
              </Link>

              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-green-800 text-white hover:bg-green-700 transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>

                {error && (
                  <p className="text-red-700" role="alert">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
