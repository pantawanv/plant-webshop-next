
'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const items = useSelector((state) => state.cart.items);

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <Link href="/cart">
            Cart ({totalQuantity})
          </Link>
        </div>
      </div>
    </nav>
  );
}
