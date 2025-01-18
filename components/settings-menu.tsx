"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, CheckSquare, Link, User, LogOut, MoreVertical } from 'lucide-react'
import { useTheme } from "next-themes"
import React, { useEffect } from "react"

export function SettingsMenu({ children }: { children: React.ReactNode }) {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "m" || event.key === "M") {
        toggleTheme()
      }
    }

    window.addEventListener("keydown", handleKeyPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [theme, setTheme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" alignOffset={-12}>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={toggleTheme}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Toggle theme</span>
            <span className="ml-auto text-xs text-gray-400">M</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CheckSquare className="mr-2 h-4 w-4" />
            <span>Onboarding</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="mr-2 h-4 w-4" />
            <span>Homepage</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500 focus:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { DropdownMenuTrigger }

