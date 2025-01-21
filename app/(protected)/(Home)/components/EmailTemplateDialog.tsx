import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";
import { useState } from "react";

interface EmailTemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  emailContent: string;
  companyName: string;
}

export function EmailTemplateDialog({
  isOpen,
  onClose,
  emailContent,
  companyName,
}: EmailTemplateDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(emailContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Email Template for {companyName}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="bg-muted p-4 rounded-lg relative">
            <pre className="whitespace-pre-wrap text-sm">{emailContent}</pre>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          {copied && (
            <p className="text-sm text-green-600">Copied to clipboard!</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
