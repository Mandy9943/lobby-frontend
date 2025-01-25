"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useGetCompanyProfile } from "@/hooks/useCompanies";
import { useProject } from "@/hooks/useProjects";
import { cn } from "@/lib/utils";
import { createOrUpdateCompanyProfile } from "@/services/leads-api/companies.services";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

const tones = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "direct", label: "Direct" },
];

export function AICustomizationDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { project } = useProject();
  const { fetchedProfile } = useGetCompanyProfile();
  const [tone, setTone] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isComboboxOpen, setIsComboboxOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const promptText =
      `Writing Tone: ${tone}\nUser Specific Instructions: ${instructions}`.trim();

    await createOrUpdateCompanyProfile(project!.id, {
      emailGuidelines: promptText,
    });

    setOpen(false);
  };

  useEffect(() => {
    if (fetchedProfile?.emailGuidelines) {
      // Find the first line that starts with "Writing Tone: " and extract the tone
      const toneMatch =
        fetchedProfile.emailGuidelines.match(/Writing Tone: (.*)/);
      const tone = toneMatch ? toneMatch[1] : "";

      // Find the content after "User Specific Instructions: " until the end of string
      const instructionsMatch = fetchedProfile.emailGuidelines.match(
        /User Specific Instructions: ([\s\S]*)/
      );
      const instructions = instructionsMatch ? instructionsMatch[1].trim() : "";

      setTone(tone);
      setInstructions(instructions);
    }
  }, [fetchedProfile]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Customize AI Email Writer</DialogTitle>
          <DialogDescription>
            Customize how our AI writes emails for your campaigns. Set your
            preferred tone and specific instructions.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-4">
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Writing Tone</Label>
              <Popover open={isComboboxOpen} onOpenChange={setIsComboboxOpen}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input
                      placeholder="Select or type a tone..."
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full pr-10"
                    />
                    <ChevronsUpDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[--radix-popover-trigger-width] p-0"
                  align="start"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                  sideOffset={4}
                >
                  <Command>
                    <CommandGroup>
                      {tones.map((t) => (
                        <CommandItem
                          key={t.value}
                          value={t.value}
                          onSelect={(currentValue) => {
                            setTone(currentValue);
                            setIsComboboxOpen(false);
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              tone === t.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {t.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructions">Special Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Add any specific instructions for the AI writer..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save Preferences</Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
