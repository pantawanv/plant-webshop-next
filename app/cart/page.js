'use client';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart, 
} from '../../lib/store';

export default function CartPage() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);

    const totalQuantity = items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
    <main className="shop">
      <h1>Your Shopping Cart 🌱</h1>

      {items.length === 0 ? (
        <div>
          <p>Your cart is empty 🥺</p>
          <Link href="/shop" className="text-green-800 underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <p>Total items: {totalQuantity}</p>

          <div className="flex flex-col gap-4 mt-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="plant-card flex flex-col sm:flex-row gap-4 p-4"
              >
                {item.image && (
  <Link
    href={`/shop/${item.id}`}
    className="block shrink-0"
    aria-label={`View details for ${item.name}`}
  >
    <img
      src={item.image}
      alt={item.name}
      className="w-full sm:w-32 h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
    />
  </Link>
)}

                <div className="plant-info flex-1">
                  <h2>{item.name}</h2>
                  <p>Price: {item.price} DKK</p>
                  <p>
                    Subtotal: {item.price * item.quantity} DKK
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity(item.id))
                      }
                      disabled={item.quantity === 1}
                      className="px-3 py-1 rounded bg-green-100 disabled:opacity-40"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        dispatch(increaseQuantity(item.id))
                      }
                      className="px-3 py-1 rounded bg-green-100"
                    >
                      +
                    </button>

                    <button
                      onClick={() =>
                        dispatch(removeFromCart(item.id))
                      }
                      className="text-red-700 underline ml-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold">
              Total: {totalPrice} DKK
            </h2>

           
<div className="flex flex-wrap items-center justify-between gap-4 mt-4">
  <div className="flex flex-wrap items-center gap-4">
    <button
      onClick={() => dispatch(clearCart())}
      className="px-4 py-2 rounded-lg border border-red-800 text-red-800"
    >
      Clear cart
    </button>

    <Link
      href="/shop"
      className="px-4 py-2 rounded-lg bg-green-100 text-green-900 border border-green-800"
    >
      Continue shopping
    </Link>
  </div>

  <Link
    href="/checkout"
    className="px-4 py-2 rounded-lg bg-green-800 text-white"
  >
    Go to checkout
  </Link>
</div>

          </div>
        </>
      )}
    </main>
    );
}