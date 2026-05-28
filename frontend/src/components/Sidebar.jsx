import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-10">
        Library App
      </h1>

      <nav className="flex flex-col gap-4">

        <Link to="/" className="hover:bg-blue-800 p-3 rounded-lg">
          Dashboard
        </Link>

        <Link to="/categories" className="hover:bg-blue-800 p-3 rounded-lg">
          Categories
        </Link>

        <Link to="/members" className="hover:bg-blue-800 p-3 rounded-lg">
          Members
        </Link>

        <Link to="/books" className="hover:bg-blue-800 p-3 rounded-lg">
          Books
        </Link>

      </nav>

    </div>
  );
};

export default Sidebar;