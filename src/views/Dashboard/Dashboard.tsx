import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar.tsx"
import ModeToggle from "@/components/mode-toggle.tsx";
import {Outlet} from "react-router-dom";

export default function Dashboard(){
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                <ModeToggle />
                <div className={'grid justify-center w-full m-5'}>
                    <Outlet/>
                </div>
            </main>
        </SidebarProvider>
    )
}
