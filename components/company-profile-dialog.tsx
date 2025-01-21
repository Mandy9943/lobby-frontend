/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCompanyProfile } from "@/hooks/useCompanies";
import { useProject } from "@/hooks/useProjects";
import { createOrUpdateCompanyProfile } from "@/services/leads-api/companies.services";
import {
  COMPANY_SIZES,
  CompanyProfile,
  CompanySize,
  OUTREACH_GOALS,
  OutreachGoal,
} from "@/types/company.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function CompanyProfileDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const companyProfileSchema = z.object({
    website: z
      .string()
      .url({ message: "Invalid website URL" })
      .optional()
      .nullable(),
    ownerFirst: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" })
      .max(50, { message: "First name must not exceed 50 characters" })
      .optional()
      .nullable(),
    ownerLast: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" })
      .max(50, { message: "Last name must not exceed 50 characters" })
      .optional()
      .nullable(),
    size: z.nativeEnum(CompanySize),
    location: z
      .string()
      .min(2, { message: "Location must be at least 2 characters" })
      .max(100, { message: "Location must not exceed 100 characters" })
      .optional()
      .nullable(),
    industry: z
      .string()
      .min(2, { message: "Industry must be at least 2 characters" })
      .max(100, { message: "Industry must not exceed 100 characters" })
      .optional()
      .nullable(),
    goals: z
      .array(z.nativeEnum(OutreachGoal))
      .min(1, { message: "At least one goal is required" })
      .max(5, { message: "Maximum 5 goals allowed" }),
  });

  const { project } = useProject();
  const { fetchedProfile, mutate } = useGetCompanyProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<z.infer<typeof companyProfileSchema>>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: fetchedProfile ?? {
      size: CompanySize.TINY,
      goals: [],
      website: "",
      ownerFirst: "",
      ownerLast: "",
      location: "",
      industry: "",
    },
  });

  useEffect(() => {
    if (fetchedProfile) {
      setValue("website", fetchedProfile.website ?? "");
      setValue("ownerFirst", fetchedProfile.ownerFirst ?? "");
      setValue("ownerLast", fetchedProfile.ownerLast ?? "");
      setValue("size", fetchedProfile.size ?? CompanySize.TINY);
      setValue("location", fetchedProfile.location ?? "");
      setValue("industry", fetchedProfile.industry ?? "");
      setValue("goals", fetchedProfile.goals ?? []);
    }
  }, [fetchedProfile, setValue]);
  const goals = watch("goals") || [];

  const onSubmit = async (data: z.infer<typeof companyProfileSchema>) => {
    try {
      await createOrUpdateCompanyProfile(project!.id, data as CompanyProfile);
      mutate();
      setOpen(false);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Your Company Profile</DialogTitle>
          <DialogDescription>
            Edit your company information here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="website" className="text-right">
                  Website
                </Label>
                <Input
                  id="website"
                  {...register("website")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ownerFirst" className="text-right">
                  First name
                </Label>
                <Input
                  id="ownerFirst"
                  {...register("ownerFirst")}
                  className="col-span-3"
                />
                {errors.ownerFirst && (
                  <p className="text-red-600 col-span-4 text-right">
                    {errors.ownerFirst.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ownerLast" className="text-right">
                  Last name
                </Label>
                <Input
                  id="ownerLast"
                  {...register("ownerLast")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="size" className="text-right">
                  Company Size
                </Label>
                <Select
                  onValueChange={(value: any) =>
                    setValue("size", value as CompanySize)
                  }
                  value={watch("size")?.toString()}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(COMPANY_SIZES).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.size && (
                  <p className="text-red-600 col-span-4 text-right">
                    {errors.size.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Team Location
                </Label>
                <Input
                  id="location"
                  {...register("location")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="industry" className="text-right">
                  Industry
                </Label>
                <Input
                  id="industry"
                  {...register("industry")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right">Outreach Goals</Label>
                <div className="col-span-3 space-y-2 border border-gray-600 rounded p-3">
                  {Object.entries(OUTREACH_GOALS).map(([value, label]: any) => (
                    <div key={value} className="flex items-center space-x-2">
                      <Checkbox
                        id={value}
                        checked={goals.includes(value as OutreachGoal)}
                        onCheckedChange={(checked) => {
                          const goalEnum = value as OutreachGoal;
                          const updatedGoals = checked
                            ? [...goals, goalEnum]
                            : goals.filter((g) => g !== goalEnum);
                          setValue("goals", updatedGoals);
                        }}
                      />
                      <label
                        htmlFor={value}
                        className="text-sm font-medium leading-none"
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.goals && (
                  <p className="text-red-600 col-span-4 text-right">
                    {errors.goals.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default CompanyProfileDialog;
