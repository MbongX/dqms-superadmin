// --- App Layout ---
import type {Metadata} from 'next'; //for SEO
import {Michroma, Inter} from 'next/font/google'; // For Fonts
import './globals.css';
import { Sidebar } from '../components/layout/Sidebar/Sidebar';

// Font family  styling configuration (with secondary failsafe)
const michroma = Michroma({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-michroma',
    display: 'swap'
});

const inter = Inter({
   subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap'
});

// Basic on-page SEO (metadata optimization/technical SEO metadata) configuration
export const metadata: Metadata = {
    title: 'DQMS Portal | Digital Queue Management Systems',
    description: 'Enterprise Real-Time Queue Management System'
};

export default function RootLayout({
                                        children
                                   }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={`${michroma.variable} ${inter.variable}`}>
          <body className="flex min-h-screen antialiased bg-surface-ground text-text-primary">
            <Sidebar />
            <main className="flex-1 min-w-0 overflow-y-auto max-h-screen">
              {children}
            </main>
          </body>
        </html>
    );
}