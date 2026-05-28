import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="h-20 px-8 flex items-center justify-between bg-[#070b14]">
      <div>
        <p className="text-sm text-gray-500">
          Library Management System
        </p>
      </div>

      <div className="flex items-center gap-5">
        <p className="text-sm text-gray-400">
          {today}
        </p>

        <div className="w-11 h-11 rounded-full bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
          <FaUser />
        </div>
      </div>
    </header>
  );
};

export default Navbar;