import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Members from "./pages/Members";
import Books from "./pages/Books";
import Borrowings from "./pages/Borrowings";

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/categories" element={<Categories />} />

          <Route path="/members" element={<Members />} />

          <Route path="/books" element={<Books />} />

          <Route path="/borrowings" element={<Borrowings />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
