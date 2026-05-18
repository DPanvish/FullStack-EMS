import { useState } from "react";
import { dummyProfileData } from "../assets/assets";
import { MenuIcon, UserIcon, XIcon, LayoutGridIcon, CalendarIcon, FileTextIcon, DollarSignIcon, SettingsIcon, ChevronRightIcon, LogOutIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = "EMPLOYEE";
  const userName = [dummyProfileData?.firstName, dummyProfileData?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const userInitial = userName.charAt(0).toUpperCase();

  const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGridIcon },
  role === "ADMIN"
    ? { name: "Employees", href: "/employees", icon: UserIcon }
    : { name: "Attendance", href: "/attendance", icon: CalendarIcon },
      { name: "Leave", href: "/leave", icon: FileTextIcon },
      { name: "Payslips", href: "/payslips", icon: DollarSignIcon },
      { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];

  const handleLogout  = () => {
    window.location.href = "/login";
  }

  const sidebarContent = (
    <>
      <div className="px-5 pt-6 pb-5 sidebar-divider-bottom">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="sidebar-brand-mark">
              <UserIcon className="sidebar-brand-icon" />
            </div>
            <div>
              <p className="sidebar-title">Employee MS</p>
              <p className="sidebar-subtitle">Management System</p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button onClick={() => setMobileOpen(false)} className="sidebar-close">
            <XIcon size={20} />
          </button>
        </div>
      </div>

      {userName && (
        <div className="sidebar-profile-card">
          <div className="flex items-center gap-3">
            <div className="sidebar-profile-avatar">
              <span className="sidebar-profile-initial">
                {userInitial}
              </span>
            </div>
            
            <div className="min-w-0">
              <p className="sidebar-profile-name">{userName}</p>
              <p className="sidebar-profile-role">{role === "ADMIN" ? "Administrator" : "Employee"}</p>
            </div>
          </div>
        </div>
      )}

      <div className="px-5 pt-5 pb-2">
        <p className="sidebar-nav-label">Navigation</p>
      </div>

      <div className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return(
            <Link
              key={item.name}
              to={item.href}
              className={`group sidebar-nav-link ${isActive ? "sidebar-nav-link-active" : "sidebar-nav-link-inactive"}`}
            >
              {
                isActive && 
                <div className="sidebar-active-marker"/>
              }

              <item.icon className={`w-[17px] h-[17px] shrink-0 ${isActive ? "sidebar-nav-icon-active" : "sidebar-nav-icon-inactive"}`} />
              <span className="flex-1">{item.name}</span>

              {isActive && <ChevronRightIcon className="sidebar-active-chevron" />}
            </Link>
          )
        })}
      </div>

      <div className="p-3 sidebar-divider-top">
        <button onClick={handleLogout} className="sidebar-logout">
          <LogOutIcon className="w-[17px] h-[17px]" />
          <span>Logout</span>
        </button>
      </div>
    </>
  )

  return (
    <>
      <button 
        onClick={() => setMobileOpen(true)}
        className="sidebar-mobile-menu"
        aria-label="Open navigation menu"
      >
        <MenuIcon size={20} />
      </button>

      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col h-full w-65 sidebar-shell shrink-0 border-r">
        {sidebarContent}
      </aside>

      {/* Sidebar Mobile */}
      <aside className={`lg:hidden fixed inset-y-0 left-0 w-72 sidebar-shell z-50 flex flex-col transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {sidebarContent}
      </aside>
    </>
  )
}

export default Sidebar
