import Link from 'next/link'
import './globals.css';
import ReduxProvider from '../components/ReduxProvider';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">  
      <body>
        <ReduxProvider>
          <Navbar />
        {children}
        </ReduxProvider>
      </body>
    </html>
  )
}