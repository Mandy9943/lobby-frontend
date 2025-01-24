import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProject } from "@/hooks/useProjects";
import {
  generateMultipleEmails,
  generateSingleEmail,
} from "@/services/leads-api/email-generator";
import { SearchLeadsResponse } from "@/types/search-leads.types";
import { ArrowLeft, Loader2, Mail, Share2, Trash2 } from "lucide-react";
import { useState } from "react";
import { EmailTemplateDialog } from "./EmailTemplateDialog";
import { socialIcons } from "./socialIcons";

interface ResultsTableProps {
  results: SearchLeadsResponse["data"];
  onNewSearch: () => void;
  onDeleteRow: (domain: string) => void;
  onRestoreAll: () => void;
}

export function ResultsTable({
  results,
  onNewSearch,
  onDeleteRow,
  onRestoreAll,
}: ResultsTableProps) {
  const { project } = useProject();
  const [generatingAll, setGeneratingAll] = useState(false);
  const companiesWithEmail = results.filter(
    (r) => r.email && r.email.length > 0
  );
  const hasCompaniesWithEmail = companiesWithEmail.length > 0;

  const allEmailsGenerated = companiesWithEmail.every(
    (company) => company.emailTemplate
  );

  const handleGenerateAllEmails = async () => {
    if (!project?.id) {
      return;
    }
    setGeneratingAll(true);
    try {
      const response = await generateMultipleEmails(
        project?.id,
        companiesWithEmail
      );

      // Update the email templates in the results
      response.emailTexts.forEach((emailResponse) => {
        const result = companiesWithEmail.find(
          (company) => company.email?.[0] === emailResponse.email
        );
        if (result) {
          result.emailTemplate = emailResponse.emailText;
        }
      });
    } catch (error) {
      console.error("Failed to generate emails:", error);
      // You might want to show an error toast here
    } finally {
      setGeneratingAll(false);
    }
  };

  return (
    <div className="flex-grow overflow-auto p-4 md:p-6 fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">
          {results.length
            ? `We found ${results.length} companies`
            : "No results found"}
        </h1>

        {results.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Try refining your search.
            </p>
            <Button variant="outline" onClick={onNewSearch}>
              New Search
            </Button>
          </div>
        ) : (
          <>
            {hasCompaniesWithEmail && (
              <div className="flex justify-end mb-4">
                {allEmailsGenerated ? (
                  <p className="text-sm text-muted-foreground">
                    All emails have been generated
                  </p>
                ) : (
                  <Button
                    onClick={handleGenerateAllEmails}
                    disabled={generatingAll}
                    variant="outline"
                    className="gap-2"
                  >
                    {generatingAll && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    Generate All Emails ({companiesWithEmail.length})
                  </Button>
                )}
              </div>
            )}
            <div className="bg-card rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-border">
                      <TableHead className="text-muted-foreground">#</TableHead>
                      <TableHead className="text-muted-foreground">
                        Name
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        URL
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Description
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Contact
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Socials
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result, index) => (
                      <ResultRow
                        key={result.domain}
                        index={index + 1}
                        result={result}
                        onDeleteRow={onDeleteRow}
                        projectId={project?.id}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-center mt-8 gap-2">
          <Button onClick={onRestoreAll} variant="outline">
            Restore All
          </Button>
          <Button onClick={onNewSearch} variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            New Search
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ResultRowProps {
  index: number;
  result: SearchLeadsResponse["data"][0];
  onDeleteRow: (domain: string) => void;
  projectId?: string;
}

function ResultRow({ index, result, onDeleteRow, projectId }: ResultRowProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const hasEmail = result.email && result.email.length > 0;

  const handleGenerateEmail = async () => {
    if (result.emailTemplate) {
      setShowEmailDialog(true);
      return;
    }

    setIsGenerating(true);
    if (!projectId) {
      return;
    }
    console.log(projectId);
    console.log(result);

    try {
      const response = await generateSingleEmail(projectId, result);
      result.emailTemplate = response.emailText;
      setShowEmailDialog(true);
    } catch (error) {
      console.error("Failed to generate email:", error);
      // You might want to show an error toast here
    } finally {
      setIsGenerating(false);
    }
  };

  const socialLinks = Object.entries(result.social_links || {}).filter(
    ([, urls]) => urls && urls.length > 0
  );
  const hasSocials = socialLinks.length > 0;

  return (
    <>
      <TableRow>
        <TableCell>{index}</TableCell>
        <TableCell className="max-w-[200px]">
          <div className="truncate" title={result.title || result.domain}>
            {result.title || result.domain}
          </div>
        </TableCell>
        <TableCell className="max-w-[200px]">
          <a
            href={`https://${result.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline truncate block"
            title={result.domain}
          >
            {result.domain}
          </a>
        </TableCell>
        <TableCell className="max-w-[300px]">
          <div className="truncate" title={result.description}>
            {result.description}
          </div>
        </TableCell>
        <TableCell className="min-w-[200px]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {result.email?.[0] ? (
                <>
                  <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                    Email
                  </span>
                  <a
                    href={`mailto:${result.email[0]}`}
                    className="text-blue-400 hover:underline text-sm"
                  >
                    {result.email[0]}
                  </a>
                </>
              ) : (
                <span className="text-muted-foreground text-sm">
                  No email found
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {result.phone?.[0] ? (
                <>
                  <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                    Phone
                  </span>
                  <a
                    href={`tel:${result.phone[0]}`}
                    className="text-blue-400 hover:underline text-sm"
                  >
                    {result.phone[0]}
                  </a>
                </>
              ) : (
                <span className="text-muted-foreground text-sm">
                  No phone found
                </span>
              )}
            </div>
          </div>
        </TableCell>
        <TableCell>
          {hasSocials ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  {socialLinks.length} platforms
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map(([platform, urls]) => (
                    <a
                      key={platform}
                      href={urls[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
                    >
                      {socialIcons[platform as keyof typeof socialIcons]}
                      <span className="capitalize">{platform}</span>
                    </a>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <span className="text-muted-foreground text-sm">
              No socials found
            </span>
          )}
        </TableCell>
        <TableCell>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700 hover:bg-red-200"
              onClick={() => onDeleteRow(result.domain)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
            {hasEmail && (
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-500 hover:text-blue-700 hover:bg-blue-200"
                onClick={handleGenerateEmail}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Mail className="h-5 w-5" />
                )}
              </Button>
            )}
          </div>
        </TableCell>
      </TableRow>
      <EmailTemplateDialog
        isOpen={showEmailDialog}
        onClose={() => setShowEmailDialog(false)}
        emailContent={result.emailTemplate || ""}
        companyName={result.title || result.domain}
      />
    </>
  );
}
