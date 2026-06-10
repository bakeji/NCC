import DashboardLayout from "@/app/admin/layout";
import BlogsPage from "@/components/admin/blog/blogpage";
import ProtectedRoute from "@/components/protectedRoutes";

export default function BlogPage() {
  return (

    

      <ProtectedRoute>
        <BlogsPage />

      </ProtectedRoute>
  )




}