import {
  LayoutDashboard, Folder, Gavel, Users, Notebook, Wallet, 
  BarChart3, BookOpen, RefreshCw, FileText, Calculator, 
  Bell, UserCheck, Settings, BookOpen as BookOpenIcon, Scale,
  Shield, MapPin
} from "lucide-react";

export const sidebarConfig = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
    icon: LayoutDashboard,
    roles: ["super_admin", "admin", "sub_admin", "advocate", "staff"],
    accent: "#2563EB"
  },
  {
    label: "Civil Cases",
    path: "/app/cases",
    icon: Folder,
    roles: ["super_admin", "admin", "sub_admin", "advocate"],
    accent: "#06B6D4"
  },
  {
    label: "Advocate Management",
    path: "/app/advocates",
    icon: Gavel,
    roles: ["super_admin", "admin"],
    accent: "#7C3AED"
  },
  {
    label: "Client Management",
    path: "/app/clients",
    icon: Users,
    roles: ["super_admin", "admin"],
    accent: "#10B981"
  },
  {
    label: "Membership Module",
    path: "/app/membership",
    icon: Shield,
    roles: ["super_admin", "admin"],
    accent: "#FBBF24"
  },
  {
    label: "Case Diary",
    path: "/app/diary",
    icon: Notebook,
    roles: ["super_admin", "admin", "sub_admin", "advocate", "staff"],
    accent: "#EC4899"
  },
  {
    label: "Day Book",
    path: "/app/diary?tab=notes",
    icon: Notebook,
    roles: ["super_admin", "staff"],
    accent: "#EC4899"
  },
  {
    label: "Field Visit/Party Location",
    path: "/app/location",
    icon: MapPin,
    roles: ["super_admin", "staff"],
    accent: "#10B981"
  },
  {
    label: "Case Documents",
    path: "/app/documents?filter=cases",
    icon: FileText,
    roles: ["super_admin", "admin", "advocate"],
    accent: "#F97316"
  },
  {
    label: "Alert System",
    path: "/app/notifications?channel=alerts",
    icon: Bell,
    roles: ["super_admin", "admin", "sub_admin"],
    accent: "#10B981"
  },
  {
    label: "Calculator Module",
    path: "/app/tools?tool=fee",
    icon: Calculator,
    roles: ["super_admin"],
    accent: "#06B6D4"
  },
  {
    label: "Converter Module",
    path: "/app/tools?tool=converter",
    icon: Calculator,
    roles: ["super_admin"],
    accent: "#06B6D4"
  },
  {
    label: "Payment Module",
    path: "/app/payments",
    icon: Wallet,
    roles: ["super_admin", "admin"],
    accent: "#FBBF24"
  },
  {
    label: "Reports",
    path: "/app/reports",
    icon: BarChart3,
    roles: ["super_admin", "admin"],
    accent: "#8B5CF6"
  },
  {
    label: "Notifications",
    path: "/app/notifications",
    icon: Bell,
    roles: ["super_admin", "admin", "sub_admin", "advocate"],
    accent: "#10B981"
  },
  {
    label: "Bare Acts Module",
    path: "/app/bare-acts",
    icon: BookOpen,
    roles: ["super_admin"],
    accent: "#3B82F6"
  },
  {
    label: "Old→New Rules Tracker",
    path: "/app/rules",
    icon: RefreshCw,
    roles: ["super_admin"],
    accent: "#EF4444"
  },
  {
    label: "Case Approval Workflow",
    path: "/app/cases?tab=approval",
    icon: Scale,
    roles: ["super_admin", "admin", "advocate", "staff"],
    accent: "#06B6D4"
  },
  {
    label: "Reference Management",
    path: "/app/documents?type=petitions",
    icon: BookOpenIcon,
    roles: ["super_admin", "advocate"],
    accent: "#F97316"
  },
  {
    label: "Document Management",
    path: "/app/documents",
    icon: FileText,
    roles: ["super_admin", "admin"],
    accent: "#F97316"
  },
  {
    label: "User Management",
    path: "/app/users",
    icon: UserCheck,
    roles: ["super_admin"],
    accent: "#312E81"
  },
  {
    label: "System Settings",
    path: "/app/settings",
    icon: Settings,
    roles: ["super_admin"],
    accent: "#6B7280"
  }
];
