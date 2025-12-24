import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
 
const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Determine the active link based on the current route
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex">
      {/* Left Sidebar (Desktop) */}
      <div className="hidden lg:block w-[250px] sm:w-[200px] md:w-[250px] lg:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 dark:bg-[#0A0A0A] bg-[#f0f0f0] p-5 sticky top-0 h-screen">
        <div className="space-y-4">
          <Link
            to="dashboard"
            className={`flex items-center gap-4 font-semibold transition ${isActive('dashboard') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'} hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer`}
          >
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link
            to="course"
            className={`flex items-center gap-4 font-semibold transition ${isActive('course') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'} hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer`}
          >
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar (using ShadCN UI Sheet) */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <button className="p-4 text-gray-700 dark:text-gray-300">
              <span className="text-xl">☰</span> {/* Hamburger Icon */}
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="bg-[#f0f0f0] dark:bg-[#0A0A0A] p-5">
             
            <div className="space-y-4">
              <Link
                to="dashboard"
                className={`flex items-center gap-4 font-semibold transition ${isActive('dashboard') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'} hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer`}
                onClick={() => setIsOpen(false)} // Close on click
              >
                <ChartNoAxesColumn size={22} />
                <h1>Dashboard</h1>
              </Link>
              <Link
                to="course"
                className={`flex items-center gap-4 font-semibold transition ${isActive('course') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'} hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer`}
                onClick={() => setIsOpen(false)} // Close on click
              >
                <SquareLibrary size={22} />
                <h1>Courses</h1>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Outlet Content */}
      <div className="flex-1 md:p-10 p-2 dark:bg-[#121212] bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
