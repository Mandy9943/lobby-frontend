"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

const outreachGoals = [
  "Partnership",
  "Collaboration",
  "Advice",
  "Meeting",
  "Asking for a quote",
  "Asking a question",
  "Company introduction",
]

export function CompanyProfileDialog() {
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState({
    website: "",
    firstName: "",
    lastName: "",
    companyName: "",
    companySize: "",
    teamLocation: "",
    industry: "",
    outreachGoals: [] as string[],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfile({ ...profile, [name]: value })
  }

  const handleCheckboxChange = (goal: string) => {
    setProfile((prev) => ({
      ...prev,
      outreachGoals: prev.outreachGoals.includes(goal)
        ? prev.outreachGoals.filter((g) => g !== goal)
        : [...prev.outreachGoals, goal],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Your Company Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Your Company Profile</DialogTitle>
          <DialogDescription>
            Edit your company information here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="website" className="text-right">
                Website
              </Label>
              <Input
                id="website"
                name="website"
                value={profile.website}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companyName" className="text-right">
                Company Name
              </Label>
              <Input
                id="companyName"
                name="companyName"
                value={profile.companyName}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companySize" className="text-right">
                Company Size
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange("companySize", value)}
                defaultValue={profile.companySize}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10</SelectItem>
                  <SelectItem value="11-50">11-50</SelectItem>
                  <SelectItem value="51-200">51-200</SelectItem>
                  <SelectItem value="201-500">201-500</SelectItem>
                  <SelectItem value="501+">501+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teamLocation" className="text-right">
                Team Location
              </Label>
              <Input
                id="teamLocation"
                name="teamLocation"
                value={profile.teamLocation}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="industry" className="text-right">
                Industry
              </Label>
              <Input
                id="industry"
                name="industry"
                value={profile.industry}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right">Outreach Goals</Label>
              <div className="col-span-3 space-y-2 border border-gray-600 rounded p-3">
                {outreachGoals.map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal}
                      checked={profile.outreachGoals.includes(goal)}
                      onCheckedChange={() => handleCheckboxChange(goal)}
                    />
                    <label
                      htmlFor={goal}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {goal}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="flex justify-end mt-4">
          <Button onClick={() => {
            console.log("Selected Outreach Goals:", profile.outreachGoals);
            setOpen(false);
          }}>
            Save changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

