import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, LogOut, Menu, Scale, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { sidebarConfig } from "../../constants/sidebarConfig";

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const { user, logout } = useApp();

  const userRole = user?.role || "super_admin";
  const visibleMenuItems = sidebarConfig.filter((item) =>
    item.roles.includes(userRole)
  );

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2.5 rounded-xl bg-slate-800 text-white shadow-lg hover:bg-slate-700 transition"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <aside
            className="relative w-72 max-w-xs flex flex-col text-white h-full shadow-2xl overflow-hidden"
            style={{ background: "linear-gradient(180deg, #0F172A 0%, #1E3A8A 55%, #312E81 100%)" }}
          >
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-purple-600 opacity-20 blur-3xl" />
            <div className="absolute bottom-0 -left-16 w-48 h-48 rounded-full bg-cyan-500 opacity-10 blur-3xl" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-5 py-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shrink-0">
                  <Scale size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-extrabold text-base leading-tight tracking-tight uppercase">🏛 Legal Desk</div>
                  <div className="text-[10px] text-blue-200/70 font-semibold tracking-wider uppercase">Case Management</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="relative z-10 flex-1 px-3 py-5 space-y-1.5 overflow-y-auto custom-sidebar-scroll">
              {visibleMenuItems.map((item) => {
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isMenuOpen = !!openMenus[item.label];

                if (!hasSubItems) {
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all ${
                          isActive ? "text-white" : "text-blue-100/70 hover:text-white hover:bg-white/5"
                        }`
                      }
                      style={({ isActive }) =>
                        isActive
                          ? { background: `linear-gradient(135deg, ${item.accent}, ${item.accent}99)`, boxShadow: `0 8px 20px -6px ${item.accent}AA` }
                          : {}
                      }
                    >
                      <item.icon size={19} strokeWidth={2.2} />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                }

                return (
                  <div key={item.label} className="space-y-1">
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all text-blue-100/70 hover:text-white hover:bg-white/5`}
                    >
                      <item.icon size={19} strokeWidth={2.2} style={{ color: isMenuOpen ? item.accent : "currentColor" }} />
                      <span>{item.label}</span>
                      <ChevronDown
                        size={14}
                        className={`ml-auto transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Submenu Items */}
                    {isMenuOpen && (
                      <div className="pl-6 pr-2 space-y-1.5 animation-fadeIn">
                        {item.subItems.map((sub) => (
                          <NavLink
                            key={sub.to}
                            to={sub.to}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                              `w-full flex items-center gap-2 py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                                isActive ? "text-white bg-white/10" : "text-blue-100/50 hover:text-white hover:bg-white/5"
                              }`
                            }
                          >
                            <span className="text-[10px] opacity-60">•</span>
                            <span>{sub.label}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Footer / Actions */}
            <div className="relative z-10 px-3 py-4 border-t border-white/10 space-y-1.5">
              {user && (
                <div className="px-3.5 py-2 text-[11px] text-blue-200/60 font-medium truncate">
                  Signed in as <span className="text-white font-bold">{user.role}</span>
                </div>
              )}
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-blue-100/70 hover:text-white hover:bg-red-500/20 transition text-sm font-semibold"
              >
                <LogOut size={19} />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
