"use client"

import * as React from "react"
import { NavDocuments } from "@/components/Dashboard/nav-documents"
import { NavMain } from "@/components/Dashboard/nav-main"
import { NavSecondary } from "@/components/Dashboard/nav-secondary"
import { NavUser } from "@/components/Dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  ListOrdered,
  Users,
  Archive,
  BookOpen,
  Settings,
  HelpCircle,
  Search,
  Globe,
  Send,
  ShieldCheck,
  Building
} from "lucide-react"
import Link from "next/link"

const data = {
  user: {
    name: "JIAS Administrator",
    email: "admin@ijlsg.org",
    avatar: "https://avatar.vercel.sh/admin@ijlsg.org?rounded=60",
  },
  navMain: [
    {
      title: "Admin Dashboard",
      url: "/admin/dashboard",
      icon: <LayoutDashboard className="size-4" />,
    },
    {
      title: "Manuscript Queue",
      url: "/dashboard/submissions",
      icon: <ListOrdered className="size-4" />,
    },
    {
      title: "Review Queue",
      url: "/dashboard/review-queue",
      icon: <Users className="size-4" />,
    },
    {
      title: "Editorial Archives",
      url: "/dashboard/archives",
      icon: <Archive className="size-4" />,
    },
    {
      title: "Editorial Oversight",
      url: "/dashboard",
      icon: <BookOpen className="size-4" />,
    },
  ],
  navSecondary: [
    {
      title: "Editorial Profile",
      url: "/dashboard/profile",
      icon: <Settings className="size-4" />,
    },
    {
      title: "Author Guidelines",
      url: "/guidelines",
      icon: <HelpCircle className="size-4" />,
    },
    {
      title: "Browse Archives",
      url: "/archives",
      icon: <Search className="size-4" />,
    },
  ],
  documents: [
    {
      name: "Public Portal",
      url: "/",
      icon: <Globe className="size-4" />,
    },
    {
      name: "Submit Paper",
      url: "/submission",
      icon: <Send className="size-4" />,
    },
    {
      name: "Editorial Board",
      url: "/editorial-board",
      icon: <ShieldCheck className="size-4" />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                  J
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold leading-none">JIAS Admin</span>
                  <span className="text-[10px] text-muted-foreground font-medium">Intercontinental Studies</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
