import { ArrowRight, Globe, Mail, Search, SendHorizontal } from "lucide-react";

const features = [
  {
    title: "Smart Search",
    description:
      "Enter your criteria and let our AI find the perfect matches for your business",
    icon: Search,
    color: "purple",
  },
  {
    title: "Comprehensive Discovery",
    description:
      "We scan the web to find companies matching your specific needs",
    icon: Globe,
    color: "blue",
  },
  {
    title: "Contact Information",
    description:
      "Automatically discover verified contact details and social profiles",
    icon: Mail,
    color: "green",
  },
  {
    title: "Ready for Outreach",
    description: "Get a curated list ready for your personalized campaign",
    icon: SendHorizontal,
    color: "orange",
  },
];

export function FeatureCards() {
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </section>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

function FeatureCard({
  title,
  description,
  icon: Icon,
  color,
}: FeatureCardProps) {
  return (
    <div className="group relative bg-card hover:bg-accent rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
      <div
        className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-${color}-100 dark:bg-${color}-900/20 flex items-center justify-center`}
      >
        <Icon className={`w-4 h-4 text-${color}-600 dark:text-${color}-400`} />
      </div>
      <div className="pt-8">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors absolute bottom-4 right-4" />
    </div>
  );
}