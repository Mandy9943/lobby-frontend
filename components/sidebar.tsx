"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import {
  Briefcase,
  History,
  Home,
  Mail,
  Plug,
  UserCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { SettingsMenu } from "./settings-menu";
import { TeamSwitcher } from "./team-switcher";
const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Previous Searches", href: "/previous-searches", icon: History },
  { name: "Campaigns", href: "/campaigns", icon: Briefcase },
  { name: "Emails", href: "/emails", icon: Mail },
  { name: "Responders", href: "/responders", icon: Users },
  { name: "Accounts", href: "/accounts", icon: UserCircle },
  { name: "Integrations", href: "/integrations", icon: Plug },
];

export function Sidebar() {
  const { user } = useAuth();

  return (
    <nav className="w-64 bg-background border-r p-4 flex flex-col h-screen">
      <div className="space-y-4">
        <TeamSwitcher />
        <Separator />
      </div>
      <div className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center space-x-3 rounded-lg p-2 text-foreground hover:bg-muted"
          >
            <item.icon className="h-5 w-5 text-[#FF5D0A]" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
      <div className="mt-auto pt-4">
        <Separator className="mb-4" />
        <SettingsMenu>
          <div className="flex items-center gap-3 cursor-pointer">
            <Avatar className="h-6 w-6 bg-[#FF5D0A]">
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </SettingsMenu>
      </div>
    </nav>
  );
}
