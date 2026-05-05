import './globals.css';
import { DM_Sans, Space_Grotesk } from 'next/font/google';

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-dm-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-display' });

export const metadata = {
  title: 'Mostakim Hossain | Portfolio',
  description: 'Full-Stack Developer, AI/ML Enthusiast, and IoT Tinkerer. Crafting immersive digital experiences.',
  keywords: ['Mostakim Hossain', 'Portfolio', 'Full-Stack Developer', 'AI', 'Machine Learning', 'React', 'Next.js'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} antialiased selection:bg-amber-400/80 selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
