
"use client";

import { useAppContext } from "@/context/app-context";
import DashboardPage from "../dashboard/page";
import TeamSelectionPage from "../teams/page";


export default function CoachDashboard() {
    const { selectedTeam } = useAppContext();

    if (!selectedTeam) {
        return <TeamSelectionPage />;
    }

    return <DashboardPage />;
}
