import { icons } from "lucide-react";

export interface AdminRoute {
  name: string;
  href: string;
  icon: keyof typeof icons;
}
