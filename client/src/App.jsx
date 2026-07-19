import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Packages from "./pages/Packages";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Sidebar/>
        <main className="flex-1 bg-gray-100 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Packages" element={<Packages />} />
            <Route path="/Bookings" element={<Bookings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
