import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'NaveedArts - Handmade Oil & Acrylic Paintings',
  description: 'Premium handmade oil and acrylic paintings from Pakistan. Luxury branding with worldwide shipping. Customize your artwork today.',
  keywords: 'paintings, oil paintings, acrylic paintings, handmade art, luxury art, Pakistan, worldwide shipping',
  openGraph: {
    title: 'NaveedArts - Premium Handmade Paintings',
    description: 'Luxury handmade oil and acrylic paintings',
    url: 'https://naveedarts.com',
    siteName: 'NaveedArts',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-luxury-50 text-luxury-900">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}