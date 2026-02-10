import './globals.css';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] });

export const metadata = {
  title: 'Mostakim Hossain | Portfolio',
  description: 'Full-Stack Developer, AI/ML Enthusiast, and IoT Tinkerer. Crafting immersive digital experiences.',
  keywords: ['Mostakim Hossain', 'Portfolio', 'Full-Stack Developer', 'AI', 'Machine Learning', 'React', 'Next.js'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased selection:bg-purple-500/80 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
