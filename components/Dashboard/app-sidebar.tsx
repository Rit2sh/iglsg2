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
import { LayoutDashboardIcon, ListIcon, ChartBarIcon, FolderIcon, UsersIcon, CameraIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, DatabaseIcon, FileChartColumnIcon, FileIcon, CommandIcon } from "lucide-react"
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
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: "Manuscript Queue",
      url: "/dashboard/submissions",
      icon: (
        <ListIcon
        />
      ),
    },
    {
      title: "Review Queue",
      url: "/dashboard/review-queue",
      icon: (
        <UsersIcon
        />
      ),
    },
    {
      title: "Editorial Archives",
      url: "/dashboard/archives",
      icon: (
        <FolderIcon
        />
      ),
    },
    {
      title: "Editorial Oversight",
      url: "/dashboard",
      icon: (
        <ChartBarIcon
        />
      ),
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: (
        <CameraIcon
        />
      ),
      isActive: true,
      url: "/admin/dashboard",
      items: [
        {
          title: "Active Proposals",
          url: "/dashboard/submissions",
        },
        {
          title: "Archived",
          url: "/dashboard/archives",
        },
      ],
    },
    {
      title: "Proposal",
      icon: (
        <FileTextIcon
        />
      ),
      url: "/dashboard/submissions",
      items: [
        {
          title: "Active Proposals",
          url: "/dashboard/submissions",
        },
        {
          title: "Archived",
          url: "/dashboard/archives",
        },
      ],
    },
    {
      title: "Prompts",
      icon: (
        <FileTextIcon
        />
      ),
      url: "/dashboard/review-queue",
      items: [
        {
          title: "Active Proposals",
          url: "/dashboard/submissions",
        },
        {
          title: "Archived",
          url: "/dashboard/archives",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Editorial Profile",
      url: "/dashboard/profile",
      icon: (
        <Settings2Icon
        />
      ),
    },
    {
      title: "Author Guidelines",
      url: "/guidelines",
      icon: (
        <CircleHelpIcon
        />
      ),
    },
    {
      title: "Browse Archives",
      url: "/archives",
      icon: (
        <SearchIcon
        />
      ),
    },
  ],
  documents: [
    {
      name: "Public Portal",
      url: "/",
      icon: (
        <DatabaseIcon
        />
      ),
    },
    {
      name: "Submit Paper",
      url: "/submission",
      icon: (
        <FileIcon
        />
      ),
    },
    {
      name: "Editorial Board",
      url: "/editorial-board",
      icon: (
        <FileChartColumnIcon
        />
      ),
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
              <Link href="/admin/dashboard">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">JIAS Admin Hub</span>
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
