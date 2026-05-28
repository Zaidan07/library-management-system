import { Link, useLocation } from "react-router-dom";
import {
  FaBookOpen,
  FaChartPie,
  FaUsers,
  FaBook,
  FaTags,
  FaExchangeAlt,
  FaBars,
} from "react-icons/fa";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaChartPie />,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <FaTags />,
    },
    {
      name: "Members",
      path: "/members",
      icon: <FaUsers />,
    },
    {
      name: "Books",
      path: "/books",
      icon: <FaBook />,
    },
    {
      name: "Borrowings",
      path: "/borrowings",
      icon: <FaExchangeAlt />,
    },
  ];

  return (
    <aside
      className={`min-h-screen bg-[#0b1220] border-r border-white/5 px-4 py-6 flex flex-col justify-between transition-all duration-300 ${
        isSidebarOpen ? "w-72" : "w-24"
      }`}
    >
      <div>
        {/* LOGO + TOGGLE */}
        <div
          className={`flex items-center mb-12 ${
            isSidebarOpen ? "justify-between" : "justify-center"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center text-2xl">
              <FaBookOpen />
            </div>

            {isSidebarOpen && (
              <div>
                <h1 className="text-xl font-bold tracking-wide">
                  Perpustakaan
                </h1>
                <p className="text-xs text-gray-400 tracking-[0.25em] uppercase">
                  System Management
                </p>
              </div>
            )}
          </div>

          {isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition"
            >
              <FaBars />
            </button>
          )}
        </div>

        {/* TOGGLE WHEN CLOSED */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="w-full mb-8 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition"
          >
            <FaBars />
          </button>
        )}

        {/* MENU */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                title={!isSidebarOpen ? item.name : ""}
                className={`flex items-center rounded-xl transition-all ${
                  isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center px-0 py-3"
                } ${
                  isActive
                    ? "bg-cyan-500/10 text-white border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.08)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span
                  className={`text-lg ${
                    isActive ? "text-cyan-400" : "text-gray-500"
                  }`}
                >
                  {item.icon}
                </span>

                {isSidebarOpen && (
                  <span className="font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

     
    </aside>
  );
};

export default Sidebar;
