import Link from 'next/link'
import { Home, Mail, Users, Briefcase, UserCircle, Plug, MoreVertical } from 'lucide-react'
import { TeamSwitcher } from './team-switcher'
import { Separator } from '@/components/ui/separator'
import { SettingsMenu, DropdownMenuTrigger } from './settings-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Campaigns', href: '/campaigns', icon: Briefcase },
  { name: 'Emails', href: '/emails', icon: Mail },
  { name: 'Responders', href: '/responders', icon: Users },
  { name: 'Accounts', href: '/accounts', icon: UserCircle },
  { name: 'Integrations', href: '/integrations', icon: Plug },
]

export function Sidebar() {
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
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <p className="text-sm text-muted-foreground">acme@gmail.com</p>
          </div>
        </SettingsMenu>
      </div>
    </nav>
  )
}

