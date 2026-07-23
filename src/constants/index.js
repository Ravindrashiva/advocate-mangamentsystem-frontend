import {
  LayoutDashboard, Folder, Gavel, Users, Notebook, Wallet, 
  BarChart3, BookOpen, RefreshCw, FileText, Calculator, 
  Bell, UserCheck, Settings
} from "lucide-react";

export const ROLES = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  SUB_ADMIN: "Sub Admin",
  ADVOCATE: "Advocate",
  STAFF: "Staff/Bearer"
};

export const SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/app/dashboard",
    accent: "#2563EB",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUB_ADMIN, ROLES.ADVOCATE, ROLES.STAFF]
  },
  {
    key: "cases",
    label: "Case Management",
    icon: Folder,
    accent: "#06B6D4",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUB_ADMIN, ROLES.ADVOCATE, ROLES.STAFF],
    subItems: [
      { label: "All Cases", to: "/app/cases" },
      { label: "Create Case", to: "/app/cases?action=create" },
      { label: "Case Approval", to: "/app/cases?tab=approval" },
      { label: "Hearing Calendar", to: "/app/cases?tab=calendar" },
      { label: "Closed Cases", to: "/app/cases?tab=closed" }
    ]
  },
  {
    key: "advocates",
    label: "Advocate Management",
    icon: Gavel,
    accent: "#7C3AED",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUB_ADMIN],
    subItems: [
      { label: "All Advocates", to: "/app/advocates" },
      { label: "Add Advocate", to: "/app/advocates?action=add" },
      { label: "Senior Advocates", to: "/app/advocates?filter=senior" },
      { label: "Junior Advocates", to: "/app/advocates?filter=junior" },
      { label: "Advocate Assignments", to: "/app/advocates?tab=assignments" }
    ]
  },
  {
    key: "clients",
    label: "Client Management",
    icon: Users,
    accent: "#10B981",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUB_ADMIN, ROLES.ADVOCATE],
    subItems: [
      { label: "All Clients", to: "/app/clients" },
      { label: "Add Client", to: "/app/clients?action=add" },
      { label: "Client Documents", to: "/app/documents?filter=client" }
    ]
  },
  {
    key: "daybook",
    label: "Case Diary",
    icon: Notebook,
    accent: "#EC4899",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUB_ADMIN, ROLES.STAFF],
    subItems: [
      { label: "Daily Diary", to: "/app/diary" },
      { label: "Hearing Notes", to: "/app/diary?tab=notes" },
      { label: "Attachments", to: "/app/diary?tab=attachments" }
    ]
  },
  {
    key: "payments",
    label: "Finance",
    icon: Wallet,
    accent: "#FBBF24",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    subItems: [
      { label: "Client Payments", to: "/app/payments" },
      { label: "Advocate Payments", to: "/app/payments?tab=advocate" },
      { label: "Office Expenses", to: "/app/payments?tab=expenses" },
      { label: "Pending Payments", to: "/app/payments?tab=pending" },
      { label: "Receipts", to: "/app/payments?tab=receipts" }
    ]
  },
  {
    key: "reports",
    label: "Reports",
    icon: BarChart3,
    accent: "#8B5CF6",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    subItems: [
      { label: "Case Reports", to: "/app/reports?type=cases" },
      { label: "Advocate Reports", to: "/app/reports?type=advocates" },
      { label: "Client Reports", to: "/app/reports?type=clients" },
      { label: "Financial Reports", to: "/app/reports?type=financial" },
      { label: "Monthly Reports", to: "/app/reports?type=monthly" }
    ]
  },
  {
    key: "bare-acts",
    label: "Legal Library",
    icon: BookOpen,
    accent: "#3B82F6",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUB_ADMIN, ROLES.ADVOCATE, ROLES.STAFF],
    subItems: [
      { label: "Bare Acts", to: "/app/bare-acts" },
      { label: "Central Acts", to: "/app/bare-acts?type=central" },
      { label: "State Acts", to: "/app/bare-acts?type=state" },
      { label: "Amendments", to: "/app/bare-acts?type=amendments", roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ADVOCATE] },
      { label: "Bookmarks", to: "/app/bare-acts?type=bookmarks" }
    ]
  },
  {
    key: "rules",
    label: "Rule Changes",
    icon: RefreshCw,
    accent: "#EF4444",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ADVOCATE],
    subItems: [
      { label: "IPC → BNS", to: "/app/rules?from=ipc&to=bns" },
      { label: "CrPC → BNSS", to: "/app/rules?from=crpc&to=bnss" },
      { label: "Evidence → BSA", to: "/app/rules?from=evidence&to=bsa" },
      { label: "Amendment Tracker", to: "/app/rules?tab=tracker" }
    ]
  },
  {
    key: "documents",
    label: "Document Center",
    icon: FileText,
    accent: "#F97316",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUB_ADMIN, ROLES.ADVOCATE, ROLES.STAFF],
    subItems: [
      { label: "Petitions", to: "/app/documents?type=petitions" },
      { label: "Judgments", to: "/app/documents?type=judgments" },
      { label: "Affidavits", to: "/app/documents?type=affidavits" },
      { label: "Agreements", to: "/app/documents?type=agreements" },
      { label: "Evidence", to: "/app/documents?type=evidence" }
    ]
  },
  {
    key: "tools",
    label: "Tools",
    icon: Calculator,
    accent: "#06B6D4",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUB_ADMIN, ROLES.ADVOCATE, ROLES.STAFF],
    subItems: [
      { label: "Fee Calculator", to: "/app/tools?tool=fee" },
      { label: "Percentage Calculator", to: "/app/tools?tool=percent" },
      { label: "Stamp Duty", to: "/app/tools?tool=stamp" },
      { label: "Area Calculator", to: "/app/tools?tool=area" },
      { label: "Unit Converter", to: "/app/tools?tool=converter" }
    ]
  },
  {
    key: "notifications",
    label: "Notifications",
    icon: Bell,
    accent: "#10B981",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUB_ADMIN, ROLES.ADVOCATE, ROLES.STAFF],
    subItems: [
      { label: "SMS", to: "/app/notifications?channel=sms" },
      { label: "Email", to: "/app/notifications?channel=email" },
      { label: "WhatsApp", to: "/app/notifications?channel=whatsapp" },
      { label: "Alerts", to: "/app/notifications?channel=alerts" }
    ]
  },
  {
    key: "users",
    label: "User Management",
    icon: UserCheck,
    accent: "#312E81",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    subItems: [
      { label: "Super Admin", to: "/app/users?role=superadmin" },
      { label: "Admins", to: "/app/users?role=admin" },
      { label: "Sub Admins", to: "/app/users?role=subadmin" },
      { label: "Advocates", to: "/app/users?role=advocate" },
      { label: "Staff", to: "/app/users?role=staff" }
    ]
  },
  {
    key: "settings",
    label: "System Settings",
    icon: Settings,
    accent: "#6B7280",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    subItems: [
      { label: "Company Profile", to: "/app/settings?tab=profile" },
      { label: "Membership Plans", to: "/app/settings?tab=membership", roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN] },
      { label: "Roles & Permissions", to: "/app/settings?tab=permissions" },
      { label: "Court Master", to: "/app/settings?tab=courts" },
      { label: "State Master", to: "/app/settings?tab=states" },
      { label: "Fee Configuration", to: "/app/settings?tab=fee" },
      { label: "Backup & Restore", to: "/app/settings?tab=backup" }
    ]
  }
];

export function getSidebarLinks(role) {
  if (role === ROLES.SUPER_ADMIN) {
    return SIDEBAR_LINKS;
  }
  return SIDEBAR_LINKS
    .filter(link => link.roles.includes(role))
    .map(link => {
      if (link.subItems) {
        return {
          ...link,
          subItems: link.subItems.filter(sub => !sub.roles || sub.roles.includes(role))
        };
      }
      return link;
    });
}
