import DashboardLayout from "@/app/admin/layout"
import DashboardPage from "@/components/admin/dashboardPage";
import ProtectedRoute from "@/components/protectedRoutes";


export default function AdminPage() {
  return (
   <ProtectedRoute>
    <DashboardPage />

   </ProtectedRoute>
      
    
  );
}