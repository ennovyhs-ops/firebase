
"use client";

import React from 'react';
import { conversations } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MessageList } from '@/components/message-list';

export default function CommunicationPage() {
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button asChild variant="ghost" size="icon">
          <Link href="/coach">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight ml-2">Communication</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <MessageList conversations={conversations} />
        </CardContent>
      </Card>
    </div>
  );
}
