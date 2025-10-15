
"use client";

import { AppProvider } from '@/context/app-context';
import { AppShell } from '@/components/app-shell';

export default function Home() {

  return (
    <main className="bg-background min-h-screen">
        <AppProvider>
            <AppShell>
            </AppShell>
        </AppProvider>
    </main>
  );
}
