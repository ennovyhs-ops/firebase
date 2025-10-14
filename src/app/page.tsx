
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  MessageSquare,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { schedule } from './schedule/data';
import { format, parseISO } from 'date-fns';
import { conversations as initialConversations } from "./communication/data";
import { Separator } from "@/components/ui/separator";
import { DashboardClient } from "./dashboard-client";

export default function Home() {

  return (
    <DashboardClient />
  );
}
