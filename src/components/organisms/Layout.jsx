import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "@/layouts/Root";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

function Layout() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header with user info and logout */}
      {isAuthenticated && (
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
<div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                  T
                </div>
                <span className="text-slate-700 font-medium">TaskFlow</span>
              </div>
              
              <nav className="flex items-center gap-4">
                <a 
                  href="/" 
                  className="text-slate-600 hover:text-slate-800 text-sm font-medium transition-colors"
                >
                  Tasks
                </a>
                <a 
                  href="/projects" 
                  className="text-slate-600 hover:text-slate-800 text-sm font-medium transition-colors"
                >
                  Projects
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-600">
                Welcome, {user?.firstName || user?.emailAddress || 'User'}
              </div>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="text-slate-600 hover:text-slate-800"
              >
                <ApperIcon name="LogOut" className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>
      )}
      
      {/* Main content */}
      <main className={isAuthenticated ? "pt-0" : ""}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;