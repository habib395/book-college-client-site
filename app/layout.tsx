
import Footer from '@/components/Footer';
import Navbar from '../components/Navbar';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { Providers } from './providers';
import { AuthProvider } from '@/context/AuthContext';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        >
         
          <Providers>
          <AuthProvider>
          <Navbar></Navbar>
        {children}
        <Footer></Footer>
        </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
