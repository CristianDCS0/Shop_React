import {useAppDispatch, useAppSelector} from '@/store/app/hooks';
import {useEffect} from "react";
import {getProducts} from "@/store/features/products/thunkProduct.ts";

//shadcn
import {Home, ShoppingCart, Store, UserCog, LogOut} from "lucide-react"
import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
export function AppSidebar() {

    const dispatch = useAppDispatch();
    const product = useAppSelector((state) => state.products);
    const user = useAppSelector((state) => state.users.user);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch, user]);

// Menu items.
    const items = [
        {
            title: "Home",
            url: "/dashboard/",
            icon: Home,
        },
        {
            title: "Products",
            url: "/dashboard/products/",
            icon: Store,
        },
        {
            title: "Shopping Car",
            url: "#",
            icon: ShoppingCart,
        }
    ]
    return (
        <Sidebar variant={"floating"} collapsible={"icon"}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>EShop</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                    <SidebarMenuBadge>
                                        {item.title === "Products" && product? product.product.length : ""}
                                        {/*{item.title === "Posts" && posts? posts.length : ""}*/}
                                    </SidebarMenuBadge>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href={"/dashboard/account"}>
                                <UserCog/>
                                <span>
                                    {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        user?(`${user.name} - ${user.role}`):"User"
                                    }
                                </span>
                            </a>
                        </SidebarMenuButton>
                        <SidebarMenuButton asChild>
                            <a href={"/dashboard/logout"}>
                                <LogOut/>
                                <span>{"Logout"}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
