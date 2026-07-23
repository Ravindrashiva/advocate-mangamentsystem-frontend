export const uid = () => Math.random().toString(36).slice(2, 10);

export const ACCENTS = ["#7C3AED", "#FBBF24", "#10B981", "#06B6D4", "#F97316", "#EC4899"];

export const DOC_CATEGORIES = [
  "Petition", "Affidavit", "Order", "Judgment", "Evidence", "Agreement", "Client Document",
];

export const ROLES = ["Super Admin", "Admin", "Sub Admin", "Advocate", "Staff/Bearer"];

export const ROLE_PERMISSIONS = {
  "Super Admin": [
    "dashboard", "cases", "advocates", "clients", "daybook", 
    "payments", "reports", "bare-acts", "rules", "documents", 
    "tools", "notifications", "users", "settings"
  ],
  "Admin": [
    "dashboard", "cases", "advocates", "clients", "documents", 
    "payments", "bare-acts", "reports"
  ],
  "Sub Admin": ["dashboard", "cases", "documents", "bare-acts"],
  "Advocate": ["dashboard", "clients", "cases", "documents", "bare-acts"],
  "Staff/Bearer": ["dashboard", "daybook", "documents"],
};

const advocateOneId = uid();
const clientOneId = uid();

export const initialAdvocates = [
  { id: advocateOneId, name: "Ramesh Varma", mobile: "9876543210", email: "advocate@legaldesk.in", specialization: "Civil Litigation", enrolment: "AP/1234/2015", experience: "9 yrs", relation: "Senior Advocate" },
  { id: uid(), name: "Priya Nair", mobile: "9123456780", email: "priya.nair@legaldesk.in", specialization: "Property Law", enrolment: "AP/5521/2019", experience: "5 yrs", relation: "Junior Advocate" },
];

export const initialClients = [
  { id: clientOneId, name: "Suresh Kumar", mobile: "9988776655", email: "suresh.kumar@gmail.com", address: "Vijayawada, AP", idNumber: "ABCP1234K", advocateId: advocateOneId },
];

export const initialCases = [
  { 
    id: "case-active-1", 
    caseNo: "CV-2291", 
    title: "Property Dispute — Suresh Kumar vs State", 
    status: "Active", 
    court: "District Court, Vijayawada", 
    nextHearing: "2026-07-20", 
    advocateId: advocateOneId, 
    clientId: clientOneId,
    approvalLevel: "active",
    approvalHistory: []
  },
  { 
    id: "case-pending-l1", 
    caseNo: "CV-1011", 
    title: "Land Acquisition Claim - Rama Raju", 
    status: "Pending Approval", 
    court: "High Court, Amaravati", 
    nextHearing: "2026-08-05", 
    advocateId: advocateOneId, 
    clientId: clientOneId,
    approvalLevel: 1,
    approvalHistory: []
  },
  { 
    id: "case-pending-l2", 
    caseNo: "CV-1012", 
    title: "Contract Breach - Tech Solutions", 
    status: "Pending Approval", 
    court: "Commercial Court, Vijayawada", 
    nextHearing: "2026-08-12", 
    advocateId: advocateOneId, 
    clientId: clientOneId,
    approvalLevel: 2,
    approvalHistory: [
      { level: 1, approvedBy: "staff@legaldesk.in", date: "2026-07-16", time: "14:30", comments: "Initial document checks passed.", status: "Verified" }
    ]
  },
  { 
    id: "case-pending-l3", 
    caseNo: "CV-1013", 
    title: "Divorce Petition - Meena vs Rajesh", 
    status: "Pending Approval", 
    court: "Family Court, Vijayawada", 
    nextHearing: "2026-08-15", 
    advocateId: advocateOneId, 
    clientId: clientOneId,
    approvalLevel: 3,
    approvalHistory: [
      { level: 1, approvedBy: "staff@legaldesk.in", date: "2026-07-15", time: "11:20", comments: "Documents uploaded.", status: "Verified" },
      { level: 2, approvedBy: "advocate@legaldesk.in", date: "2026-07-16", time: "09:45", comments: "Verified ground facts and client credentials.", status: "Verified" }
    ]
  },
  { 
    id: "case-pending-l4", 
    caseNo: "CV-1014", 
    title: "Insurance Settlement - Apollo Corp", 
    status: "Pending Approval", 
    court: "Consumer Forum, Vijayawada", 
    nextHearing: "2026-08-20", 
    advocateId: advocateOneId, 
    clientId: clientOneId,
    approvalLevel: 4,
    approvalHistory: [
      { level: 1, approvedBy: "staff@legaldesk.in", date: "2026-07-14", time: "10:15", comments: "Claim document verified.", status: "Verified" },
      { level: 2, approvedBy: "advocate@legaldesk.in", date: "2026-07-14", time: "16:40", comments: "Policy terms audited.", status: "Verified" },
      { level: 3, approvedBy: "admin@legaldesk.in", date: "2026-07-15", time: "15:00", comments: "Approved for final clearance.", status: "Approved" }
    ]
  }
];
