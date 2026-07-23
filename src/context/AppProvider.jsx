import React, { useState, useMemo } from "react";
import { uid, initialAdvocates, initialClients, initialCases } from "../data/mockData";
import { useAuthStore } from "../store/authStore";
import { AppContext } from "./AppContext";

export function AppProvider({ children }) {
  // --- Auth ---
  const user = useAuthStore((state) => state.user);
  const loginState = useAuthStore((state) => state.login);
  const logoutState = useAuthStore((state) => state.logout);

  const login = ({ email, password }) => {
    // Credentials Map as code comment (DEV-ONLY):
    // superadmin@legaldesk.in  -> Super Admin  / password123
    // admin@legaldesk.in       -> Admin        / password123
    // subadmin@legaldesk.in    -> Sub Admin    / password123
    // advocate@legaldesk.in    -> Advocate     / password123
    // staff@legaldesk.in       -> Staff/Bearer / password123

    const credentials = {
      "superadmin@legaldesk.in": { role: "super_admin", name: "Super Admin" },
      "admin@legaldesk.in": { role: "admin", name: "Admin" },
      "subadmin@legaldesk.in": { role: "sub_admin", name: "Sub Admin" },
      "advocate@legaldesk.in": { role: "advocate", name: "Advocate" },
      "staff@legaldesk.in": { role: "staff", name: "Staff/Bearer" },
    };

    const cleanEmail = (email || "").toLowerCase().trim();

    if (password !== "password123") {
      throw new Error("Invalid email or password.");
    }

    const matched = credentials[cleanEmail];
    if (!matched) {
      // Default to lowest-privilege role or reject. Reject is safer and cleaner:
      throw new Error("Access denied. Email not registered in the system.");
    }

    loginState({ name: matched.name, email: cleanEmail, role: matched.role });
    return true;
  };
  const logout = () => logoutState();

  // --- Data ---
  const [advocates, setAdvocates] = useState(initialAdvocates);
  const [clients, setClients] = useState(initialClients);
  const [cases, setCases] = useState(initialCases);
  const [documents, setDocuments] = useState([]);

  const [toast, setToast] = useState(null);
  const flash = (msg, accent = "#10B981") => {
    setToast({ msg, accent, key: uid() });
    setTimeout(() => setToast(null), 2600);
  };

  const addAdvocate = (data) => {
    const rec = { id: uid(), ...data };
    setAdvocates((a) => [rec, ...a]);
    flash(`Advocate "${data.name}" added successfully`, "#7C3AED");
    return rec;
  };

  const addClient = (data) => {
    const rec = { id: uid(), ...data };
    setClients((c) => [rec, ...c]);
    flash(`Client "${data.name}" added successfully`, "#10B981");
    return rec;
  };

  const addCase = (data) => {
    const rec = { id: uid(), ...data };
    setCases((c) => [rec, ...c]);
    flash(`Case "${data.caseNo}" created successfully`, "#2563EB");
    return rec;
  };

  const addDocument = (data) => {
    const rec = { id: uid(), uploadedOn: new Date().toLocaleDateString("en-IN"), ...data };
    setDocuments((d) => [rec, ...d]);
    flash(`Document "${data.title}" uploaded & linked`, "#F97316");
    return rec;
  };

  const deleteDocument = (id) => setDocuments((d) => d.filter((x) => x.id !== id));

  const docsFor = (ownerType, ownerId) =>
    documents.filter((d) => d.ownerType === ownerType && d.ownerId === ownerId);

  const value = useMemo(
    () => ({
      user, login, logout,
      advocates, clients, cases, documents,
      addAdvocate, addClient, addCase, addDocument, deleteDocument, docsFor,
      toast,
      setCases,
      setClients
    }),
    [user, advocates, clients, cases, documents, toast]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
