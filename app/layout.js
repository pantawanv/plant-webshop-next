import Link from 'next/link'
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">  
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart</Link>
        </nav>

        {children}
      </body>
    </html>
  )
}