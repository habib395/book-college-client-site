import Footer from '@/components/Footer';
import Navbar from '../components/Navbar';
import { Providers } from './providers';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <AuthProvider>
            <Navbar />
            
            <main className="flex-grow">
              {children}
            </main>
            
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}