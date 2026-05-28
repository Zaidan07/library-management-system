import Sidebar from "../src/components/Sidebar";
import Navbar from "../src/components/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#070b14] text-gray-100">
      <Sidebar />

      <div className="flex-1 min-h-screen">
        <Navbar />

        <main className="px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;