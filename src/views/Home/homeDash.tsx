import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {Outlet} from "react-router-dom";
import ModeToggle from "@/components/mode-toggle.tsx";
import {useAppSelector} from '@/store/app/hooks';
// import { PostsProvider } from "@/Context/PostContext";
export default function HomeDash()  {

    const user = useAppSelector((state) => state.users.user);

	return (
        // <PostsProvider>
        user ? (
            <>
                <div className={"w-screen h-screen"}>
                    <SidebarProvider>
                        <AppSidebar/>
                        <main>
                            <SidebarTrigger/>
                            <ModeToggle/>
                            <Outlet/>
                        </main>
                    </SidebarProvider>
                </div>
            </>
        ):(
            <>
                <div>Please log in to access this page.</div>
            </>
        )

        // </PostsProvider>
    );
}