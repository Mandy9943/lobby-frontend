import {
  BookOpen,
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  MessageSquare,
  Twitter,
  Video,
  Youtube,
} from "lucide-react";

export const socialIcons = {
  email: <Mail className="h-4 w-4" />,
  instagram: <Instagram className="h-4 w-4" />,
  facebook: <Facebook className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  youtube: <Youtube className="h-4 w-4" />,
  tiktok: <Video className="h-4 w-4" />,
  whatsapp: <MessageCircle className="h-4 w-4" />,
  snapchat: <MessageSquare className="h-4 w-4" />,
  reddit: <Globe className="h-4 w-4" />,
  medium: <BookOpen className="h-4 w-4" />,
  github: <Github className="h-4 w-4" />,
} as const;
