import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getAllSidebarUsers } from "@/services/message";
export default async function Layout({ children }: { children: React.ReactNode }) {
  const { data: users } = await getAllSidebarUsers();

  return (
    <SidebarProvider>
      <AppSidebar users={users} />
      < main className="w-full">
        <SidebarTrigger className="absolute" />
        {children}
      </main>
    </SidebarProvider>
  )
}
