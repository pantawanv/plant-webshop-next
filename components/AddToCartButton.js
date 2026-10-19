
'use client';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../lib/store';

export default function AddToCartButton({ plant }) {
  const dispatch = useDispatch();

  const isInCart = useSelector((state) =>
    state.cart.items.some((item) => item.id === plant.id)
  );

  function handleAddToCart(event) {
    event.preventDefault();
    event.stopPropagation();

    if (isInCart) return;

    dispatch(
      addToCart({
        id: plant.id,
        name: plant.common_name,
        image: plant.default_image?.regular_url,
        price: 79,
      })
    );
  }

  function handleRemoveFromCart(event) {
    event.preventDefault();
    event.stopPropagation();

    dispatch(removeFromCart(plant.id));
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isInCart}
        className={`px-4 py-2 rounded-lg transition ${
          isInCart
            ? 'bg-green-200 text-green-900 cursor-not-allowed'
            : 'bg-green-800 text-white hover:bg-green-700'
        }`}
      >
        {isInCart ? 'Added to Cart ✓' : 'Add to Cart'}
      </button>

      {isInCart && (
        <button
          type="button"
          onClick={handleRemoveFromCart}
          className="px-4 py-2 rounded-lg border border-red-600 text-red-700 hover:bg-red-50 transition"
        >
          Remove
        </button>
      )}
    </div>
  );
}
