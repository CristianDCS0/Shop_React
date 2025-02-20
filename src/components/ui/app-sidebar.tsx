import {Link, useNavigate} from "react-router-dom";
import { useAuthStore } from '@/store/authStore';

// shadcn
import { ShoppingCart, Layers, Users, User2, ChevronUp, Settings} from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function AppSidebar() {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    // Menu items.
    const itemsProducts = [
        { title: "Products", url: '/dashboard/products', icon: Layers },
    ]

    const itemsCart = [
        { title: "Cart", url: "#", icon: ShoppingCart },
    ]

    const itemsAdmin = [
        { title: "Users", url: "#", icon: Users },
    ]
    const handleLogout = () => {
        navigate('/');
    };
    const handleProfile = async () => {
        navigate('/dashboard/profile');
    }

    const itemsUser = [
        { title: "Profile", func: handleProfile, icon: Settings },
        { title: "Logout", func: handleLogout, icon: Users },
    ]

    return (
        <Sidebar collapsible={"icon"}>
            <SidebarHeader>
                <Link to={'/dashboard'} className={"text-center"} >Shop</Link>
            </SidebarHeader>

            <SidebarContent>

                <SidebarGroup>
                    <SidebarGroupLabel>Products</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {itemsProducts.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Cart</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {itemsCart.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {
                    user?.role === 'admin' && (
                        <SidebarGroup>
                            <SidebarGroupLabel>Users</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {itemsAdmin.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <a href={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    )
                }

            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> {user?.name}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                {itemsUser.map((item) => (
                                    <DropdownMenuItem key={item.title} onClick={item.func}>
                                        <span>{item.title}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
