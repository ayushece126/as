"use client"

import * as React from "react"
import {
  Home,
  Compass,
  GraduationCap,
  Award,
  LogOut,
} from "lucide-react"
import { AiOutlineSafetyCertificate } from "react-icons/ai"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/store/auth";
import { useRouter, usePathname } from "next/navigation"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const isAdmin = user?.role === "admin";

  const isActive = (path: string) => {
    return pathname === path ? "bg-gray-700" : "";
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-xl font-semibold">E-Learning</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {!isAdmin ? (
        <SidebarContent>
          <SidebarMenu className="space-y-3 pl-2"> {/* Added spacing and indentation */}
            <SidebarMenuItem>
              <SidebarMenuButton className={`text-md ${isActive("/")}`} onClick={() => router.push("/")}>
                <Home className="size-5" />
                Home
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={`text-md ${isActive("/explore")}`} onClick={() => router.push("/explore")}>
                <Compass className="size-5" />
                Explore
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={`text-md ${isActive("/enrolled-bootcamps")}`} onClick={() => router.push("/enrolled-bootcamps")}>
                <GraduationCap className="size-5" />
                My Bootcamps
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={`text-md ${isActive("/certificates")}`} onClick={() => router.push("/certificates")}>
                <AiOutlineSafetyCertificate className="size-5" /> {/* Bold & Bigger */}
                My Certificates
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={`text-md ${isActive("/badges")}`} onClick={() => router.push("/badges")}>
                <Award className="size-5" />
                My Badges
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      ) : (
        <SidebarContent>
          <SidebarMenu className="space-y-3 pl-2"> {/* Added spacing and indentation */}
            <SidebarMenuItem>
              <SidebarMenuButton className={`text-md ${isActive("/")}`} onClick={() => router.push("/")}>
                <Home className="size-5" />
                Home
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={`text-md ${isActive("/explore")}`} onClick={() => router.push("/explore")}>
                <Compass className="size-5" />
                Explore
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={`text-md ${isActive("/create-bootcamp")}`} onClick={() => router.push("/create-bootcamp")}>
                <GraduationCap className="size-5" />
                My Bootcamps
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      )}


      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <button
              className="flex w-full items-center gap-2 p-2 text-sm text-red-500 hover:bg-red-100 rounded-md"
              onClick={logout}
            >
              <LogOut className="size-4" />
              Logout Account
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
