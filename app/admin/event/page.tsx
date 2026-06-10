import DashboardLayout from "@/app/admin/layout";
import EventsPage from "@/components/admin/event/event";
import ProtectedRoute from "@/components/protectedRoutes";

export default function Event() {
    return (
        <ProtectedRoute>
            <EventsPage />

        </ProtectedRoute>
     
    )
}