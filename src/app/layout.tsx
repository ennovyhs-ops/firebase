
import type {Metadata} from 'next';
import './globals.css';
import { AppShell } from '@/components/app-shell';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase';
import { TeamProvider } from '@/context/team-context';

export const metadata: Metadata = {
  title: 'Sixx: Sports Management Hub',
  description: 'The central hub for managing your sports team.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <TeamProvider>
            <AppShell>
              {children}
            </AppShell>
          </TeamProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
