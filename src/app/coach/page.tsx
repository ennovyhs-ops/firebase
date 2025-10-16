
import { redirect } from 'next/navigation';

export default function CoachPage() {
    // The coach's root page should just redirect to their dashboard.
    // The dashboard content is in its own route.
    redirect('/coach/dashboard');
}
