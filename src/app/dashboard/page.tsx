
import { DashboardClient } from "./dashboard-client";
import CoachLayout from "../coach/layout";

export default function DashboardPage() {
  return (
    <CoachLayout>
        <DashboardClient />
    </CoachLayout>
  );
}
