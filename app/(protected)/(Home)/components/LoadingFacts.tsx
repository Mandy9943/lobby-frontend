import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const facts = [
  "75% of B2B buyers use social media to research vendors",
  "Email marketing has an average ROI of 4,200%",
  "The best time to contact a lead is within 5 minutes of their inquiry",
  "Companies that nurture leads make 50% more sales at 33% lower cost",
  "47% of buyers view 3-5 pieces of content before engaging with a sales rep",
  "LinkedIn generates 277% more leads than Facebook and Twitter",
  "Personalized emails improve click-through rates by 14%",
  "93% of B2B buying processes start with an online search",
  "Content marketing generates 3x more leads than traditional marketing",
  "Companies using lead nurturing generate 50% more sales-ready leads",
  "The average cost of a B2B lead is $142",
  "80% of B2B buyers say they want to receive content from vendors",
  "The best way to generate leads is through content marketing",
];

export function LoadingFacts() {
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto mt-12 p-6 bg-card rounded-xl">
      <div className="flex items-center space-x-3">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="text-lg font-medium">Searching for leads...</span>
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground font-medium">
          Did you know?
        </p>
        <p className="text-base animate-fade-in">{facts[currentFact]}</p>
      </div>
    </div>
  );
}
