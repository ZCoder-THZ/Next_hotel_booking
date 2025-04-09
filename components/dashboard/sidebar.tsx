"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LuLayoutDashboard } from "react-icons/lu"
import { BsBuildings } from "react-icons/bs"
import { IoBedOutline } from "react-icons/io5"
import { TbWorld } from "react-icons/tb"
import { MdLocationCity } from "react-icons/md"

export const routes = [
  {
    label: "Dashboard",
    icon: LuLayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Hotels",
    icon: BsBuildings,
    href: "/dashboard/hotels",
  },
  {
    label: "Rooms",
    icon: IoBedOutline,
    href: "/dashboard/rooms",
  },
  {
    label: "Countries",
    icon: TbWorld,
    href: "/dashboard/countries",
  },
  {
    label: "Cities",
    icon: MdLocationCity,
    href: "/dashboard/cities",
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="h-full flex flex-col bg-background p-4">
      <div className="flex flex-col flex-1 gap-y-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`
              flex items-center gap-x-2 text-sm font-medium p-3
              hover:bg-accent hover:text-accent-foreground rounded-lg
              transition-colors
              ${pathname === route.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}
            `}
          >
            <route.icon className="h-5 w-5" />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  )
}